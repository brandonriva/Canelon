const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
let productsArray = [];
let listaFiltrada = [];

function showCategoriesList(lista) {
    let htmlContentToAppend = "";

    for (let i = 0; i < lista.length; i++) {
        let item = lista[i];
        htmlContentToAppend += `
        <div class="lista" onclick="obtenerID(${item.id})">
            <div class="row">
                <div class="col-3">
                    <img src="` + item.image + `" alt="` + item.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ item.name + " - " + item.currency + " " + item.cost + `</h4> 
                        <p> `+ item.description + `</p>
                        </div>
                        <small class="text-muted">` + item.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("comienzo").innerHTML = htmlContentToAppend;
    }
}

async function getdata(url){
    let response = await fetch(url);
    let dato = await response.json();
    productsArray = dato.products;
    console.log(productsArray);
showCategoriesList(productsArray);
};

document.addEventListener("DOMContentLoaded", function () {
 
        getdata(url);
    //filtro de mayor precio
    document.getElementById("mayorPrecio").addEventListener("click", () => {
        productsArray.sort((a, b) => {
            if (a.cost > b.cost) return -1;
            if (a.cost < b.cost) return 1;
            return 0;
        });
        showCategoriesList(productsArray);
    });
    //filtro de menor precio
    document.getElementById("menorPrecio").addEventListener("click", () => {
        productsArray.sort((a, b) => {
            if (a.cost < b.cost) return -1;
            if (a.cost > b.cost) return 1;
            return 0;
        });
        showCategoriesList(productsArray);
    });
    //filtro de mayor relevancia
    document.getElementById("mayorRelevancia").addEventListener("click", () => {
        productsArray.sort((a, b) => {
            if (a.soldCount > b.soldCount) return -1;
            if (a.soldCount < b.soldCount) return 1;
            return 0;
        });
        showCategoriesList(productsArray);
    });
    //Filtro a partir de rango de precio
    document.getElementById("filtrar").addEventListener("click", () => {
        let precio1 = document.getElementById("precio1").value;
        let precio2 = document.getElementById("precio2").value;
        listaFiltrada = productsArray.filter((element) => {
            return element.cost >= precio1 && element.cost <= precio2;
        });
        showCategoriesList(listaFiltrada);
        console.log(listaFiltrada)
    });
    //Filtro para limpiar el rango de precio
    document.getElementById("limpiar").addEventListener("click", () => {
        showCategoriesList(productsArray);
        document.getElementById("precio1").value= "";
        document.getElementById("precio2").value= "";
    });
});


    //guardar id del producto y redireccionar a product-info.html
    function obtenerID(id){
    localStorage.setItem("id-producto", id);
    window.location = "product-info.html"
    };