let nump = 11; //Número de párrafo que siempre corresponderá a la fecha y que en cuyo final se agregarán estrellas
let stars = undefined; //Estrellas "encendidas"
let nostars = undefined; //Estrellas "apagadas"

function addStars() {
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
}


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
      <p class="attributes">Imágenes ilustrativas</p>
      `

      for (let i = 0; i < currentProductArray.images.length; i++) { //Imágenes
        let image = currentProductArray.images[i];
        document.getElementById("container").innerHTML += `<img src="${image}" class="images">`;
    }
}

function showCommentsList() { //Lista de comentarios

    document.getElementById("container").innerHTML += `<p class="commentaries-title">Comentarios</p>`
    
    for (let i = 0; i < currentProductCommentsArray.length; i++) {
        let currentcomment = currentProductCommentsArray[i];
        
        document.getElementById("container").innerHTML += `
        <div class="comment_container">
        <p>${currentcomment.user}</p>
        <p>${currentcomment.dateTime} - </p>
        <p>${currentcomment.description}</p>
        </div>`;

         stars = parseInt(`${currentcomment.score}`); //Estrellas "encendidas"
         nostars = 5 - stars; //Estrellas "apagadas"
         addStars();
         nump += 3; //Cada tres párrafos se encuentra el correspondiente a la fecha 
    }
}

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
    
    document.getElementById("btnEnviar").addEventListener("click", function () { //Botón enviar

        if (localStorage.getItem("usuario")) { //Si el usuario ha iniciado sesión...
            let hoy = new Date();
            //Fecha
            let dia = hoy.getDate();
            let mes = hoy.getMonth();
            let anio = hoy.getFullYear();
            
            //Hora
            let hora = hoy.getHours();
            let minutos = hoy.getMinutes();
            let segundos = hoy.getSeconds();
    
            let fecha = `${anio + '-' + mes + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos}` //Fecha y hora
            let user = localStorage.getItem('usuario'); //Usuario
            let comentario = document.getElementById("comentario").value; //Comentario
    
            document.getElementById("container").innerHTML +=
                `<div class="comment_container">
            <p>${user}</p>
            <p>${fecha} - </p>
            <p>${comentario}</p>
            </div>`;
    
             stars = parseInt(document.getElementById("puntuacion").value); //Puntuación y Estrellas "Encendidas"
             nostars = 5 - stars; //Estrellas "apagadas"
             addStars();

            document.getElementById("comentario").value = ""; //Vacía comentario
            document.getElementById("comentario").disabled = true; //Inhabilita comentario
            document.getElementById("puntuacion").disabled = true; //Inhabilita puntuación
            document.getElementById("btnEnviar").disabled = true; //Inhabilita botón
        
        } else { //Si el usuario no ha iniciado sesión..
            alert("Debe iniciar sesión para comentar");
            window.location = "index.html";
        }
            
    })

});