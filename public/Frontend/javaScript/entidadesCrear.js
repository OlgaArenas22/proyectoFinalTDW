document.addEventListener("DOMContentLoaded", function () {
    // Cuando se hace click en crearProducto...
    document.getElementById("crearEntidad").addEventListener("click", crearEntidad);

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    buildPersonas();
})

function crearEntidad() {
    const entidad = document.getElementById("newEntity").value;
    const inicio = document.getElementById("newStart").value;
    const final = document.getElementById("newEnd").value;
    const url = document.getElementById("newUrl").value;
    const image = document.getElementById("newImage").value;
    const personas = takePersonas();

    if (entidad === "" || inicio === "") {
        alert("Hay campos sin rellenar \nPor favor rellene los campos con (*)");
    } else {
        agregarEntidad(entidad, inicio, final, url, image, personas);
        alert("Entidad creada");
        event.preventDefault();
        window.location.href = "indexWriter.html";
    }
}

function buildPersonas() {
    const elemento = document.getElementById('PersonasEntidad');

    const personas = JSON.parse(localStorage.getItem("personas")) || [];

    for (const persona of personas) {

        const option = document.createElement("option");
        option.value = persona.nombre;
        option.textContent = persona.nombre;
        elemento.appendChild(option);
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



function agregarEntidad(nombre, inicio, final, url, imagen, personas) {
    const newE = new Entidad(nombre, inicio, final, url, imagen, personas);
    const entidades = JSON.parse(localStorage.getItem("entidades")) || [];
    entidades.push(newE);
    localStorage.setItem('entidades', JSON.stringify(entidades));
}
