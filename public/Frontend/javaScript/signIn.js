document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("crearUsuario").addEventListener("click", crearUsuario);

    document.getElementById("volverUser").addEventListener("click", function () {
        window.location.href = "index.html";
    });
})

function crearUsuario() {
    event.preventDefault();
    var newUser = document.getElementById("newUser").value;
    var newPass = document.getElementById("newPass").value
    if (newUser === "" || newPass === "") {
        alert("Hay campos sin rellenar");
    } else {
        agregarUsuario(newUser, newPass);
        alert("Usuario creado");
        window.location.href = "index.html";
    }
}

function agregarUsuario(user, pass) {
    const usuarioNuevo = { "user": user, "pass": pass, "rol": "writer" }
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
        { user: "x", pass: "x", rol: "writer" },
        { user: "y", pass: "y", rol: "writer" },
        { user: "z", pass: "z", rol: "writer" },
    ];
    usuarios.push(usuarioNuevo);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

