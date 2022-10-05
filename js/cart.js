function showCart() {
    
    document.getElementById("container").innerHTML += 
    `<h1>Carrito de compras</h1>
    <h2>Artículos a comprar</h2>`
    
}

document.addEventListener("DOMContentLoaded", function (e) {

getJSONData(`${CART_INFO_URL}25801${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
        currentProductArray = resultObj.data
        console.log(currentProductArray);
        showCart();
        }
    });
});