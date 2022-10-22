let subtotal = undefined;
let unitCost = undefined;
let cantArticles = undefined;
let currency = undefined;

function addToCart() {

  localStorage.getItem("carrito");
  carrito = JSON.parse(localStorage.getItem("carrito"));
  for(let i = 0; i < carrito.length; i++) {
    articulo = carrito[i];
    document.getElementById("carrito").innerHTML += 
    `<tr>
    <td scope="row"><img src="${articulo.Imagen}" alt=""></td>
    <td>${articulo.Nombre}</td>
    <td>${articulo.Moneda +` `+ articulo.Costo}</td>
    <td><input type="number" oninput="article_Subtotal(${articulo.Costo + `,` + articulo.Id + `,` + articulo.Subtotal + `,` + articulo.Moneda})" id="${articulo.Id}" min="1"
    onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></td>
    <td id="${articulo.Subtotal}">${articulo.Moneda + ` ` + articulo.Costo}</td>
    </tr>`
  }

}

/* function article_Subtotal(costo, id, artSubtotal, moneda) {

      unitCost = costo;
      cantArticles = document.getElementById(id).value;
      subtotal = unitCost * cantArticles;
      currency = moneda;

  document.getElementById(artSubtotal).innerHTML = `${currency} ` + subtotal;
} */

function envio() {
  subtotal = ((subtotal * 15) / 100);
  document.getElementById("subtotal2").innerHTML = subtotal;
}

function newSubtotal() {

   unitCost = `${currentArticleArray.articles[0].unitCost}`;
   cantArticles = document.getElementById("cant_articles").value;
   subtotal = unitCost * cantArticles;
   currency = `${currentArticleArray.articles[0].currency}`;

  document.getElementById("subtotal").innerHTML = currency +` `+ subtotal;
  document.getElementById("subtotal1").innerHTML = currency +` `+ subtotal;
}

function showCart() {
    
    document.getElementById("cart-container").innerHTML += 
    `<h1>Carrito de compras</h1>
    <h2>Artículos a comprar</h2>
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
            <td><input type="number" oninput="newSubtotal(), envio()" id="cant_articles" min="1"
             onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></td>
            <td id="subtotal">${currentArticleArray.articles[0].currency +` `+ currentArticleArray.articles[0].unitCost}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>Tipo de envío</h2>
      <div><input oninput="enviopremium() "name="p" value="p" type="radio">Premium - 2 a 5 días (15%)</div>
      <div><input oninput="envioexpress() "name="e" value="e" type="radio">Express - 5 a 8 días (7%)</div>
      <div><input oninput="enviostandard() "name="s" value="s" type="radio">Standard - 12 a 15 días (5%)</div>
      <h2>Dirección de envío</h2>
      <p>Calle</p>
      <input type="text"></input>
      <p>Número</p>
      <input type="text"></input>
      <p>Dirección</p>
      <input type="text"></input>
      
      <div class="subtotales">
      <p>Subtotal</p><p id="subtotal1">USD</p><p>Costo unitario del producto por cantidad</p></div>
      <div>
      <div class="subtotales">
      <p>Costo de envío</p><p id="subtotal2">USD</p><p>Según el tipo de envío</p></div>
      <div>
      <div class="subtotales">
      <p>Total ($)</p><p>USD</p><p>Subtotal</p></div>
      <div>`

      console.log(p);
      
}

document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(`${CART_INFO_URL}25801${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
        currentArticleArray = resultObj.data
        showCart();
        addToCart();
        }
    });
});