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
                <strong>${product.id}: ${product.name}</strong>
                <br>
                <img src="${imageUrl}" width="120" height="120" class="imagenIndex">
                <p>${product.birthDate} - ${deathDate}</p>
                <hr>
            `;

            contenedorProductos.appendChild(productoElemento);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
});
















