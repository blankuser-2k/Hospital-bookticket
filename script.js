let currentToken = 5
let waitingPatients = 0

function login(){

let name = document.getElementById("name").value

localStorage.setItem("patientName",name)

document.getElementById("menu").style.display="block"

}

function bookToken(){

waitingPatients++

let token = currentToken + waitingPatients

localStorage.setItem("token",token)
localStorage.setItem("waiting",waitingPatients)

document.getElementById("result").innerHTML="Your Token Number: "+token

}

function adminLogin(){

let password=document.getElementById("pass").value

if(password=="12345"){

document.getElementById("adminPanel").style.display="block"

}
else{

alert("Wrong Password")

}

}

window.onload=function(){

let name=localStorage.getItem("patientName")
let token=localStorage.getItem("token")

if(document.getElementById("welcome")){

let waiting = token - currentToken - 1
let time = waiting * 5

document.getElementById("welcome").innerHTML="Welcome, "+name+" !"

document.getElementById("token").innerHTML=token

document.getElementById("current").innerHTML=currentToken

document.getElementById("waiting").innerHTML=waiting

document.getElementById("time").innerHTML=time

}

}
