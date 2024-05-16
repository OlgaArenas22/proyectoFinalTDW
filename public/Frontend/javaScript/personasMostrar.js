document.addEventListener("DOMContentLoaded", async () => {
    const contenedorPersonas = document.getElementById("lista-personas");
    contenedorPersonas.innerHTML = "";

    try {
        const response = await fetch("/api/v1/persons");

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
                <strong>${person.id}: ${person.name}</strong>
                <br>
                <img src="${imageUrl}" width="120" height="120" class="imagenIndex">
                <p>${person.birthDate} - ${deathDate}</p>
                <hr>
            `;

            contenedorPersonas.appendChild(personaElemento);
        });
    } catch (error) {
        console.error("Error fetching persons:", error);
    }
});



