this.crearUsuario = document.getElementById("crearUsuario");
this.volverUser = document.getElementById("volverUser");

this.crearUsuario.addEventListener("click", async(event ) =>{
        event.preventDefault();
        const form = document.getElementById("createUser");
        const formData = new FormData(form)

        await fetch("/api/v1/users", {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    alert("Usuario creado");
                    window.location.href = "index.html";
                } else {
                    alert("Error en la solicitud");
                }
            });
    });

this.volverUser.addEventListener("click", function () {
    window.location.href = "index.html";
});



