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
    }else{
      console.log("You LOST!")
      document.getElementById("resultMessage").innerHTML = "YOUR LOSS, BUDDY.";
    }
}
})
