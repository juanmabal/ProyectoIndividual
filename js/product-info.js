function showInfoList() { //Información principal: Precio - Descripción - Categoría - Vendidos

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
      `

      for (let i = 0; i < currentProductArray.images.length; i++) { //Imágenes
        let image = currentProductArray.images[i];
        document.getElementById("container").innerHTML += `<img src="${image}" class="images">`;
    }

}

function showCommentsList() { //Lista de comentarios

    let nump = 10; //Número de párrafo que siempre corresponderá a la fecha y que en cuyo final se agregarán estrellas
    let stars = undefined; //Estrellas "encendidas"
    let nostars = undefined //Estrellas "apagadas"

    for (let i = 0; i < currentProductCommentsArray.length; i++) {

        let currentcomment = currentProductCommentsArray[i];
        document.getElementById("container").innerHTML += `
        <div class="comment_container">
        <p>${currentcomment.user}</p>
        <p>${currentcomment.dateTime} - </p>
        <p>${currentcomment.description}</p>
        </div>`;

        stars = parseInt(`${currentcomment.score}`);
        nostars = 5 - stars;

        while (nostars < 5) {
            const estrella = document.createElement("span")
            estrella.className += "fa fa-star checked"; //Estrella encendida
            document.getElementsByTagName("p")[nump].insertAdjacentElement("beforeend", estrella);
            nostars += 1;
        }

        while (stars < 5) {
            const estrella = document.createElement("span") 
            estrella.className += "fa fa-star"; //Estrella apagada
            document.getElementsByTagName("p")[nump].insertAdjacentElement("beforeend", estrella);
            stars += 1;
        }

        nump += 3; //Cada tres párrafos se encuentra el correspondiente a la fecha
        
    }


}

let nump = 22;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(`${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductArray = resultObj.data
            showInfoList();

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
        <p>${fecha} - </p>
        <p>${comentario}</p>
        </div>`;

        let stars = undefined; //Estrellas "encendidas"
        let nostars = undefined //Estrellas "apagadas"

        stars = parseInt(document.getElementById("puntuacion").value);
        nostars = 5 - stars;

        while (nostars < 5) {
            const estrella = document.createElement("span")
            estrella.className += "fa fa-star checked"; //Estrella encendida
            document.getElementsByTagName("p")[nump].insertAdjacentElement("beforeend", estrella);
            nostars += 1;
        }

        while (stars < 5) {
            const estrella = document.createElement("span") 
            estrella.className += "fa fa-star"; //Estrella apagada
            document.getElementsByTagName("p")[nump].insertAdjacentElement("beforeend", estrella);
            stars += 1;
        }

        nump += 3; //Cada tres párrafos se encuentra el correspondiente a la fecha
              
    })


});