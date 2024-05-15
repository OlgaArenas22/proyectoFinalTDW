this.loginButton = document.getElementById("loginButton");

this.loginButton.addEventListener('click', async (event)=>{
    event.preventDefault();

    const form = document.getElementById("user");
    const formData = new FormData(form)

    await fetch("/access_token", {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            console.log(response.ok)
            if (response.ok) {
                window.location.href = "indexWriter.html";
            } else {
                alert("Error en la solicitud");
            }
        });
});


















