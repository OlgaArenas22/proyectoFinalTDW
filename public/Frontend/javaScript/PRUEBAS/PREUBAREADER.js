async function prueba() {
    const formData = new FormData();
    formData.append("username", "bs0313");
    formData.append("password", "bs0313");

    try {
        // Solicitud para obtener el token
        const response = await fetch("http://127.0.0.1:8000/access_token", {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            //alert("El usuario introducido no existe");
            return;
        }

        const data = await response.json();
        const token = data.access_token;
        //alert(token);

        // Solicitud para obtener los usuarios
        const usersResponse = await fetch("http://127.0.0.1:8000/api/v1/users", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!usersResponse.ok) {
            //alert("No se ha podido encontrar al usuario");
            return;
        }

        const usersData = await usersResponse.json();

        // Buscar el usuario
        let id = -1;
        let encontrado = false;
        const usernameToFind = formData.get("username");

        for (let i = 0; i < usersData.users.length && !encontrado; i++) {
            if (usernameToFind === usersData.users[i].user.username) {
                id = i;
                encontrado = true;
            }
        }

        if (id === -1) {
            //alert("Usuario no encontrado");
            return;
        }
        // Redirigir según el rol del usuario
        if (usersData.users[id].user.role === "WRITER") {
            console.log("hola");
            //window.location.href = "indexWriter.html";
        } else {
            //window.location.href = "indexReader.html";
        }

    } catch (error) {
        console.error('Error:', error);
        //alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
    }
}

prueba();
