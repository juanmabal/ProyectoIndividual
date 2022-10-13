let unitCost = undefined;

function newSubtotal() {
  let cantProduct = document.getElementById("cant_product").value;
  let subtotal = unitCost * cantProduct; 
  document.getElementById("subtotal").innerHTML = `USD ` + subtotal;
}

function showCart() {
    
    document.getElementById("cart-container").innerHTML += 
    `<h2>Carrito de compras</h2>
    <h4>Artículos a comprar</h4>
    <div class="cart-info">
        <div>
          <p></p>
          <img src="${currentProductArray.articles[0].image}" alt="">
        </div>
        <div>
          <p>Nombre</p>
          <p>${currentProductArray.articles[0].name}</p>
        </div>
        <div>
          <p>Costo</p>
          <p>${unitCost}</p>
        </div>
        <div>
          <p>Cantidad</p>
            <input oninput="newSubtotal()" id="cant_product" type="number" value="1"></input>
        </div>
        <div>
          <p>Subtotal</p>
          <p id="subtotal">USD 15200</p>
        </div>
        <h4>Tipo de envío</h4>
        <input type="radio">Premium - 2 a 5 días (15%)
        <input type="radio">Express - 5 a 8 días (7%)
        <input type="radio">Standard - 12 a 15 días (5%)
      </div>
      `

}

document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(`${CART_INFO_URL}25801${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
        currentProductArray = resultObj.data
        unitCost = `${currentProductArray.articles[0].unitCost}`;
        showCart();
        }
    });
});