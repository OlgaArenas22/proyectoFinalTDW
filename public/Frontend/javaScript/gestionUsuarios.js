document.addEventListener("DOMContentLoaded", function () {
    // Cuando se hace click en crearProducto...
    document.getElementById("borrarUsuario").addEventListener("click", async event => {
        event.preventDefault();
        takeUsarios();

    });
    // Cuando se hace click en volverWriter ...
    document.getElementById("hacerReader").addEventListener("click", async event => {
        event.preventDefault();
        hacerReader();

    });
    document.getElementById("hacerWriter").addEventListener("click", async event => {
        event.preventDefault();
        hacerWriter();

    });


    buildUsuarios();
});

async function buildUsuarios() {
    const token = sessionStorage.getItem("access_token");
    const elemento = document.getElementById('Usuarios');
    await fetch("http://127.0.0.1:8000/api/v1/users", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }

    })
        .then(response =>{
            if(!response.ok){
                console.log("No hay usuarios");
            }else{
                return response.json();
            }
        })
        .then(data =>{
            if(data != undefined){
                const usuarios = data.users;
                for(const user of usuarios){
                    const option = document.createElement("option");
                    option.value = user.user.id;
                    option.textContent = user.user.username;
                    elemento.appendChild(option);
                }
            }
        });
}

function takeUsarios(){
    const select = document.getElementById("Usuarios");
    const respuestas = select.selectedOptions;

    for(let i = 0; i < respuestas.length; i++){
        let idUsuario = respuestas[i].value;
        eliminarUsuario(idUsuario);
    }
}

async function eliminarUsuario(id){
    const token = sessionStorage.getItem("access_token");
    await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response=>{
            if(response.ok){
                window.location.href = "gestionUsuarios.html";
                alert("Usuario eliminado");
            }
        })
}