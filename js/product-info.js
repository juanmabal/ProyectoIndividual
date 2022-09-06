function showCategoriesList(){

    for (let i; i < currentProductArray.images.length ; i++) {
        let image = currentProductArray.images[i];
        console.log(image[1]);      
        document.getElementById("container").innerHTML = `<img src="${image}" class="img-thumbnail">`;   
    }

    document.getElementById("container").innerHTML =
     `<h3>${currentProductArray.name}</h3>
      <p>Precio</p>
      <p>${currentProductArray.cost}</p>
      <p>Descripción </p>
      <p>${currentProductArray.description}</p>
      <p>Categoría</p>
      <p>${currentProductArray.category}</p>
      <p>Cantidad de vendidos</p>
      <p>${currentProductArray.soldCount}</p>
      <p>Imagenes ilustrativas</p>
      <img src="${currentProductArray.images[0]}" class="img-thumbnail">
      <img src="${currentProductArray.images[1]}" class="img-thumbnail">
      <img src="${currentProductArray.images[2]}" class="img-thumbnail">
      <img src="${currentProductArray.images[3]}" class="img-thumbnail">`
      // <img src="${currentProductArray.images[1]}" class="img-thumbnail"> 
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

});