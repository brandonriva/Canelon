function verificar() {
    let mail = document.getElementById('loginMail').value;
    let password = document.getElementById('loginPassword').value;
    if (mail.length>0 && password.length>0) {
        location.replace("portada.html");
        localStorage.setItem("usuario", mail);
    }else{
        alert('por favor complete todos los campos');
    }
}

