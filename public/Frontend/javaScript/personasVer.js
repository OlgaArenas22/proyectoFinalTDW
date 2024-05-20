document.addEventListener("DOMContentLoaded", function () {
    const persona = obtenerPersona();
    document.getElementById("personaImagen").src = persona.imageUrl;
    document.getElementById("personaNombre").textContent = persona.name;
    document.getElementById("personaNacimiento").textContent = `Nacimiento: ${persona.birthDate}`;
    document.getElementById("personaDefuncion").textContent = `Defunción: ${persona.deathDate}`;
    if(persona.wikiUrl === null || persona.wikiUrl === ""){
        document.getElementById("wikipedia").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzzTNcjuqNynQaX1mu0n_uyJp6-LjgbTqoWCrZzrqFw&s";
    }else{
        document.getElementById("wikipedia").src = persona.wikiUrl;
    }

})

function obtenerPersona(){
    return JSON.parse(sessionStorage.getItem('personasVer'))
}
