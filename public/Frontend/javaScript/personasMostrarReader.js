document.addEventListener("DOMContentLoaded", async () => {
    const contenedorPersonas = document.getElementById("lista-personas");
    contenedorPersonas.innerHTML = "";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/persons");

        if (!response.ok) {
            console.log("No hay personas");
            return;
        }

        const data = await response.json();

        data.persons.forEach(personObj => {
            const person = personObj.person;
            const personaElemento = document.createElement("div");

            let imageUrl = person.imageUrl ? person.imageUrl : "images/sinLogo.jpg";
            let deathDate = person.deathDate ? person.deathDate : "Actualidad";

            personaElemento.innerHTML = `
                <a href="personasMostrarReader.html" onclick="llamarFuncionPersona(${person.id})" data-persona="${person.id}" class="linkIndex"><strong>${person.id + 1}: ${person.name}</strong></a>
                <br>
                <img src="${imageUrl}" width="120" height="120" class="imagenIndex">
                <p>${person.birthDate} - ${deathDate}</p>
                <hr>
            `;

            contenedorPersonas.appendChild(personaElemento);
        });

        // Agregar event listener a los enlaces después de que se han agregado al DOM
        document.querySelectorAll('.linkIndex').forEach(link => {
            link.addEventListener('click', async function(event) {
                event.preventDefault(); // Evitar que se siga el enlace
                const personId = this.getAttribute('data-persona');
                await llamarFuncionPersona(personId);
                // Redirigir a la página después de que se complete la función
                window.location.href = "personasMostrarReader.html";
            });
        });
    } catch (error) {
        console.error("Error fetching personas:", error);
    }
});

async function llamarFuncionPersona(index) {
    const token = sessionStorage.getItem("access_token");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/persons/${index}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const person = await response.json();
            sessionStorage.setItem('personasVer', JSON.stringify(person.person));
        } else {
            console.error('Error fetching person:', response.statusText);
        }
    } catch (error) {
        console.error("Error fetching person:", error);
    }
}
