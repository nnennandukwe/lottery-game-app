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

  db.collection('lottery-wins ').find().toArray((err,result) =>{
    if (err) return console.log(err)
    res.render('index.ejs', {students: result}) //pending
  })
})

app.post('/', (req, res)=>{

  let date = Math.floor(Date.now()/1000)

  console.log(date)
  db.collection('lottery-wins').save({name:req.body.name, lastname:req.body.lastname, date: date, att: ""}, (err,result)=>{
    if (err) return console.log(err)
    console.log('Saved to database')
    res.redirect('/')
  })
})

app.put('/',(req,res)=>{
  db.collection('lottery-wins')
  .findOneAndUpdate({name: req.body.name, lastname:req.body.lastname},{
    $set:{
      att:req.body.att
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
  db.collection('lottery-wins').findOneAndDelete({name:req.body.name,msg: req.body.msg}, (err,result)=>{
    if(err) return res.send(500,err)
    res.send('Student deleted')
  })
})
