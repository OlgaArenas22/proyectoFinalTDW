document.addEventListener("DOMContentLoaded", function () {
    mostrarListaEntidades();
})

function mostrarListaEntidades() {
    const entidades = JSON.parse(localStorage.getItem("entidades")) || [];
    const contenedorEntidades = document.getElementById("lista-entidades");
    contenedorEntidades.innerHTML = "";

    entidades.forEach(function (entidad, index) {
        const entidadElemento = document.createElement("div");
        if (entidad.imagen === "") {
            if (entidad.final == '') {
                entidadElemento.innerHTML = `
            <a href="entidadesMostrar.html" onclick="llamarFuncionEntidades(${index})" class="linkIndex"><strong>${index + 1}: ${entidad.nombre}</strong></a>
                <br>
                <img src="images/sinLogo.jpg" width="120" height="120" class="imagenIndex">
                <p>${entidad.inicio} - Actualidad</p>
                <hr>
              `;
            } else {
                entidadElemento.innerHTML = `
            <a href="entidadesMostrar.html" onclick="llamarFuncionEntidades(${index})" class="linkIndex"><strong>${index + 1}: ${entidad.nombre}</strong></a>
                <br>
                <img src="images/sinLogo.jpg" width="120" height="120" class="imagenIndex">
                <p>${entidad.inicio} - ${entidad.final}</p>
                <hr>
              `;
            }

        } else {
            if (entidad.final == '') {
                entidadElemento.innerHTML = `
            <a href="entidadesMostrar.html" onclick="llamarFuncionEntidades(${index})" class="linkIndex"><strong>${index + 1}: ${entidad.nombre}</strong></a>
                <br>
                <img src="${entidad.imagen}" width="120" height="120" class="imagenIndex">
                <p>${entidad.inicio} - Actualidad</p>
                <hr>
              `;
            } else {
                entidadElemento.innerHTML = `
            <a href="entidadesMostrar.html" onclick="llamarFuncionEntidades(${index})" class="linkIndex"><strong>${index + 1}: ${entidad.nombre}</strong></a>
                <br>
                <img src="${entidad.imagen}" width="120" height="120" class="imagenIndex">
                <p>${entidad.inicio} - ${entidad.final}</p>
                <hr>
                `;
            }
        }
        contenedorEntidades.appendChild(entidadElemento);
    });
}


function llamarFuncionEntidades(index) {
    const entidades = JSON.parse(localStorage.getItem("entidades")) || [];
    const entidad = entidades[index];
    almacenarEntidad(entidad);
}

function almacenarEntidad(entidad) {
    sessionStorage.setItem('entidadesVer', JSON.stringify(entidad));
}









