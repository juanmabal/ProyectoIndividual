function showCategoriesList() {

    for (let i; i < currentProductArray.images.length; i++) {
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
        `<h4 class="commentaries-title ">Comentarios</h4>
    <div class="comment_container">
    <p>${currentProductCommentsArray[0].user}</p>
    <p>${currentProductCommentsArray[0].dateTime} - </p>
    <p>${currentProductCommentsArray[0].description}</p>
    </div>`;

    let nochecked_stars = parseInt(`${currentProductCommentsArray[3].score}`); //Estrellas negativas
    let original_nocheckedstars = nochecked_stars; //Estrellas negativas originales

    let checkedstars = 5 - nochecked_stars; //Estrellas positivas

    while (nochecked_stars < 5) {
        nochecked_stars += 1;
        const spanhijo = document.createElement("span")
        spanhijo.className += "fa fa-star";
        document.getElementsByTagName("p")[10].insertAdjacentElement("beforeend", spanhijo);
    }

    console.log(checkedstars)
    console.log(original_nocheckedstars)

    if (currentProductCommentsArray[3].score == 5) {
        while (checkedstars < original_nocheckedstars) {
            console.log("aa")
            const spanhija = document.createElement("span")
            spanhija.className += "fa fa-star checked";
            document.getElementsByTagName("p")[10].insertAdjacentElement("beforeend", spanhija);
            checkedstars += 1;
        } 
    } else {
        
        while (checkedstars <= original_nocheckedstars) {
            console.log("bb")
            const spanhija = document.createElement("span")
            spanhija.className += "fa fa-star checked";
            document.getElementsByTagName("p")[10].insertAdjacentElement("beforeend", spanhija);
            checkedstars += 1;
        } 
    }

    document.getElementById("container").innerHTML += `<div class="comment_container">
    <p>${currentProductCommentsArray[1].user}</p>
    <p>${currentProductCommentsArray[1].dateTime}</p>
    <p>${currentProductCommentsArray[1].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[2].user}</p>
    <p>${currentProductCommentsArray[2].dateTime}</p>
    <p>${currentProductCommentsArray[2].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[3].user}</p>
    <p>${currentProductCommentsArray[3].dateTime}</p>
    <p>${currentProductCommentsArray[3].description}</p>
    </div>`


    {/* <p>${currentProductCommentsArray[0].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[1].user}</p>
    <p>${currentProductCommentsArray[1].dateTime}</p>
    <p>${currentProductCommentsArray[1].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[2].user}</p>
    <p>${currentProductCommentsArray[2].dateTime}</p>
    <p>${currentProductCommentsArray[2].description}</p>
    </div>
    <div class="comment_container">
    <p>${currentProductCommentsArray[3].user}</p>
    <p>${currentProductCommentsArray[3].dateTime}</p>
    <p>${currentProductCommentsArray[3].description}</p>
    </div>` */}



    let parrafo = document.getElementsByTagName("p")[11];
    console.log(parrafo);

    const spanhijo = document.createElement("span")
    spanhijo.className += "fa fa-star checked";
    /* document.getElementsByTagName("p")[10].insertAdjacentElement("beforeend", spanhijo); */

    const spanhijoo = document.createElement("span")
    spanhijoo.className += "fa fa-star checked";
    /* document.getElementsByTagName("p")[11].insertAdjacentElement("beforebegin", spanhijoo); */

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductArray = resultObj.data
            showCategoriesList();

            getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    currentProductCommentsArray = resultObj.data
                    showCommentsList();
                }
            });

        }
    });

    document.getElementById("btnEnviar").addEventListener("click", function () {

        //Fecha y Hora
        let hoy = new Date();
        let dia = hoy.getDate();
        let mes = hoy.getMonth();
        let anio = hoy.getFullYear();
        let hora = hoy.getHours();
        let minutos = hoy.getMinutes();
        let segundos = hoy.getSeconds();

        let fecha = `${anio + '-' + mes + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos}`
        let user = localStorage.getItem('usuario');
        let comentario = document.getElementById("comentario").value;

        document.getElementById("container").innerHTML +=
            `<div class="comment_container">
        <p>${user}</p>
        <p>${fecha}</p>
        <p>${comentario}</p>
        </div>`;


    })


});