document.addEventListener("DOMContentLoaded", function () {
    const entidad = obtenerEntidad();
    document.getElementById("entidadImagen").src = entidad.imagen;
    document.getElementById("entidadNombre").textContent = entidad.nombre;
    document.getElementById("entidadCreacion").textContent = `Creación: ${entidad.inicio}`;
    document.getElementById("entidadDisolucion").textContent = `Disolución: ${entidad.final}`;
    document.getElementById("wikipedia").src = entidad.url;

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
