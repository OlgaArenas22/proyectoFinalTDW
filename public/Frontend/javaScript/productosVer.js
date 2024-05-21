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


async function mostrarProductoPersonas(producto) {
    const personas = producto.persons;

    const contenedorProductos = document.getElementById("lista-productos-personas");
    contenedorProductos.innerHTML = "";

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
            contenedorProductos.appendChild(personaElemento);
        })
    }

}

async function mostrarProductEntidades(producto) {
    const entidades = producto.entities;

    const contenedorProductos = document.getElementById("lista-productos-entidades");
    contenedorProductos.innerHTML = "";

    for(let i = 0; i < entidades.length; i++){
        await fetch(`http://127.0.0.1:8000/api/v1/entities/${entidades[i]}`,{

        })
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                const entidadElemento = document.createElement("div");
                entidadElemento.innerHTML = `
            <p style="font-size: 25px;"><strong>${data.entity.id}: ${data.entity.name}</strong></p>
            <hr>
          `;
                contenedorProductos.appendChild(entidadElemento);
            })
    }
}

