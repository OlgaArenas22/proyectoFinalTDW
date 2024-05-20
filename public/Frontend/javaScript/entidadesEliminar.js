document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    obtenerDesplegable();
    const select = document.getElementById('entitySelect');
    // Escuchar el evento change del select
    select.addEventListener('change', function () {
        // Si se selecciona una opcion diferente de "selecionaUnaEntidad" se habilita el boton
        if(select.selectedIndex > 0){
            document.getElementById("deleteButton").disabled = false;
        }else{
            document.getElementById("deleteButton").disabled = true;
        }
    });


    // Escuchar el evento submit del formulario
    document.getElementById('deleteButton').addEventListener('click', async function (event) {
        const token = sessionStorage.getItem("access_token");
        const select = document.getElementById('entitySelect');
        const respuestas = select.selectedOptions;
        await fetch(`http://127.0.0.1:8000/api/v1/entities/${respuestas[0].value}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        alert("Entidad eliminada")
        window.location.href = "eliminarEntidad.html";
    });

})

async function obtenerDesplegable(){
    const select = document.getElementById('entitySelect');
    const response = await fetch("http://127.0.0.1:8000/api/v1/entities",{

    });

    const data = await response.json();
    const entidades = data.entities;

    for(let i = 0; i <= entidades.length; i++){
        const option = document.createElement('option');
        option.value = entidades[i].entity.id;
        option.text = entidades[i].entity.name;
        select.appendChild(option);
    }
}
