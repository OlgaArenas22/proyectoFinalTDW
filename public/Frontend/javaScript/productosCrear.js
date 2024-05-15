document.addEventListener("DOMContentLoaded", function () {
    // Cuando se hace click en crearProducto...
    document.getElementById("crearProducto").addEventListener("click", crearProducto);

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    buildPersonas();
    buildEntidades();
})

function crearProducto() {
    const newProducto = document.getElementById("newProducto").value;
    const newBirth = document.getElementById("newBirth").value;
    const newDeath = document.getElementById("newDeath").value;
    const newUrl = document.getElementById("newUrl").value;
    const newImage = document.getElementById("newImage").value;
    const personas = takePersonas();
    const entidades = takeEntidades();


    if (newProducto === "" || newBirth === "") {
        alert("Hay campos sin rellenar \nPor favor rellene los campos con (*)");
    } else {
        agregarProducto(newProducto, newBirth, newDeath, newUrl, newImage, personas, entidades);
        alert("Producto creado");
        event.preventDefault();
        window.location.href = "indexWriter.html";
    }
}

function buildPersonas() {
    const elemento = document.getElementById('PersonasProducto');

    const personas = JSON.parse(localStorage.getItem("personas")) || [];

    for (const persona of personas) {

        const option = document.createElement("option");
        option.value = persona.nombre;
        option.textContent = persona.nombre;
        elemento.appendChild(option);
    }
}

function buildEntidades() {
    const elemento = document.getElementById('EntidadesProducto');

    const entidades = JSON.parse(localStorage.getItem("entidades")) || [];

    for (const entidad of entidades) {

        const option = document.createElement("option");
        option.value = entidad.nombre;
        option.textContent = entidad.nombre;
        elemento.appendChild(option);
    }
}

function takeEntidades(){
    const select = document.getElementById("EntidadesProducto");
    const respuestas = select.selectedOptions;
    const entidades = [];
    for (let i = 0; i < respuestas.length; i++){
        entidades.push(respuestas[i].label);
    }
    return entidades;
}

function takePersonas(){
    const select = document.getElementById("PersonasProducto");
    const respuestas = select.selectedOptions;
    const personas = [];
    for (let i = 0; i < respuestas.length; i++){
        personas.push(respuestas[i].label);
    }
    return personas;
}


function agregarProducto(nombre, creacion, extincion, url, imagen, personas, entidades) {
    const newP = new Producto(nombre, creacion, extincion, url, imagen, personas, entidades);
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.push(newP);
    localStorage.setItem('productos', JSON.stringify(productos));
}