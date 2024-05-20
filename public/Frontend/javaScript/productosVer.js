document.addEventListener("DOMContentLoaded", function () {
    const producto = obtenerProducto();
    console.log(producto);
    document.getElementById("productoImagen").src = producto.imageUrl;
    document.getElementById("productoNombre").textContent = producto.name;
    document.getElementById("productoCreacion").textContent = `Creación: ${producto.birthDate}`;
    document.getElementById("productoObsolescencia").textContent = `Defunción: ${producto.deathDate}`;
    if(producto.wikiUrl === null || producto.wikiUrl === ""){
        document.getElementById("wikipedia").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUzzTNcjuqNynQaX1mu0n_uyJp6-LjgbTqoWCrZzrqFw&s";
    }else{
        document.getElementById("wikipedia").src = producto.wikiUrl;
    }

    mostrarProductoPersonas(producto);
    mostrarProductEntidades(producto)
})

function obtenerProducto() {
    return JSON.parse(sessionStorage.getItem('productosVer'))
}


function mostrarProductoPersonas(producto) {
    const personas = producto.personas;

    const contenedorProductos = document.getElementById("lista-productos-personas");
    contenedorProductos.innerHTML = "";


    personas.forEach(function (persona, index) {
        const personaElemento = document.createElement("div");
        personaElemento.innerHTML = `
            <p style="font-size: 25px;"><strong>${index + 1}: ${persona}</strong></p>
            <hr>
          `;
        contenedorProductos.appendChild(personaElemento);
    });

}

function mostrarProductEntidades(producto) {
    const entidades = producto.entidades;

    const contenedorProductos = document.getElementById("lista-productos-entidades");
    contenedorProductos.innerHTML = "";


    entidades.forEach(function (entidad, index) {
        const entidadElemento = document.createElement("div");
        entidadElemento.innerHTML = `
            <p style="font-size: 25px;"><strong>${index + 1}: ${entidad}</strong></p>
            <hr>
          `;

        contenedorProductos.appendChild(entidadElemento);
    });


}

