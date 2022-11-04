localStorage.removeItem('usuario');

function ingreso() {
    location.replace(localStorage.getItem("recent-page"));
    
  }

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botonlogin").addEventListener("click", function () {

        if (document.getElementById("email").value == '') {
            alert("Debes ingresar un email para continuar");
        } else if (document.getElementById("contraseña").value == '') {
            alert("Debes ingresar una contraseña para continuar");
        } else {
            localStorage.setItem('usuario', document.getElementById("email").value);
            ingreso();
        }

    });
});