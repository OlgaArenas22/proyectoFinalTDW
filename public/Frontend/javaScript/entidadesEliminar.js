document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    const select = document.getElementById('entitySelect');
    const entidades = JSON.parse(localStorage.getItem("entidades")) || []

    entidades.forEach(producto => {
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
        const nuevasEntidades = eliminaEntidad(select.selectedIndex - 1)
        actualizaStorage(nuevasEntidades);

        alert("Entidad eliminado");
        event.preventDefault();
        document.location.href = "indexWriter.html";
    });

    function eliminaEntidad(indiceAEliminar){
        return [...entidades.slice(0,indiceAEliminar), ...entidades.slice(indiceAEliminar+=1, entidades.lenght)]
    }
})



function actualizaStorage(entidades) {
    localStorage.setItem('entidades', JSON.stringify(entidades));
}