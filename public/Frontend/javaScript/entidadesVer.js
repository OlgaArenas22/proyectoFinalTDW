document.addEventListener("DOMContentLoaded", function () {
    const entidad = obtenerEntidad();
    document.getElementById("entidadImagen").src = entidad.imageUrl;
    document.getElementById("entidadNombre").textContent = entidad.name;
    document.getElementById("entidadCreacion").textContent = `Creaci�n: ${entidad.birthDate}`;
    document.getElementById("entidadDisolucion").textContent = `Disoluci�n: ${entidad.deathDate}`;
    if(entidad.wikiUrl === null || entidad.wikiUrl === ""){
        document.getElementById("wikipedia").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzzTNcjuqNynQaX1mu0n_uyJp6-LjgbTqoWCrZzrqFw&s";
    }else{
        document.getElementById("wikipedia").src = entidad.wikiUrl;
    }

    mostrarEntidadPersonas(entidad);
})

function obtenerEntidad() {
    return JSON.parse(sessionStorage.getItem('entidadesVer'))
}


function mostrarEntidadPersonas(entidad) {
    const personas = entidad.personas;

    const contenedorEntidades = document.getElementById("lista-entidades-personas");
    contenedorEntidades.innerHTML = "";


    personas.forEach(function (persona, index) {
        const personaElemento = document.createElement("div");
        personaElemento.innerHTML = `
            <p style="font-size: 25px;"><strong>${index + 1}: ${persona}</strong></p>
            <hr>
          `;
        contenedorEntidades.appendChild(personaElemento);
    });

}
