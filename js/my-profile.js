let usuariodata = JSON.parse(localStorage.getItem("usuariodata"));

function successMessage() {
  document.getElementById("success").innerHTML += 
  `<div class="alert alert-success" role="alert"> Cambios guardados
</div>`
}

function checkUser() {
  if (localStorage.getItem("usuario")) {
    document.getElementById("email").value = `${localStorage.getItem("usuario")}`;
    if (localStorage.getItem("usuariodata")) {
      document.getElementById("primer-nombre").value = `${usuariodata.nombre}`
      document.getElementById("segundo-nombre").value = `${usuariodata.segundonombre}`
      document.getElementById("primer-apellido").value = `${usuariodata.apellido}`
      document.getElementById("segundo-apellido").value = `${usuariodata.segundoapellido}`
      document.getElementById("telefono").value = `${usuariodata.telefono}`
      document.getElementById("img-perfil").src = `${usuariodata.imgperfil}`;
    }
  }
}

function previewFile() {
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convierte la imagen a una cadena en base64
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
    /* localStorage.setItem("imgSrc",document.getElementById('img-perfil').src); */
  }
}

function feedbackForm() {
    document.getElementById("profile-form").addEventListener('submit', function (event) {
      if (!document.getElementById("profile-form").checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        document.getElementById("profile-form").classList.add('was-validated');

      } else {
        event.preventDefault()
        event.stopPropagation()
        usuariodata = {};
        usuariodata.nombre = document.getElementById("primer-nombre").value;
        usuariodata.segundonombre = document.getElementById("segundo-nombre").value;
        usuariodata.apellido = document.getElementById("primer-apellido").value;
        usuariodata.segundoapellido = document.getElementById("segundo-apellido").value;
        usuariodata.email = document.getElementById("email").value;
        usuariodata.telefono = document.getElementById("telefono").value;
        usuariodata.imgperfil = document.getElementById('img-perfil').src;
        localStorage.setItem("usuario", document.getElementById("email").value);
        localStorage.setItem("usuariodata",  JSON.stringify(usuariodata));
        document.getElementById("nomusuario").innerHTML = document.getElementById("email").value;
        successMessage()
        
      }
    })
  }

checkUser()
feedbackForm()
