document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    obtenerDesplegable();
    const select = document.getElementById('productSelect');
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
    document.getElementById('deleteButton').addEventListener('click', async function (event) {
        const token = sessionStorage.getItem("access_token");
        const select = document.getElementById('productSelect');
        const respuestas = select.selectedOptions;
        await fetch(`http://127.0.0.1:8000/api/v1/products/${respuestas[0].value}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        alert("Producto eliminado")
        window.location.href = "eliminarProducto.html";
    });

})

async function obtenerDesplegable(){
    const select = document.getElementById('productSelect');
    const response = await fetch("http://127.0.0.1:8000/api/v1/products",{

    });

    const data = await response.json();
    const productos = data.products;

    for(let i = 0; i <= productos.length; i++){
        const option = document.createElement('option');
        option.value = productos[i].product.id;
        option.text = productos[i].product.name;
        select.appendChild(option);
    }
}
