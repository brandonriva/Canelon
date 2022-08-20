function verificar() {
    let mail = document.getElementById('loginMail').value;
    let password = document.getElementById('loginPassword').value;
    if (mail.length>0 && password.length>0) {
        location.replace("http://127.0.0.1:5500/portada.html");
    }else{
        alert('por favor complete todos los campos');
    }
}