let firstName = document.getElementById('firstName');
let secondName = document.getElementById('secondName');
let fisrtLastname = document.getElementById('fisrtLastname');
let secondLastname = document.getElementById('secondLastname');
let e_mail = document.getElementById('e_mail');
let numberContact = document.getElementById('numberContact');
let btn_profile = document.getElementById('btn_profile');

document.addEventListener("DOMContentLoaded", ()=>{
e_mail.value = localStorage.getItem('usuario');
showDataProfile(firstName, secondLastname, secondName, fisrtLastname, e_mail, numberContact);
})

function validation(firstName, secondLastname, secondName, fisrtLastname, e_mail, numberContact){
    if(firstName.value === '' || fisrtLastname.value ==='' || e_mail.value === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe completar los campos que tienen (*)',
          })
    }else{
        localStorage.setItem("firstName",firstName.value);
        localStorage.setItem("secondName",secondName.value);
        localStorage.setItem("fisrtLastname",fisrtLastname.value);
        localStorage.setItem("secondLastname",secondLastname.value);
        localStorage.setItem("usuario",e_mail.value);
        localStorage.setItem("numberContact",numberContact.value);
        Swal.fire({
            icon: 'success',
            title: 'Sus datos fueron guardados correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          showDataProfile();
      
    }
}

function showDataProfile(firstName, secondLastname, secondName, fisrtLastname, e_mail, numberContact){
    firstName.value = localStorage.getItem('firstName');
    secondName.value = localStorage.getItem('secondName');
    fisrtLastname.value = localStorage.getItem('fisrtLastname');
    secondLastname.value = localStorage.getItem('secondLastname');
    e_mail.value = localStorage.getItem('usuario');
    numberContact.value = localStorage.getItem('numberContact');
}
