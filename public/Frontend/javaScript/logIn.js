const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    {user: "x", pass: "x", rol: "writer"},
    {user: "y", pass: "y", rol: "writer"},
    {user: "z", pass: "z", rol: "writer"},
];


function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("contrasenia").value;

    const data = {
        "username": user,
        "password": pass
    };

    console.log(data)

    fetch("http://127.0.0.1:8000/access_token", {
        //mode: 'no-cors',
        method: 'POST',
        //credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    })
        .then(response => {
            if (response.ok) {
                window.location.href = "indexWriter.html";
            } else {
                alert("Error en la solicitud");
            }
        });
}

function checkUser(){
    login();
}




















