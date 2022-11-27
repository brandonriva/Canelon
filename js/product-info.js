//letiable para obtener los productos
const url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("id-producto")}.json`;
//letiable para obtener los comentarios
const urlComent = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("id-producto")}.json`;

//Funcion para obtener y mostrar los productos
async function getData(url) {
    let response = await fetch(url);
    let dato = await response.json();
    console.log(dato)
    let { name, currency, cost, description, category, soldCount, images } = dato;
    document.getElementById("aqui").innerHTML += `
    <div class="row">
        <h4>${name}</h4>
        <hr>
        <h4>Precio</h4>
        <p>${currency}${cost}</p>
        <h4>Descripción</h4>
        <p>${description}</p>
        <h4>Categoría</h4>
        <p>${category}</p>
        <h4>Cantidad de vendidos</h4>
        <p>${soldCount}</p>
        <h4>Imágenes ilustrativas</h4>`
    for (let i = 0; i < images.length; i++) {
        let num = images[i];
        document.getElementById("aqui").innerHTML +=
            `
            <img src="${images[i]}"></img>`
    }
    `
        </div>
    `
}

//Ejecucion de las funciones
document.addEventListener("DOMContentLoaded", function () {
    getData(url);
    getComments(urlComent);
    showUrl(url);
});

//Obtener Comentarios
async function getComments(urlComent) {
    let res = await fetch(urlComent);
    let comentarios = await res.json();
    for (let i = 0; i < comentarios.length; i++) {
        let item = comentarios[i];
        document.getElementById("comentarios").innerHTML += `

        <p><b>${item.user}</b> ${item.dateTime} ${points(item.score)}
        <br>
        ${item.description}</p><hr>
        `
        
    }
}

//Mostrar estrellas
function points(
    qualification) {
    let star = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= qualification) {
            star += `<span class="fa fa-star checked"></span>`
        } else {
            star += `<span class="fa fa-star"></span>`
        }
    }
    return star;
}

//productos relacionados
let products_r = [];

async function showUrl(url) {
    let res = await fetch(url);
    let datos = await res.json();
    products_r = datos.relatedProducts;
    for (let i = 0; i < products_r.length; i++) {
        let item = products_r[i];
        document.getElementById("productos_relacionados").innerHTML += 
            `
            <div class="row row-cols-1 row-cols-md-3 g-4 mb-3" style="max-width: 480px;" onclick="redirectProduct(${item.id})">
                                   <div class="col">
                                     <div class="card">
                                       <img class="card-img-top" src="` + item.image + `">
                                       <div class="card-body">
                                         <h5 class="card-title">` + item.name + `</h5>
                                   </div>
                                 </div>
                               </div>
                               `
                               
           
    }
}

function redirectProduct(id){
    localStorage.setItem("id-producto", id);
    window.location = "product-info.html"
};


//desafiate de guardar un comentario
let comment = document.getElementById("opinion");
let pointProduct = document.getElementById("puntuacion");
let btn_send = document.getElementById("btn-send");

//variable para la fecha y hora
let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let now = today.toLocaleTimeString('es-UY');


function comentProduct(){
    document.getElementById("comentarios").innerHTML += `
    <p><b>${localStorage.getItem('usuario')}</b> ${year}-${month}-${day} ${now} ${points(pointProduct.value)}
        <br>
        ${comment.value}</p><hr>`
}

btn_send.addEventListener("click", ()=>{comentProduct()})