document.addEventListener("DOMContentLoaded", function () {
    const persona = obtenerPersona();

    document.getElementById("personaImagen").src = persona.imagen;
    document.getElementById("personaNombre").textContent = persona.nombre;
    document.getElementById("personaNacimiento").textContent = `Nacimiento: ${persona.nacimiento}`;
    document.getElementById("personaDefuncion").textContent = `Defunción: ${persona.defuncion}`;
    document.getElementById("wikipedia").src = persona.url;


})

function obtenerPersona(){
    return JSON.parse(sessionStorage.getItem('personasVer'))
}
