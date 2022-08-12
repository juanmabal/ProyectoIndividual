function ingreso() {
    location.replace("https://www.w3schools.com")
  }

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botonlogin").addEventListener("click", function () {

        if (document.getElementById("email").value == '') {
            alert("Debes ingresar un email para continuar");
        } else if (document.getElementById("contraseña").value == '') {
            alert("Debes ingresar una contraseña para continuar");
        } else {
            ingreso();
        }

    });
});