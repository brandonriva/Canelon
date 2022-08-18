const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let categoriesArray = [];

function showCategoriesList(lista) {
    let htmlContentToAppend = "";

    for (let i = 0; i < lista.length; i++) {
        let item = lista[i];
        htmlContentToAppend += `
        <div class="lista">
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

document.addEventListener("DOMContentLoaded", function () {
    fetch(url)
        .then(response => response.json())
        .then(datos => {
            categoriesArray = datos.products;
            document.getElementById("inicio").innerHTML += " " + datos.catName;
            showCategoriesList(categoriesArray)
            console.log(categoriesArray)
        });

});