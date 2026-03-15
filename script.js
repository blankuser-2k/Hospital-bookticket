function login(){

let name=document.getElementById("name").value;

localStorage.setItem("patientName",name);

document.getElementById("menu").style.display="block";

}

function bookToken(){

let token=Math.floor(Math.random()*100)+1;

localStorage.setItem("token",token);

document.getElementById("result").innerHTML="Your Token Number: "+token;

}

function adminLogin(){

let password=document.getElementById("pass").value;

if(password=="12345"){

document.getElementById("adminPanel").style.display="block";

}

else{

alert("Wrong Password");

}

}

window.onload=function(){

let name=localStorage.getItem("patientName");
let token=localStorage.getItem("token");

if(document.getElementById("welcome")){

document.getElementById("welcome").innerHTML="Welcome, "+name+" !";

document.getElementById("token").innerHTML=token;

}

                                     }
