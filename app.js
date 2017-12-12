const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db;

MongoClient.connect('mongodb://demo:demo@ds137336.mlab.com:37336/lottery-wins', (err, database)=>{
  if (err) return console.log(err)
  db = database

  app.listen(process.env.PORT || 3000, ()=>{
      console.log('Listening on 3000')
  })
})

//Setup
app.set('view engine','ejs')//tell where to look for ejs
app.use(bodyParser.urlencoded({extended: true})) //this allows node to look for the form in the ejs/html
app.use(bodyParser.json())
app.use(express.static('public'))

//API
app.get('/', (req,res)=>{

  db.collection('lottery-wins').find().toArray((err,result) =>{
    if (err) return console.log(err)
    res.render('index.ejs', {students: result}) //pending
  })
})

app.post('/winnings', (req, res)=>{

  db.collection('lottery-wins').save({wins:req.body.wins, losses:req.body.losses, percentageWon:""}, (err,result)=>{
    if (err) return console.log(err)
    console.log('Saved to database')
    res.redirect('/')
  })
})

app.put('/gameStats',(req,res)=>{
  db.collection('students')
  .findOneAndUpdate({wins: req.body.wins, losses:req.body.losses},{
    $set:{
      percentageWon:wins/100
    }
  }, {
    sort: {_id:-1},
    upsert:true
  }, (err,result) =>{
    if(err) return res.send(err)
    res.send(result)
  })
})

app.delete('/delete',(req,res)=>{
  db.collection('lottery-wins').findOneAndDelete({wins:req.body.wins,losses: req.body.losses}, (err,result)=>{
    if(err) return res.send(500,err)
    res.send('Stats deleted')
  })
})
