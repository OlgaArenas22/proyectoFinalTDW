document.addEventListener("DOMContentLoaded", function () {
    // Cuando se hace click en crearProducto...
    document.getElementById("crearPersona").addEventListener("click", crearPersona);

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });
})

function crearPersona() {
    const persona = document.getElementById("newProducto").value;
    const nacimiento = document.getElementById("newBirth").value;
    const defuncion = document.getElementById("newDeath").value;
    const url = document.getElementById("newUrl").value;
    const image = document.getElementById("newImage").value;

    if (persona === "" || nacimiento === "") {
        alert("Hay campos sin rellenar \nPor favor rellene los campos con (*)");
    } else {
        agregarPersona(persona, nacimiento, defuncion, url, image);
        alert("Persona creada");
        event.preventDefault();
        window.location.href = "indexWriter.html";
    }
}




function agregarPersona(nombre, nacimiento, defuncion, url, imagen) {
    const newP = new Persona(nombre, nacimiento, defuncion, url, imagen);
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    personas.push(newP);
    localStorage.setItem('personas', JSON.stringify(personas));
}