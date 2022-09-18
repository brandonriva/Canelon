//Variable para obtener los productos
const url = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("id-producto")}.json`;
//variable para obtener los comentarios
const urlComent = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("id-producto")}.json`;

//Funcion para obtener y mostrar los productos
async function obtenerData(url){ 
    let response = await fetch(url);
    let dato = await response.json();
    console.log(dato)
    let {name, currency, cost, description, category, soldCount, images} = dato;
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
        for (let i = 0; i < images.length; i++){
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
document.addEventListener("DOMContentLoaded", function(){
obtenerData(url);
obtenerComentarios(urlComent);
});

//Obtener Comentarios
async function obtenerComentarios(urlComent){
    let res = await fetch(urlComent);
    let comentarios = await res.json();
    console.log(comentarios);
    for (let i = 0; i < comentarios.length; i++) {
        let item = comentarios[i];
        document.getElementById("comentarios").innerHTML += `

        <p><b>${item.user}</b>${item.dateTime}${puntos(item.score)}
        <br>
        ${item.description}</p><hr>
        `
    }
}

//Mostrar estrellas
function puntos(calificacion){
    let estrellas = "";
    for(let i = 1; i <= 5; i++){
        if(i<= calificacion){
         estrellas += `<span class="fa fa-star checked"></span>`
        }else{
           estrellas += `<span class="fa fa-star"></span>`
        }
    }
    return estrellas;
}