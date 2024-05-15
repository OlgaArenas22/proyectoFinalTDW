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

    function obtenerProductoSeleccionado() {
        return productos[select.selectedIndex - 1];
    }

    // Escuchar el evento change del select
    select.addEventListener('change', function () {
        const opcionSeleccionada = obtenerProductoSeleccionado()
        document.getElementById('productForm').reset();
        vaciaElemento(document.getElementById("PersonasProducto"));
        vaciaElemento(document.getElementById("EntidadesProducto"));


        // Rellenar el formulario con la información del producto seleccionado
        document.getElementById('productName').value = opcionSeleccionada.nombre;
        document.getElementById('productCreation').value = opcionSeleccionada.creacion;
        document.getElementById('productExtinction').value = opcionSeleccionada.extincion;
        document.getElementById('productWikipedia').value = opcionSeleccionada.url;
        document.getElementById('productImageURL').value = opcionSeleccionada.imagen;
        buildPersonas();
        buildEntidades();

        // Si se selecciona una opcion diferente de "selecionaUnProducto" se habilita el boton
        if (select.selectedIndex > 0) {
            document.getElementById("saveChanges").disabled = false;
        } else {
            document.getElementById("saveChanges").disabled = true;

        }
    });

    // Escuchar el evento submit del formulario
    document.getElementById('productForm').addEventListener('submit', function (event) {
        event.preventDefault();


        const nombre = document.getElementById('productName').value;
        const creacion = document.getElementById('productCreation').value;
        const extincion = document.getElementById('productExtinction').value;
        const url = document.getElementById('productWikipedia').value;
        const imagen = document.getElementById('productImageURL').value;
        const personas = takePersonas();
        const entidades = takeEntidades();

        //alert("tercera")

        //const clave = productos.key();
        const nuevosProductos = eliminaProducto(select.selectedIndex - 1)
        agregarProducto(nuevosProductos, nombre, creacion, extincion, url, imagen, personas, entidades)

        alert("producto modificado")
        event.preventDefault();
        document.location.href = "indexWriter.html";
    })

    function eliminaProducto(indiceAEliminar) {
        return [...productos.slice(0, indiceAEliminar), ...productos.slice(indiceAEliminar += 1, productos.lenght)]
    }

    function buildPersonas() {
        const personasSeleccionadas = obtenerProductoSeleccionado().personas;

        const elemento = document.getElementById("PersonasProducto");

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

    function takePersonas() {
        const select = document.getElementById("PersonasProducto");
        const respuestas = select.selectedOptions;
        const personas = [];
        for (let i = 0; i < respuestas.length; i++) {
            personas.push(respuestas[i].label);
        }
        return personas;
    }

    function buildEntidades() {
        const personasSeleccionadas = obtenerProductoSeleccionado().entidades;

        const elemento = document.getElementById("EntidadesProducto");

        const entidades = JSON.parse(localStorage.getItem("entidades")) || []

        for (const entidad of entidades) {
            const opcion = document.createElement("option");

            opcion.value = entidad.nombre;

            opcion.textContent = entidad.nombre;

            // Marcar la opción como seleccionada si está en el array personasSeleccionadas
            if (personasSeleccionadas.includes(entidad.nombre)) {
                opcion.selected = true;
            }

            // Agregar la opción al elemento select
            elemento.appendChild(opcion);
        }
    }

    function takeEntidades() {
        const select = document.getElementById("EntidadesProducto");
        const respuestas = select.selectedOptions;
        const entidades = [];
        for (let i = 0; i < respuestas.length; i++) {
            entidades.push(respuestas[i].label);
        }
        return entidades;
    }

    function vaciaElemento(elemento){
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }


});


function agregarProducto(productos, nombre, creacion, extincion, url, imagen, personas, entidades) {
    const newP = new Producto(nombre, creacion, extincion, url, imagen, personas, entidades);
    productos.push(newP);
    localStorage.setItem('productos', JSON.stringify(productos));
}