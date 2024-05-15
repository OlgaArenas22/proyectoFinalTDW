
async function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("contrasenia").value;

    const data = {
        "username": user,
        "password": pass
    };

    console.log(data)

    await fetch("/access_token", {
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
                console.log("response ok")
                //window.location.href = "indexWriter.html";
            } else {
                alert("Error en la solicitud");
            }
        });
}

async function checkUser(){
    await login();
}




















