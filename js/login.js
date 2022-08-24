function ingreso() {
    location.replace("portada.html")
  }

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botonlogin").addEventListener("click", function () {

        if (document.getElementById("email").value == '') {
            alert("Debes ingresar un email para continuar");
        } else if (document.getElementById("contraseña").value == '') {
            alert("Debes ingresar una contraseña para continuar");
        } else {
            localStorage.setItem('usuario', document.getElementById("email").value);
            let user = localStorage.getItem('usuario');
            ingreso();
        }

    });
});