document.addEventListener("DOMContentLoaded", async function () {
    const id = JSON.parse(sessionStorage.getItem('idUser'));
    const usuario = await obtenerUsuario(id);
    console.log(usuario);
    document.getElementById("userNombre").textContent = usuario.username;
    document.getElementById("userEmail").textContent = `Email: ${usuario.email}`;
    document.getElementById("userContrasenia").textContent = `Contraseña: ${usuario.password}`;
    document.getElementById("userNacimiento").textContent = `Nacimiento: ${usuario.birthDate}`;
    document.getElementById("userImagen").src = usuario.imageUrl;
});

async function obtenerUsuario(id) {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
        console.error('No access token found in sessionStorage');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.user;
        } else {
            console.error('Error finding user', response.statusText);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}
