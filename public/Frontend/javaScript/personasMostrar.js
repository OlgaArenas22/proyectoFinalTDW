document.addEventListener("DOMContentLoaded", function () {
    mostrarListaPersonas();

})

function mostrarListaPersonas() {
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const contenedorPersonas = document.getElementById("lista-personas");
    contenedorPersonas.innerHTML = "";

    personas.forEach(function (persona, index) {
        //const dataPersona = JSON.stringify(persona);
        const personaElemento = document.createElement("div");
        if (persona.imagen === "") {
            if (persona.defuncion == '') {
                personaElemento.innerHTML = `
                <a href="personasMostrar.html" onclick="llamarFuncionPersona(${index})" data-persona="${index}" class="linkIndex"><strong>${index + 1}: ${persona.nombre}</strong></a>
                <br>
                <img src="images/sinLogo.jpg" width="120" height="120" class="imagenIndex">
                <p>${persona.nacimiento} - Actualidad</p>
                <hr>
              `;
            } else {
                personaElemento.innerHTML = `
                <a href="personasMostrar.html" onclick="llamarFuncionPersona(${index})" data-persona="${index}" style="font-size: 25px;"><strong>${index + 1}: ${persona.nombre}</strong></a>
                <br>
                <img src="images/sinLogo.jpg" width="120" height="120" class="imagenIndex"">
                <p>${persona.nacimiento} - ${persona.defuncion}</p>
                <hr>
              `;
            }
        } else {
            if (persona.defuncion === '') {
                personaElemento.innerHTML = `
                <a href="personasMostrar.html" onclick="llamarFuncionPersona(${index})" data-persona="${index}" class="linkIndex"><strong>${index + 1}: ${persona.nombre}</strong></a>
                <br>
                <img src="${persona.imagen}" width="120" height="120" class="imagenIndex">
                <p>${persona.nacimiento} - Actualidad </p>
                <hr>
                `;
            } else {
                personaElemento.innerHTML = `
                <a href="personasMostrar.html" onclick="llamarFuncionPersona(${index})" data-persona="${index}" class="linkIndex"><strong>${index + 1}: ${persona.nombre}</strong></a>
                <br>
                <img src="${persona.imagen}" width="120" height="120" class="imagenIndex">
                <p>${persona.nacimiento} - ${persona.defuncion}</p>
                <hr>
                `;
            }

        }
        contenedorPersonas.appendChild(personaElemento);
    });
}

function llamarFuncionPersona(index){
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    const persona = personas[index];
    almacenarPersona(persona);
}

function almacenarPersona(persona){
    sessionStorage.setItem('personasVer', JSON.stringify(persona));
}









