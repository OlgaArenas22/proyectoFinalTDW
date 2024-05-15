document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    const select = document.getElementById('productSelect');
    const productos = JSON.parse(localStorage.getItem("productos")) || []

    productos.forEach(producto => {
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
        const nuevosProductos = eliminaProducto(select.selectedIndex - 1)
        actualizaStorage(nuevosProductos);

        alert("producto eliminado")
        event.preventDefault();
        document.location.href = "indexWriter.html";
    });

    function eliminaProducto(indiceAEliminar){
        return [...productos.slice(0,indiceAEliminar), ...productos.slice(indiceAEliminar+=1, productos.lenght)]
    }
})



function actualizaStorage(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}