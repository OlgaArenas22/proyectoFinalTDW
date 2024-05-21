this.loginButton = document.getElementById("loginButton");

this.loginButton.addEventListener('click', async (event)=>{
    event.preventDefault();

    const form = document.getElementById("user");
    const formData = new FormData(form)

    try {
        const response = await fetch("http://127.0.0.1:8000/access_token", {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            alert("El usuario introducido no existe");
            return;
        }

        const data = await response.json();
        const token = data.access_token;

        const usersResponse = await fetch("http://127.0.0.1:8000/api/v1/users", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!usersResponse.ok) {
            alert("No se ha podido encontrar al usuario");
            return;
        }


        const usersData = await usersResponse.json();
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
            alert("Usuario no encontrado");
            return;
        }
        if (usersData.users[id].user.role === "WRITER") {
            sessionStorage.setItem('access_token', token);
            window.location.href = "indexWriter.html";
        } else {
            sessionStorage.setItem('idUser', usersData.users[id].user.id);
            window.location.href = "indexReader.html";
        }

    } catch (error) {
        console.error('Error:', error);
        alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
    }


});


















