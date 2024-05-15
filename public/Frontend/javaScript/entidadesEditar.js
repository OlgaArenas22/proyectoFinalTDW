document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    const select = document.getElementById('entitySelect');
    const entidades = JSON.parse(localStorage.getItem("entidades")) || [];

    entidades.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.id;
        option.textContent = producto.nombre;
        select.appendChild(option);
    });


    function obtenerEntidadesSeleccionado() {
        return entidades[select.selectedIndex - 1];
    }

    // Escuchar el evento change del select
    select.addEventListener('change', function () {
        const opcionSeleccionada = obtenerEntidadesSeleccionado()
        document.getElementById('entityForm').reset();
        vaciaElemento(document.getElementById("PersonasEntidad"));

        // Rellenar el formulario con la información del producto seleccionado
        document.getElementById('name').value = opcionSeleccionada.nombre;
        document.getElementById('start').value = opcionSeleccionada.inicio;
        document.getElementById('end').value = opcionSeleccionada.final;
        document.getElementById('url').value = opcionSeleccionada.url;
        document.getElementById('image').value = opcionSeleccionada.imagen;
        buildPersonas();

        // Si se selecciona una opcion diferente de "selecionaUnProducto" se habilita el boton
        if(select.selectedIndex > 0){
            document.getElementById("saveChanges").disabled = false;
        }else{
            document.getElementById("saveChanges").disabled = true;
        }
    });

    // Escuchar el evento submit del formulario
    document.getElementById('entityForm').addEventListener('submit', function (event) {
        event.preventDefault();


        const nombre = document.getElementById('name').value;
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const url = document.getElementById('url').value;
        const imagen = document.getElementById('image').value;
        const personas = takePersonas();


        const nuevasEntidades = eliminaEntidad(select.selectedIndex - 1)
        agregarEntidad(nuevasEntidades, nombre, start, end, url, imagen, personas)

        alert("Entidad modificado")
        event.preventDefault();
        document.location.href = "indexWriter.html";
    });

    function eliminaEntidad(indiceAEliminar){
        return [...entidades.slice(0,indiceAEliminar), ...entidades.slice(indiceAEliminar+=1, entidades.lenght)]
    }

    function buildPersonas() {
        const personasSeleccionadas = obtenerEntidadesSeleccionado().personas;

        const elemento = document.getElementById("PersonasEntidad");

        const personas = JSON.parse(localStorage.getItem("personas")) || []

        for (const persona of personas) {
            const opcion = document.createElement("option");

            opcion.value = persona.nombre;

            opcion.textContent = persona.nombre;

            // Marcar la opción como seleccionada si está en el array personasSeleccionadas
            if (personasSeleccionadas.includes(persona.nombre)) {
                opcion.selected = true;
            }

            // Agregar la opción al elemento select
            elemento.appendChild(opcion);
        }
    }

    function takePersonas(){
        const select = document.getElementById("PersonasEntidad");
        const respuestas = select.selectedOptions;
        const personas = [];
        for (let i = 0; i < respuestas.length; i++){
            personas.push(respuestas[i].label);
        }
        return personas;
    }
})

function vaciaElemento(elemento){
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}





function agregarEntidad(entidades, nombre, inicio, fin, url, imagen, personas) {
    const newE = new Entidad(nombre, inicio, fin, url, imagen, personas);
    entidades.push(newE);
    localStorage.setItem('entidades', JSON.stringify(entidades));
}