// current token stored in browser
let currentToken = parseInt(localStorage.getItem("currentToken")) || 1;


// PATIENT LOGIN
function login(){

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;

if(name === "" || phone === ""){
alert("Please enter name and phone");
return;
}

localStorage.setItem("patientName", name);
localStorage.setItem("patientPhone", phone);

document.getElementById("menu").style.display = "block";

}


// BOOK TOKEN
function bookToken(){

let name = document.getElementById("pname").value;
let age = document.getElementById("age").value;

if(name === "" || age === ""){
alert("Please fill all details");
return;
}

let patients = JSON.parse(localStorage.getItem("patients")) || [];

let token = currentToken + patients.length + 1;

patients.push({
name: name,
age: age,
token: token
});

localStorage.setItem("patients", JSON.stringify(patients));
localStorage.setItem("token", token);

document.getElementById("result").innerHTML =
"Your Token Number: " + token;

}


// ADMIN LOGIN
function adminLogin(){

let password = document.getElementById("pass").value;

if(password === "12345"){

document.getElementById("adminPanel").style.display = "block";

loadDoctors();
loadPatients();

}
else{

alert("Wrong Password");

}

}


// ADD DOCTOR
function addDoctor(){

let hospital = document.getElementById("hospital").value;
let department = document.getElementById("department").value;
let doctor = document.getElementById("doctor").value;

if(hospital === "" || department === "" || doctor === ""){
alert("Fill all fields");
return;
}

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

doctors.push({
hospital: hospital,
department: department,
doctor: doctor
});

localStorage.setItem("doctors", JSON.stringify(doctors));

loadDoctors();

}


// LOAD DOCTOR LIST
function loadDoctors(){

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

let list = document.getElementById("doctorList");

if(!list) return;

list.innerHTML = "";

doctors.forEach((d,i)=>{

let li = document.createElement("li");

li.innerHTML =
d.hospital + " - " + d.department + " - " + d.doctor +
" <button onclick='deleteDoctor("+i+")'>Delete</button>";

list.appendChild(li);

});

}


// DELETE DOCTOR
function deleteDoctor(index){

let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

doctors.splice(index,1);

localStorage.setItem("doctors", JSON.stringify(doctors));

loadDoctors();

}


// UPDATE CURRENT TOKEN
function updateToken(){

let token = document.getElementById("currentTokenInput").value;

if(token === ""){
alert("Enter token number");
return;
}

localStorage.setItem("currentToken", token);

alert("Current token updated");

}


// LOAD PATIENT LIST
function loadPatients(){

let patients = JSON.parse(localStorage.getItem("patients")) || [];

let list = document.getElementById("patientList");

if(!list) return;

list.innerHTML = "";

patients.forEach(p=>{

let li = document.createElement("li");

li.innerText = p.name + " | Token: " + p.token;

list.appendChild(li);

});

}


// DASHBOARD DATA
window.onload = function(){

let name = localStorage.getItem("patientName");
let token = parseInt(localStorage.getItem("token"));
let current = parseInt(localStorage.getItem("currentToken")) || 1;

if(document.getElementById("welcome")){

let waiting = token - current - 1;

if(waiting < 0) waiting = 0;

let time = waiting * 5;

document.getElementById("welcome").innerHTML = "Welcome, " + name;

document.getElementById("token").innerHTML = token;

document.getElementById("current").innerHTML = current;

document.getElementById("waiting").innerHTML = waiting;

document.getElementById("time").innerHTML = time;

}

};
