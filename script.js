/* =========================
   HOSPITAL TOKEN SYSTEM
========================= */

/* TOKEN COUNTER */

let tokenCounter =
parseInt(localStorage.getItem("tokenCounter")) || 100;

/* =========================
   PATIENT LOGIN
========================= */

function login(){

    let name =
    document.getElementById("name").value.trim();

    let phone =
    document.getElementById("phone").value.trim();

    /* VALIDATION */

    if(name === "" || phone === ""){

        alert("Please fill all fields");
        return;

    }

    if(phone.length < 10){

        alert("Enter valid phone number");
        return;

    }

    /* SAVE */

    localStorage.setItem("patientName", name);

    localStorage.setItem("patientPhone", phone);

    /* SHOW MENU */

    document.getElementById("menu").style.display = "block";

}

/* =========================
   LOAD DOCTORS
========================= */

function loadDoctorDropdown(){

    let doctorSelect =
    document.getElementById("doctor");

    if(!doctorSelect) return;

    /* CLEAR OLD */

    doctorSelect.innerHTML = `
        <option value="">
            Select Doctor
        </option>
    `;

    let doctors =
    JSON.parse(localStorage.getItem("doctors")) || [];

    let department =
    document.getElementById("department").value;

    /* FILTER DOCTORS */

    doctors.forEach((d)=>{

        if(d.department === department){

            let option =
            document.createElement("option");

            option.value = d.doctor;

            option.textContent =
            d.doctor;

            doctorSelect.appendChild(option);

        }

    });

}

/* =========================
   BOOK TOKEN
========================= */

function bookToken(){

    let name =
    document.getElementById("pname").value.trim();

    let age =
    document.getElementById("age").value.trim();

    let hospital =
    document.getElementById("hospital").value;

    let department =
    document.getElementById("department").value;

    let doctor =
    document.getElementById("doctor").value;

    /* VALIDATION */

    if(
        name === "" ||
        age === "" ||
        hospital === "" ||
        department === "" ||
        doctor === ""
    ){

        alert("Please fill all fields");

        return;

    }

    /* GENERATE TOKEN */

    tokenCounter++;

    localStorage.setItem(
        "tokenCounter",
        tokenCounter
    );

    let token =
    "OP" + tokenCounter;

    /* PATIENT OBJECT */

    let patient = {

        name:name,
        age:age,
        hospital:hospital,
        department:department,
        doctor:doctor,
        token:token,
        status:"Waiting",
        bookingTime:new Date().toLocaleTimeString()

    };

    /* SAVE PATIENT */

    let patients =
    JSON.parse(localStorage.getItem("patients")) || [];

    patients.push(patient);

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );

    /* SAVE CURRENT PATIENT */

    localStorage.setItem("myToken", token);

    /* SHOW RESULT */

    let result =
    document.getElementById("result");

    result.style.display = "block";

    result.innerHTML = `
        Your Token Number <br><br>
        <span class="big-text">${token}</span>
    `;

}

/* =========================
   ADMIN LOGIN
========================= */

function adminLogin(){

    let password =
    document.getElementById("pass").value;

    if(password === "12345"){

        document.getElementById(
            "adminPanel"
        ).style.display = "block";

        loadDoctors();

        loadPatients();

    }

    else{

        alert("Wrong Password");

    }

}

/* =========================
   ADD DOCTOR
========================= */

function addDoctor(){

    let hospital =
    document.getElementById("hospital").value.trim();

    let department =
    document.getElementById("department").value.trim();

    let doctor =
    document.getElementById("doctorName").value.trim();

    if(
        hospital === "" ||
        department === "" ||
        doctor === ""
    ){

        alert("Please fill all fields");

        return;

    }

    let doctors =
    JSON.parse(localStorage.getItem("doctors")) || [];

    doctors.push({

        hospital:hospital,
        department:department,
        doctor:doctor

    });

    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );

    alert("Doctor Added");

    loadDoctors();

}

/* =========================
   LOAD DOCTOR LIST
========================= */

function loadDoctors(){

    let list =
    document.getElementById("doctorList");

    if(!list) return;

    list.innerHTML = "";

    let doctors =
    JSON.parse(localStorage.getItem("doctors")) || [];

    doctors.forEach((d,index)=>{

        let li =
        document.createElement("li");

        li.innerHTML = `
            ${d.hospital}
            |
            ${d.department}
            |
            ${d.doctor}

            <button
            class="delete-btn"
            onclick="deleteDoctor(${index})">
            Delete
            </button>
        `;

        list.appendChild(li);

    });

}

/* =========================
   DELETE DOCTOR
========================= */

function deleteDoctor(index){

    let doctors =
    JSON.parse(localStorage.getItem("doctors")) || [];

    doctors.splice(index,1);

    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );

    loadDoctors();

}

/* =========================
   LOAD PATIENT LIST
========================= */

function loadPatients(){

    let list =
    document.getElementById("patientList");

    if(!list) return;

    list.innerHTML = "";

    let patients =
    JSON.parse(localStorage.getItem("patients")) || [];

    patients.forEach((p,index)=>{

        let li =
        document.createElement("li");

        li.innerHTML = `

            <b>${p.token}</b><br>

            ${p.name}<br>

            ${p.department}<br>

            Dr. ${p.doctor}<br>

            Status :
            ${p.status}

        `;

        list.appendChild(li);

    });

}

/* =========================
   UPDATE CURRENT TOKEN
========================= */

function updateCurrentToken(){

    let current =
    document.getElementById(
        "currentTokenInput"
    ).value;

    if(current === ""){

        alert("Enter token");

        return;

    }

    localStorage.setItem(
        "currentToken",
        current
    );

    alert("Current Token Updated");

}

/* =========================
   NEXT TOKEN
========================= */

function nextToken(){

    let current =
    parseInt(
        localStorage.getItem("currentToken")
    ) || 100;

    current++;

    localStorage.setItem(
        "currentToken",
        current
    );

    loadDashboard();

}

/* =========================
   DASHBOARD
========================= */

function loadDashboard(){

    let token =
    localStorage.getItem("myToken");

    let current =
    parseInt(
        localStorage.getItem("currentToken")
    ) || 100;

    if(!token) return;

    let myNumber =
    parseInt(token.replace("OP",""));

    let waiting =
    myNumber - current;

    if(waiting < 0){

        waiting = 0;

    }

    let time =
    waiting * 5;

    /* DISPLAY */

    if(document.getElementById("myToken")){

        document.getElementById(
            "myToken"
        ).innerHTML = token;

    }

    if(document.getElementById("currentToken")){

        document.getElementById(
            "currentToken"
        ).innerHTML = "OP" + current;

    }

    if(document.getElementById("waitingCount")){

        document.getElementById(
            "waitingCount"
        ).innerHTML = waiting;

    }

    if(document.getElementById("waitingTime")){

        document.getElementById(
            "waitingTime"
        ).innerHTML = time + " mins";

    }

}

/* =========================
   AUTO REFRESH DASHBOARD
========================= */

setInterval(()=>{

    loadDashboard();

},1000);

/* =========================
   PAGE LOAD EVENTS
========================= */

window.onload = ()=>{

    /* BOOK PAGE */

    if(document.getElementById("department")){

        loadDoctorDropdown();

        document
        .getElementById("department")
        .addEventListener(
            "change",
            loadDoctorDropdown
        );

    }

    /* DASHBOARD */

    loadDashboard();

};
