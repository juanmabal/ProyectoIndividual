function showCategoriesList(){

    for (let i; i < currentProductArray.images.length ; i++) {
        let image = currentProductArray.images[i];
        console.log(image[1]);      
        document.getElementById("container").innerHTML = `<img src="${image}" class="img-thumbnail">`;   
    }

    document.getElementById("container").innerHTML =
     `<h3 id="product-name">${currentProductArray.name}</h3>
     <hr>
      <p class="attributes">Precio</p>
      <p>UYU ${currentProductArray.cost}</p>
      <p class="attributes">Descripción </p>
      <p>${currentProductArray.description}</p>
      <p class="attributes">Categoría</p>
      <p>${currentProductArray.category}</p>
      <p class="attributes">Cantidad de vendidos</p>
      <p>${currentProductArray.soldCount}</p>
      <p class="attributes">Imagenes ilustrativas</p>
      <img class ="images" src="${currentProductArray.images[0]}">
      <img class ="images" src="${currentProductArray.images[1]}">
      <img class ="images" src="${currentProductArray.images[2]}">
      <img class ="images" src="${currentProductArray.images[3]}">
      `
      
}

function showCommentsList() {


    document.getElementById("container").innerHTML += 
    `<h4 id="commentaries-title">Comentarios</h4>
    <div class="comment_container">
    <p>${currentProductCommentsArray[0].user + ' - ' + currentProductCommentsArray[0].dateTime}
    <p>${currentProductCommentsArray[0].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[1].user + ' - ' + currentProductCommentsArray[1].dateTime}
    <p>${currentProductCommentsArray[1].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[2].user + ' - ' + currentProductCommentsArray[2].dateTime}
    <p>${currentProductCommentsArray[2].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[3].user + ' - ' + currentProductCommentsArray[3].dateTime}
    <p>${currentProductCommentsArray[3].description}</p>
    </div>`
    

}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray = resultObj.data
            console.log(currentProductArray.images.length);
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductCommentsArray = resultObj.data
            showCommentsList();
            /* showCategoriesList() */
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

});