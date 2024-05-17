document.addEventListener("DOMContentLoaded", async () => {
    const contenedorEntidades = document.getElementById("lista-entidades");
    contenedorEntidades.innerHTML = "";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/entities");

        if (!response.ok) {
            console.log("No hay entidades");
            return;
        }

        const data = await response.json();

        data.entities.forEach(entityObj => {
            const entity = entityObj.entity;
            const entidadElemento = document.createElement("div");

            let imageUrl = entity.imageUrl ? entity.imageUrl : "images/sinLogo.jpg";
            let deathDate = entity.deathDate ? entity.deathDate : "Actualidad";

            entidadElemento.innerHTML = `
                <strong>${entity.id}: ${entity.name}</strong>
                <br>
                <img src="${imageUrl}" width="120" height="120" class="imagenIndex">
                <p>${entity.birthDate} - ${deathDate}</p>
                <hr>
            `;

            contenedorEntidades.appendChild(entidadElemento);
        });
    } catch (error) {
        console.error("Error fetching entities:", error);
    }
});













