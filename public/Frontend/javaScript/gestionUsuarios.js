document.addEventListener("DOMContentLoaded", function () {
    // Cuando se hace click en crearProducto...
    document.getElementById("borrarUsuario").addEventListener("click", async event => {
        event.preventDefault();
        const id = await takeUsarios();
        eliminarUsuario(id);

    });
    // Cuando se hace click en volverWriter ...
    document.getElementById("hacerReader").addEventListener("click", async event => {
        event.preventDefault();
        const id = takeUsarios();
        hacerReader(id);

    });
    document.getElementById("hacerWriter").addEventListener("click", async event => {
        event.preventDefault();
        hacerWriter();

    });

    document.getElementById("convertirInactivo").addEventListener("click", async event => {
        event.preventDefault();
        convertirInactivo();

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

    let idUsuario = -1;
    for(let i = 0; i < respuestas.length; i++){
        idUsuario = respuestas[i].value;
    }

    return idUsuario;
}

async function obtenerEtag(id) {
    try {
        const token = sessionStorage.getItem("access_token");
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const headers = response.headers;
        const etag = headers.get('etag');
        return etag;
    } catch (error) {
        console.error('Error al obtener el ETag:', error);
        throw error; // Lanza el error para que pueda ser manejado por quien llame la función
    }
}
async function hacerReader(id){
    const token = sessionStorage.getItem("access_token");
    const etag = await obtenerEtag(id);
    const usuario = await obtenerUsuario(id);
    const formData = new FormData;
    formData.set("role", "READER");

    const datosUsuario = Object.fromEntries(formData);
    const datosUsuarioJson = JSON.stringify(datosUsuario);

    await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`,{
        method: 'PUT',
        body: datosUsuarioJson,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`,
            "If-Match": `${etag}`
        }
    })
        .then(response=>{
            if(response.ok){
                alert("Rol cambiado con éxito");
            }
        })
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

async function obtenerUsuario(id){
    try {
        const token = sessionStorage.getItem("access_token");
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const usuario = data.user;
        return usuario;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error; // Lanza el error para que pueda ser manejado por quien llame la función
    }

}