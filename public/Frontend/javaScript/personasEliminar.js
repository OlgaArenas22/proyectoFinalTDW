document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    const select = document.getElementById('personSelect');
    const personas = JSON.parse(localStorage.getItem("personas")) || []

    personas.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        select.appendChild(option);
    });


    // Escuchar el evento change del select
    select.addEventListener('change', function () {
        // Si se selecciona una opcion diferente de "selecionaUnProducto" se habilita el boton
        if(select.selectedIndex > 0){
            document.getElementById("deleteButton").disabled = false;
        }else{
            document.getElementById("deleteButton").disabled = true;
        }
    });

    // Escuchar el evento submit del formulario
    document.getElementById('deleteButton').addEventListener('click', function (event) {
        const nuevasPersonas = eliminaPersona(select.selectedIndex - 1)
        actualizaStorage(nuevasPersonas);

        alert("Persona eliminada")
        event.preventDefault();
        document.location.href = "indexWriter.html";
    });

    function eliminaPersona(indiceAEliminar){
        return [...personas.slice(0,indiceAEliminar), ...personas.slice(indiceAEliminar+=1, personas.lenght)]
    }
})



function actualizaStorage(personas) {
    localStorage.setItem('personas', JSON.stringify(personas));
}