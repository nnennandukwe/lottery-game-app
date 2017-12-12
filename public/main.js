console.log("loaded main.js successfully")

document.getElementById("getNumbers").addEventListener("click", function(){
let first = document.getElementById('1st').value;
let second = document.getElementById('2nd').value;
let third = document.getElementById('3rd').value;

// creating the conditional for the user needing to remain
// within the parameters of the lottery rules

if (first>50 || first<1 || second>50 || second<1 || third<1 || third>50){
    let errorMessage = document.getElementById('errorMessage')
    errorMessage.innerHTML = "only enter in a number between 0 and 50";
  }
  else if(first, second, third == ""){
    errorMessage.innerHTML = "cannot leave fields empty";
  }
  else{
let random = Math.floor(Math.random()*50)+1
console.log(random)
  if(first == random || second == random || third == random){
    console.log('You Win!')
    document.getElementById("resultMessage").innerHTML = "YOU WIN";

    const wins = this.parentNode.parentNode.childNodes[1].innerText
    const losses = this.parentNode.parentNode.childNodes[3].innerText
    
    }else{
      console.log("You LOST!")
      document.getElementById("resultMessage").innerHTML = "YOUR LOSS, BUDDY.";
    }
}
})

//Add listeners to elements

let attended = document.getElementsByClassName('fa-thumbs-up')
let late = document.getElementsByClassName('fa-thumbs-down')
let deleteStudent = document.getElementsByClassName('fa-trash')

Array.from(attended).forEach((element)=>{
  element.addEventListener('click',function(){
    console.log('click')
    //get name and element from DOM
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const lastname = this.parentNode.parentNode.childNodes[3].innerText

    //fetch request
    fetch('studAttended',{
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'lastname': lastname,
        'att': 'On time'
      })
    }).then(response =>{
      if (response.ok) return response.json()
    }).then(data=>{
      console.log(data)
      window.location.reload(true)
    })
  })
});

Array.from(late).forEach((element)=>{
  element.addEventListener('click',function(){
    //get name and element from DOM
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const lastname = this.parentNode.parentNode.childNodes[3].innerText

    //fetch request
    fetch('studAttended',{
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'lastname': lastname,
        'att': 'Late'
      })
    }).then(response =>{
      if (response.ok) return response.json()
    }).then(data=>{
      console.log(data)
      window.location.reload(true)
    })
  })
});

Array.from(deleteStudent).forEach((element)=>{
  element.addEventListener('click',function(){
    //get name and element from DOM
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const lastname = this.parentNode.parentNode.childNodes[3].innerText

    //fetch request
    fetch('delete',{
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'lastname': lastname
      })
    }).then(response =>{
      window.location.reload()
    })
  })
});

//do fetch request
