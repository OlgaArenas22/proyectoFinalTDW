document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    const select = document.getElementById('personSelect');
    const personas = JSON.parse(localStorage.getItem("personas")) ||[]

    personas.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        select.appendChild(option);
    });

    function obtenerPersonasSeleccionada() {
        return personas[select.selectedIndex - 1];
    }

    // Escuchar el evento change del select
    select.addEventListener('change', function () {
        const opcionSeleccionada = obtenerPersonasSeleccionada()

        document.getElementById('personForm').reset();

        // Rellenar el formulario con la información del producto seleccionado
        document.getElementById('name').value = opcionSeleccionada.nombre;
        document.getElementById('personBirth').value = opcionSeleccionada.nacimiento;
        document.getElementById('personDeath').value = opcionSeleccionada.defuncion;
        document.getElementById('url').value = opcionSeleccionada.url;
        document.getElementById('image').value = opcionSeleccionada.imagen;

        // Si se selecciona una opcion diferente de "selecionaUnProducto" se habilita el boton
        if(select.selectedIndex > 0){
            document.getElementById("saveChanges").disabled = false;
        }else{
            document.getElementById("saveChanges").disabled = true;

        }
    });

    // Escuchar el evento submit del formulario
    document.getElementById('personForm').addEventListener('submit', function (event) {
        event.preventDefault();


        const nombre = document.getElementById('name').value;
        const nacimiento = document.getElementById('personBirth').value;
        const defuncion = document.getElementById('personDeath').value;
        const url = document.getElementById('url').value;
        const imagen = document.getElementById('image').value;


        const nuevosProductos = eliminaPersona(select.selectedIndex - 1)
        agregarPersona(nuevosProductos, nombre, nacimiento, defuncion, url, imagen)

        alert("Persona modificado")
        event.preventDefault();
        document.location.href = "indexWriter.html";
    });

    function eliminaPersona(indiceAEliminar){
        return [...personas.slice(0,indiceAEliminar), ...personas.slice(indiceAEliminar+=1, personas.lenght)]
    }
})



function agregarPersona(personas, nombre, nacimiento, defuncion, url, imagen) {
    const newP = new Persona(nombre, nacimiento, defuncion, url, imagen);
    personas.push(newP);
    localStorage.setItem('personas', JSON.stringify(personas));
}