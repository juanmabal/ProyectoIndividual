let nump = 11; //Número de párrafo que siempre corresponderá a la fecha y que en cuyo final se agregarán estrellas
let stars = undefined; //Estrellas "encendidas"
let nostars = undefined; //Estrellas "apagadas"
let productsList = [];

/* FOR IN
for (let i = 0; i < carrito.length; i++) {
  articulo = carrito[i];
  for (const property in articulo) {
    console.log(`${property}: ${articulo[property]}`);
  }
} */


function addToKart() {

  if (listaNombres.includes(`${currentProductArray.name}`)) { //Si el carrito contiene al producto..
    alert("Este producto ya se encuentra en su carrito");
  } else {  //Si el carrito no lo contiene: Se agrega el producto al carrito
    carrito.push({
      "Id": `${currentProductArray.id}`,
      "Imagen": `${currentProductArray.images[0]}`,
      "Nombre": `${currentProductArray.name}`,
      "Moneda": `${currentProductArray.currency}`,
      "Costo": `${currentProductArray.cost}`,
      "Subtotal": `subtotal`+`${currentProductArray.id}`,
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location = "cart.html" 
  }
}

function addToCart() { //AGREGAR AL CARRITO

  if (localStorage.getItem("carrito")) { //Si el carrito existe..
    carrito = JSON.parse(localStorage.getItem("carrito"));
    listaNombres = [];
    for (let i = 0; i < carrito.length; i++) {
      articulo = carrito[i];
      listaNombres.push(articulo.Nombre)
    }
    console.log("a");
    addToKart();
  } else { //Si no existe: Crear carrito
    let carrito = [{
    "Id": `${currentProductArray.id}`,
    "Imagen": `${currentProductArray.images[0]}`,
    "Nombre": `${currentProductArray.name}`,
    "Moneda": `${currentProductArray.currency}`,
    "Costo": `${currentProductArray.cost}`,
    "Subtotal": `subtotal`+`${currentProductArray.id}`,
    }];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location = "cart.html" 
  }
}

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
        <button onclick="addToCart()" type="button" class="btn btn-success my-3" id="addToCart">Agregar al carrito</button>
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

      //DESAFÍO - Entrega 4
      document.getElementById("container").innerHTML += 
      `<div id="carouselExampleIndicators" class="carousel slide w-50" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="${currentProductArray.images[0]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${currentProductArray.images[1]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${currentProductArray.images[2]}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="${currentProductArray.images[3]}" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`

}

function showCommentsList() { //Lista de comentarios

    document.getElementById("container").innerHTML += `<p class="commentaries-title">Comentarios</p>`;
    
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

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showRelatedProducts(){

    for (let i = 0; i < currentProductArray.relatedProducts.length; i++) {
        let relatedProduct = currentProductArray.relatedProducts[i];

        document.getElementById("related_products").innerHTML +=
         `<div onclick="setProdID(${relatedProduct.id})" class="related_products">
         <img src="${relatedProduct.image}" class="images">
         <p>${relatedProduct.name}</p>
         </div>`;
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
                    showRelatedProducts();
                }
            });

        }
    });
    
                                                 //DESAFÍO - Entrega 3
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