
function newSubtotal() {

  let unitCost = `${currentArticleArray.articles[0].unitCost}`;
  let cantArticles = document.getElementById("cant_articles").value;
  let subtotal = unitCost * cantArticles;
  let currency = `${currentArticleArray.articles[0].currency}`;

  document.getElementById("subtotal").innerHTML = currency +` `+ subtotal;

}

function showCart() {
    
    document.getElementById("cart-container").innerHTML += 
    `<h1>Carrito de compras</h1>
    <h2>Artículos a comprar</h2>
    <div class="table-responsive">
      <table class="table">
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
            <th scope="row"><img src="${currentArticleArray.articles[0].image}" alt=""></th>
            <td>${currentArticleArray.articles[0].name}</td>
            <td>${currentArticleArray.articles[0].currency +` `+ currentArticleArray.articles[0].unitCost}</td>
            <td><input type="number" oninput="newSubtotal()" id="cant_articles" min="1"
             onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"></td>
            <td id="subtotal">${currentArticleArray.articles[0].currency +` `+ currentArticleArray.articles[0].unitCost}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>Tipo de envío</h2>
      <div><input name="envio" value="p" type="radio">Premium - 2 a 5 días (15%)</div>
      <div><input name="envio" value="e" type="radio">Express - 5 a 8 días (7%)</div>
      <div><input name="envio" value="s" type="radio">Standard - 12 a 15 días (5%)</div>
      <h2>Dirección de envío</h2>
      <p>Calle</p>
      <input type="text"></input>
      <p>Número</p>
      <input type="text"></input>
      <p>Dirección</p>
      <input type="text"></input>
    `

}

document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(`${CART_INFO_URL}25801${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
        currentArticleArray = resultObj.data
        showCart();
        }
    });
});