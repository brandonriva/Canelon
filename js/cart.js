const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

document.addEventListener("DOMContentLoaded", function () {
  getProduct(url);
});

muestra = [];
//---------------------------------------------------peticion a la url------------------------------------------------------------------
async function getProduct(url) {
  let response = await fetch(url);
  let res = await response.json();
  muestra = res.articles;
  for (let i = 0; i < muestra.length; i++) {
    let item = muestra[i];
    document.getElementById("tabla-compras").innerHTML +=

      `
      <table>
     <tbody>
      <tr>
      <th scope="row"></th>
      <td><img src="${item.image}" width="70px"></td>
      <td>${item.name}</td>
      <td>${item.currency}${item.unitCost}</td>
      <td><input type="number" id="cantidad" min="1" value="${item.count}"></td>
      <td><b><p id="subtotalC">${item.currency}${item.unitCost * item.count}</p></b></td>
     </tr>
      </tbody>
    `
    let cant = document.getElementById("cantidad");
    let subt = document.getElementById("subtotalC");

    // evento que al realizar input muestra el nuevo subtotal dependiendo de la cantidad de productos a comprar--------------------------
    cant.addEventListener("input", () => {
      subt.innerHTML = `${item.currency + cant.value * item.unitCost}`;
      costo_subtotal.innerText = cant.value * item.unitCost
      calc_envio();
      calc_total();
    });
    //Subtotal en la lista de costos-----------------------------------------------------------------------------------------------------
    let costo_subtotal = document.getElementById("costo-subtotal");
    costo_subtotal.innerText = item.unitCost

    //tipos de envio--------------------------------------------------------------------------------------------------------------------
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let standard = document.getElementById("standard");

    //costo dependiendo el tipo de envio-------------------------------------------------------------------------------------------------
    let costo_envio = document.getElementById("costo-envio");

    premium.addEventListener("click", () => { calc_envio(); calc_total(); });
    express.addEventListener("click", () => { calc_envio(); calc_total(); });
    standard.addEventListener("click", () => { calc_envio(); calc_total(); });

    const calc_envio = () => {
      if (premium.checked) {
        costo_envio.innerText = (costo_subtotal.innerText * premium.value).toFixed(2);
      } else {
        if (express.checked) {
          costo_envio.innerText = (costo_subtotal.innerText * express.value).toFixed(2);
        } else {
          if (standard.checked) {
            costo_envio.innerText = (costo_subtotal.innerText * standard.value).toFixed(2);
          } else {
            costo_envio.innerText = 0
          }
        }
      }
    };

    //costo total sumando el subtotal y el costo de envio---------------------------------------------------------------------------------
    let costo_total = document.getElementById("costo-total");
    const calc_total = () => {
      costo_total.innerText = parseFloat(costo_subtotal.innerText) + parseFloat(costo_envio.innerText)
    };
  }
}

//desabilitar una opcion de pago al seleccionar la otra------------------------------------------------------------------------------------
let tarjeta = document.getElementById('flexRadioDefault1');
let banco = document.getElementById('flexRadioDefault2');

tarjeta.addEventListener("click", () => { pago(); });
banco.addEventListener("click", () => { pago(); });

//Solicitar llenar los campos de forma de pago y quitar el mensaje una vez se llenen con el evento input-----------------------------------
let numeroTarjeta = document.getElementById('number-card');
let codigoSeg = document.getElementById('seg');
let vencimiento = document.getElementById('expiration-date');
let cuentaBancaria = document.getElementById('number-account');

numeroTarjeta.addEventListener("input", () => { pago(); });
codigoSeg.addEventListener("input", () => { pago(); });
vencimiento.addEventListener("input", () => { pago(); });
cuentaBancaria.addEventListener("input", () => { pago(); });

// funcion que verifica los datos de la forma de pago, hablita y deshabilita los check, y solicita llenar los campos----------------------
function pago() {

  if (tarjeta.checked) {
    document.getElementById('pago').innerHTML = `Tarjeta de credito`
    document.getElementById('slect-metodo').innerHTML = ""
    document.getElementById("si_banco").disabled = true;
    document.getElementById("si_tarjeta").disabled = false;

    let numeroTarjeta = document.getElementById('number-card').value;
    let codigoSeg = document.getElementById('seg').value;
    let vencimiento = document.getElementById('expiration-date').value;

    if (numeroTarjeta.length == 0 || codigoSeg.length == 0 || vencimiento.length == 0) {
      document.getElementById('slect-metodo').innerHTML = `Debe completar los datos del metodo de pago`
    } else {
      document.getElementById('slect-metodo').innerHTML = ""
    }

  } else {
    if (banco.checked) {
      document.getElementById('pago').innerHTML = `Transferencia bancaria`
      document.getElementById('slect-metodo').innerHTML = ""
      document.getElementById("si_tarjeta").disabled = true;
      document.getElementById("si_banco").disabled = false;

      let cuentaBancaria = document.getElementById('number-account').value;
      if (cuentaBancaria == 0) {
        document.getElementById('slect-metodo').innerHTML = `Debe completar los datos del metodo de pago`
      } else {
        document.getElementById('slect-metodo').innerHTML = ""
      }

    } else {
      document.getElementById('slect-metodo').innerHTML = `Debe seleccionar una forma de pago`
    }
  }
}

// js de bootstrap para solicitar la direccion de envio y muestra la alerta de su compra fue realizada con exito-------------------------
(function () {
  'use strict'

  let forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          pago()
        }
        else {
          event.preventDefault()
          event.stopPropagation()
          Swal.fire({
            icon: 'success',
            text: 'Su compra fue realizada con éxito!',
          })
        }
        form.classList.add('was-validated')
      }, false)
    })
})()