let mail = document.getElementById('loginMail');
let password = document.getElementById('loginPassword');
let btn_login = document.getElementById('btn-login');

function validate(mail, password){
    if(mail.value === "" || password.value === ""){
        alert('por favor complete todos los campos')
    }else{
        localStorage.setItem("usuario", mail.value);
        location.replace("index.html");
    }
}

btn_login.addEventListener("click", ()=>{validate(mail, password)})