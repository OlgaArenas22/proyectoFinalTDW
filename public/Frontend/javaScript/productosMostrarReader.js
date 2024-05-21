document.addEventListener("DOMContentLoaded", async () => {
    const contenedorProductos = document.getElementById("lista-productos");
    contenedorProductos.innerHTML = "";

    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/products");

        if (!response.ok) {
            console.log("No hay productos");
            return;
        }

        const data = await response.json();

        data.products.forEach(productObj => {
            const product = productObj.product;
            const productoElemento = document.createElement("div");

            let imageUrl = product.imageUrl ? product.imageUrl : "images/sinLogo.jpg";
            let deathDate = product.deathDate ? product.deathDate : "Actualidad";

            productoElemento.innerHTML = `
                <a href="productosMostrarReader.html" class="linkIndex" data-producto="${product.id}"><strong>${product.id}: ${product.name}</strong></a>
                <br>
                <img src="${imageUrl}" width="120" height="120" class="imagenIndex">
                <p>${product.birthDate} - ${deathDate}</p>
                <hr>
            `;

            contenedorProductos.appendChild(productoElemento);
        });

        // Agregar event listener a los enlaces después de que se han agregado al DOM
        document.querySelectorAll('.linkIndex').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar que se siga el enlace
                const productId = this.getAttribute('data-producto');
                llamarFuncionProducto(productId).then(() => {
                    // Redirigir a la página después de que se complete la función
                    window.location.href = 'productosMostrarReader.html';
                });
            });
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});

async function llamarFuncionProducto(index) {
    const token = sessionStorage.getItem("access_token");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${index}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const product = await response.json();
            sessionStorage.setItem('productosVer', JSON.stringify(product.product));
        } else {
            console.error('Error fetching product:', response.statusText);
        }
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}
