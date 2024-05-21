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
                <a href="entidadesMostrarWriter.html" onclick="llamarFuncionEntidades(${entity.id})" data-entity="${entity.id}" class="linkIndex"><strong>${entity.id}: ${entity.name}</strong></a>
                <br>
                <img src="${imageUrl}" width="120" height="120" class="imagenIndex">
                <p>${entity.birthDate} - ${deathDate}</p>
                <hr>
            `;

            contenedorEntidades.appendChild(entidadElemento);
        });

        document.querySelectorAll('.linkIndex').forEach(link=>{
            link.addEventListener('click', async function(event){
                event.preventDefault();
                const entityId = this.getAttribute('data-entity');
                await llamarFuncionEntidad(entityId);
                window.location.href = "entidadesMostrarWriter.html";

            });
        });
    } catch (error) {
        console.error("Error fetching entities:", error);
    }
});

async function llamarFuncionEntidad(index){
    const token = sessionStorage.getItem("access_token");
    try{
        const response = await fetch(`http://127.0.0.1:8000/api/v1/entities/${index}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.ok){
            const entity = await response.json();
            sessionStorage.setItem('entidadesVer', JSON.stringify(entity.entity));
        }else{
            console.error('Error fetching entity:', response.statusText);
        }
    } catch (error) {
        console.error("Error fetching entity:", error);
    }

}













