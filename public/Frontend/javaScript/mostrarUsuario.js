document.addEventListener("DOMContentLoaded", function () {
    const id = JSON.parse(sessionStorage.getItem('idUser'));
    const usuario = obtenerUsuario(id);
    console.log(usuario);
})

async function obtenerUsuario(id){
    const token = sessionStorage.getItem("access_token");
    const response = fetch(`http://127.0.0.1:8000/api/v1/users/${id}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.ok) {
        const user = await response.json();
        return user.user;

    } else {
        console.error('Error finding user', response.statusText);
    }

}