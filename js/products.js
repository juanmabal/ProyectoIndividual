const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let search = undefined

function compare_cost_asc( a, b )  {
    if ( a.cost > b.cost){
      return 1;
    }
    if ( a.cost < b.cost){
      return -1;
    }
    return 0;
  }

  function compare_cost_desc( a, b )  {
    if ( a.cost > b.cost){
      return -1;
    }
    if ( a.cost < b.cost){
      return 1;
    }
    return 0;
  }

  function relevance_desc( a, b )  {
    if ( a.soldCount > b.soldCount){
      return -1;
    }
    if ( a.soldCount < b.soldCount){
      return 1;
    }
    return 0;
  }

/* function compare_name( a, b )  {
    if ( a.name.toLowerCase() < b.name.toLowerCase()){
      return -1;
    }
    if ( a.name.toLowerCase() > b.name.toLowerCase()){
      return 1;
    }
    return 0;
  } */

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.products.length; i++){
        let product = currentProductsArray.products[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name + ' - USD ' + product.cost}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
    
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(`${PRODUCTS_URL}${CatID}${EXT_TYPE}`).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data
            document.getElementById("cat-name").innerHTML = 'Verás aquí todos los productos de la categoría ' + currentProductsArray.catName;
            showProductsList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){ //Botón para filtrar por precio (ascendente)
        currentProductsArray.products.sort(compare_cost_asc);
        showProductsList();


    });

    document.getElementById("sortDesc").addEventListener("click", function(){ //Botón para filtrar por precio (descendente)
        currentProductsArray.products.sort(compare_cost_desc);
        showProductsList();
    });

    document.getElementById("sortByCount").addEventListener("click", function(){ //Botón para filtrar por relevancia (descendente)
        currentProductsArray.products.sort(relevance_desc);
        showProductsList();
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

});