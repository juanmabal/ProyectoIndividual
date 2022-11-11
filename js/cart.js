let subtotal = undefined;
let unitCost = undefined;
let cantArticles = undefined;
let currency = undefined;
let subtotalpremium = undefined;
let subtotalexpress = undefined;
let subtotalstandard = undefined;

function showFullCart() { //DESAFÍO
  localStorage.getItem("carrito");
  carrito = JSON.parse(localStorage.getItem("carrito"));
  for(let i = 0; i < carrito.length; i++) {
    articulo = carrito[i];
    document.getElementById("carrito").innerHTML += 
    `<tr>
    <td scope="row"><img src="${articulo.Imagen}" alt=""></td>
    <td>${articulo.Nombre}</td>
    <td>${articulo.Moneda +` `+ articulo.Costo}</td>
    <td><input type="number" id="${articulo.Id}" data-id="${articulo.Id}" min="1"
    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></td>
    <td id="${articulo.Subtotal}">${articulo.Moneda + ` ` + articulo.Costo + ` - ` + articulo.Subtotal}</td>
    <td><button class="btn eliminar-articulo"><i class="fa fa-trash"></i></button></td>
    </tr>`
  }
}

/*  let pruebaidsubtotal = document.getElementById("subtotal50922").innerHTML;
 console.log(pruebaidsubtotal);  */

/* function article_Subtotal(costo, id, money, idsubtotal) {

   document.getElementById(idsubtotal).innerHTML += "a";
  console.log(idsubtotal);
  
  carrito = JSON.parse(localStorage.getItem("carrito"));
  console.log(carrito);
  let found = carrito.find(element => element.id = id);
  console.log(found);
  console.log(id);

      unitCost = costo;
      cantArticles = document.getElementById(id).value;
      subtotal = unitCost * cantArticles;
      document.getElementById(idsubtotal).innerHTML = subtotal + ` ` + money;
      console.log(idsubtotal);

 document.getElementById(idsubtotal).innerHTML = `${money}` + subtotal; 
} */

function article_Subtotal(event) {
 /*  let atributo = document.getElementById(id).value;
  console.log(atributo); */
console.log(event.target);
/* let artid = event.target.id;
let subtotalarc = document.getElementById(artid).value;
console.log(subtotalarc); */
}


function enviopremium() {
  subtotalpremium = ((subtotal * 15) / 100);
  document.getElementById("subtotal2").innerHTML = `USD ` + subtotalpremium;
  document.getElementById("subtotal3").innerHTML = `USD ` + (subtotal + subtotalpremium);
}

function envioexpress() {
  subtotalexpress = ((subtotal * 7) / 100);
  document.getElementById("subtotal2").innerHTML = `USD ` + subtotalexpress;
  document.getElementById("subtotal3").innerHTML = `USD ` + (subtotal + subtotalexpress);
}

function enviostandard() {
  subtotalstandard = ((subtotal * 5) / 100);
  document.getElementById("subtotal2").innerHTML = `USD ` + subtotalstandard;
  document.getElementById("subtotal3").innerHTML = `USD ` + (subtotal + subtotalstandard);
}

function newSubtotal() {

   unitCost = `${currentArticleArray.articles[0].unitCost}`;
   cantArticles = document.getElementById("cant_articles").value;
   subtotal = unitCost * cantArticles;
   currency = `${currentArticleArray.articles[0].currency}`;

  document.getElementById("subtotal").innerHTML = currency +` `+ subtotal;
  document.getElementById("subtotal1").innerHTML = currency +` `+ subtotal;

  if (document.getElementById("premium").checked) {
    enviopremium();
  } else if (document.getElementById("express").checked) {
    envioexpress();
    } else if (document.getElementById("standard").checked) {
      enviostandard();
    }
}

function pagoTarjeta() {
  if (document.getElementById("tarjeta").checked) {
    document.getElementById("numtarjeta").disabled = false;
    document.getElementById("codigo").disabled = false;
    document.getElementById("vencimiento").disabled = false;

    document.getElementById("cuenta").disabled = true;
    document.getElementById("cuenta").value = "";
  }
}

function pagoTransferencia() {
  if (document.getElementById("bancaria").checked) {
    document.getElementById("cuenta").disabled = false;

    document.getElementById("numtarjeta").disabled = true;
    document.getElementById("numtarjeta").value = "";
    document.getElementById("codigo").disabled = true;
    document.getElementById("codigo").value = "";
    document.getElementById("vencimiento").disabled = true;
    document.getElementById("vencimiento").value = "";
  }
}

function pagoSeleccionado() {
  if (document.getElementById("tarjeta").checked) {
    document.getElementById("noseleccionado").innerHTML = `Tarjeta de crédito`;
  } else if (document.getElementById("bancaria").checked) {
    document.getElementById("noseleccionado").innerHTML = `Transferencia bancaria`;
  }
}

function feedbackFormCarrito() {
  let modalForm = document.getElementById("modalForm");
  let formCarrito = document.getElementById("formCarrito")
  let finalizar_compra = document.getElementById("finalizar-compra");
  formCarrito.addEventListener('submit', function (event) {
    if (!formCarrito.checkValidity() || !modalForm.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
      formCarrito.classList.add('was-validated');
      modalForm.classList.add('was-validated');
      feedbackModal();
    } else {
      event.preventDefault()
      event.stopPropagation()
      successMessage();
    }
  })
}

function feedbackModal() {
  let modalForm = document.getElementById("modalForm");
  if (!modalForm.checkValidity() && formCarrito.classList.contains("was-validated")) {
   let pagoNoValido = document.getElementById("pagoNoValido");
   pagoNoValido.style.display = 'block';
  } else {
   pagoNoValido.style.display = 'none';
  }
 }

function successMessage() {
  document.getElementById("success").innerHTML += 
  `<div class="alert alert-success" role="alert"> ¡Has comprado con exito!
</div>`
}

function showCart() {
    
    document.getElementById("cart-container").innerHTML += 
    ` <form id="formCarrito" class="row g-3 needs-validation" novalidate>
    <h1>Carrito de compras</h1>
    <h2 class="titulosCarrito">Artículos a comprar</h2>
    <div class="table-responsive">
      <table class="table" id="carrito">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Costo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row"><img src="${currentArticleArray.articles[0].image}" alt=""></td>
            <td>${currentArticleArray.articles[0].name}</td>
            <td>${currentArticleArray.articles[0].currency +` `+ currentArticleArray.articles[0].unitCost}</td>
            <td><input type="number" oninput="newSubtotal()" id="cant_articles" class="form-control" min="1" required
                onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></td>
            <td id="subtotal">${currentArticleArray.articles[0].currency +` `+ currentArticleArray.articles[0].unitCost}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <h2 class="titulosCarrito">Tipo de envío</h2>
    <div>
    <div class="form-check">
      <input oninput="enviopremium()" id="premium" type="radio" class="form-check-input" name="tipoEnvio" required>
      <label class="form-check-label" for="premium">Premium - 2 a 5 días (15%)</label>
    </div>
    <div class="form-check">
      <input oninput="envioexpress()" id="express" type="radio" class="form-check-input" name="tipoEnvio" required>
      <label class="form-check-label" for="validationExpress">Express - 5 a 8 días (7%)</label>
    </div>
    <div class="form-check">
      <input oninput="enviostandard()" id="standard" type="radio" class="form-check-input" name="tipoEnvio" required>
      <label class="form-check-label" for="validationStandard">Standard - 12 a 15 días (5%)</label>
      <div class="invalid-feedback">Debe seleccionar una forma de envío</div>
    </div>  
    </div>
  
    <h2 class="titulosCarrito">Dirección de envío</h2>
    <div class="col-md-4">
      <label for="calle" class="form-label">Calle</label>
      <input type="text" class="form-control" id="calle" required>
      <div class="valid-feedback">
        ¡Se ve bien!
      </div>
      <div class="invalid-feedback">
        Ingresa una calle
      </div>
    </div>
  
    <div class="col-md-4">
      <label for="numero" class="form-label">Número</label>
      <input type="number" class="form-control" id="numero" required>
      <div class="valid-feedback">
        ¡Se ve bien!
      </div>
      <div class="invalid-feedback">
        Ingresa un número
      </div>
    </div>
  
    <div class="col-md-6">
      <label for="direccion" class="form-label">Esquina</label>
      <input type="text" class="form-control" id="direccion" aria-describedby="validationServer03Feedback" required>
      <div class="valid-feedback">
        ¡Se ve bien!
      </div>
      <div class="invalid-feedback">
        Ingresa una esquina
      </div>
    </div>
  
    <hr>
  
    <h2 class="titulosCarrito">Costos</h2>
    <div>
    <div class="subtotales">
      <p>Subtotal</p>
      <p id="subtotal1">USD</p>
      <p>Costo unitario del producto por cantidad</p>
    </div>
      <div class="subtotales">
        <p>Costo de envío</p>
        <p id="subtotal2">USD</p>
        <p>Según el tipo de envío</p>
      </div>
        <div class="subtotales">
          <p>Total ($)</p>
          <p id="subtotal3">USD</p>
          <p>Subtotal</p>
        </div>
        <div>
  
          <hr id="separador">
  
          <h2 class="titulosCarrito">Forma de pago</h2>

          <div>
            <p id="noseleccionado">No ha seleccionado</p>
            <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modalPago"
              id="seleccionar">Seleccionar</button>
              <p id="pagoNoValido">Debe seleccionar una forma de pago</p>
              </div>

          <div class="d-grid gap-2">
            <button class="btn btn-primary" type="submit" id="finalizar-compra">Finalizar compra</button>
          </div>
  </form>
  
  <form class="row g-3 needs-validation" id="modalForm" novalidate>
    <div class="modal fade" id="modalPago" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="formapago-modal">Forma de pago</h5>
          </div>
          <div class="modal-body">
            <input oninput="pagoTarjeta()" type="radio" id="tarjeta" class="form-check-input" name="formapago" required>
            <label class="form-check-label" for="tarjeta">Tarjeta de credito</label>
  
            <hr>
  
            <div>
              <label for="numtarjeta" class="form-label">Número de tarjeta</label>
              <input type="number" class="form-control" id="numtarjeta" required>
              <div class="valid-feedback">
                ¡Se ve bien!
              </div>
              <div class="invalid-feedback">
                Proporciona un número de tarjeta válido.
              </div>
            </div>
  
            <div>
              <label for="codigo" class="form-label">Código de seguridad</label>
              <input type="text" class="form-control" id="codigo" required>
              <div class="valid-feedback">
                ¡Se ve bien!
              </div>
              <div class="invalid-feedback">
                Proporciona un código válido
              </div>
            </div>
  
            <div>
              <label for="vencimiento" class="form-label">Vencimiento (MM/AA)</label>
              <input type="text" class="form-control" id="vencimiento" aria-describedby="validationServer03Feedback"
                required>
              <div class="valid-feedback">
                ¡Se ve bien!
              </div>
              <div class="invalid-feedback">
                Proporciona una fecha de vencimiento válida
            </div>
  
            <input oninput="pagoTransferencia()" type="radio" id="bancaria" class="form-check-input" name="formapago"
              required>
            <label class="form-check-label" for="bancaria">Transferencia bancaria</label>
            <hr>
  
            <div>
              <label for="cuenta" class="form-label">Número de cuenta</label>
              <input type="text" class="form-control" id="cuenta" aria-describedby="validationServer03Feedback" required>
              <div class="valid-feedback">
                ¡Se ve bien!
              </div>
              <div class="invalid-feedback">
                Proporciona un número válido.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="form-check">
              <button onclick="pagoSeleccionado(), feedbackModal()" type="button" class="btn btn-primary" data-bs-dismiss="modal"
                aria-label="Close">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>` 
}

document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(`${CART_INFO_URL}25801${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
        currentArticleArray = resultObj.data
        showCart();
        showFullCart();
        feedbackFormCarrito();  
  }

});

document.getElementById("cart-container").addEventListener("click", (e) => {

article_Subtotal(e.target.dataset.Id);

});

/* document.getElementsByClassName("") */

});