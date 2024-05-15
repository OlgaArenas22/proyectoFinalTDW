document.addEventListener("DOMContentLoaded", function () {
    mostrarListaProductos();
})

function mostrarListaProductos() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const contenedorProductos = document.getElementById("lista-productos");
    contenedorProductos.innerHTML = "";

    productos.forEach(function (producto, index) {
        const productoElemento = document.createElement("div");
        if (producto.imagen === "") {
            if (producto.extincion === '') {
                productoElemento.innerHTML = `
            <a href="productosMostrar.html" onclick="llamarFuncionProducto(${index})" class="linkIndex"><strong>${index + 1}: ${producto.nombre}</strong></a>
            <br>
            <img src="images/sinLogo.jpg" width="120" height="120" class="imagenIndex">
            <p>${producto.creacion} - Actualidad</p>
            <hr>
          `;
            } else {
                productoElemento.innerHTML = `
            <a href="productosMostrar.html" onclick="llamarFuncionProducto(${index})" class="linkIndex"><strong>${index + 1}: ${producto.nombre}</strong></a>
            <br>
            <img src="images/sinLogo.jpg" width="120" height="120" class="imagenIndex">
            <p>${producto.creacion} - ${producto.extincion}</p>
            <hr>
          `;
            }
        } else {
            if (producto.extincion === '') {
                productoElemento.innerHTML = `
            <a href="productosMostrar.html" onclick="llamarFuncionProducto(${index})" class="linkIndex"><strong>${index + 1}: ${producto.nombre}</strong></a>
            <br>
            <img src="${producto.imagen}" width="120" height="120" class="imagenIndex">
            <p>${producto.creacion} - Actualidad</p>
            <hr>
          `;
            } else {
                productoElemento.innerHTML = `
            <a href="productosMostrar.html" onclick="llamarFuncionProducto(${index})" class="linkIndex"><strong>${index + 1}: ${producto.nombre}</strong></a>
            <br>
            <img src="${producto.imagen}" width="120" height="120" class="imagenIndex">
            <p>${producto.creacion} - ${producto.extincion}</p>
            <hr>
          `;
            }
        }
        contenedorProductos.appendChild(productoElemento);
    });
}

function llamarFuncionProducto(index){
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos[index];
    almacenarProducto(producto);
}

function almacenarProducto(producto){
    sessionStorage.setItem('productosVer', JSON.stringify(producto));
}












