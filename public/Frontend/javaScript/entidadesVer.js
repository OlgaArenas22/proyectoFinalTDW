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


async function mostrarEntidadPersonas(entidad) {
    const personas = entidad.persons;

    const contenedorEntidades = document.getElementById("lista-entidades-personas");
    contenedorEntidades.innerHTML = "";

    for(let i = 0; i < personas.length; i++){
        await fetch(`http://127.0.0.1:8000/api/v1/persons/${personas[i]}`,{

        })
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                const personaElemento = document.createElement("div");
                personaElemento.innerHTML = `
            <p style="font-size: 25px;"><strong>${data.person.id}: ${data.person.name}</strong></p>
            <hr>
          `;
                contenedorEntidades.appendChild(personaElemento);
            })
    }

}

