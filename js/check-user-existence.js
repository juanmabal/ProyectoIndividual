if (!localStorage.getItem("usuario")) {
    localStorage.setItem("recent-page", window.location);
    window.location = "index.html" ;
  }