function newSubtotal() {
  let unitCost = `${currentProductArray.articles[0].unitCost}`;
  let cantProduct = document.getElementById("cant_product").value;
  let subtotal = unitCost * cantProduct; 
  document.getElementById("subtotal").innerHTML = `USD ` + subtotal;
  if (cantProduct < 1) {
    document.getElementById("cant_product").value = 1;
    document.getElementById("subtotal").innerHTML = `USD ${currentProductArray.articles[0].unitCost}`;
  } else {
    document.getElementById("subtotal").innerHTML = `USD ` + subtotal;
  }
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
            <th scope="row"><img src="${currentProductArray.articles[0].image}" alt=""></th>
            <td>${currentProductArray.articles[0].name}</td>
            <td>USD ${unitCost}</td>
            <td><input type="number" oninput="newSubtotal()" id="cant_product"></td>
            <td id="subtotal">USD ${unitCost}</td>
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
        currentProductArray = resultObj.data
        unitCost = `${currentProductArray.articles[0].unitCost}`;
        showCart();
        }
    });
});