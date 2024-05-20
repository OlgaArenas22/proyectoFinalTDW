document.addEventListener("DOMContentLoaded", function () {
    // Cuando se hace click en crearEntidad...
    document.getElementById("crearEntidad").addEventListener("click", async event => {
        event.preventDefault();

        const token = sessionStorage.getItem("access_token");
        const form = document.getElementById("entidad");
        const formData = new FormData(form);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/entities", {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('No se ha podido crear la entidad');
            }

            const data = await response.json();
            takePersonas(data.entity.id);
            takeProductos(data.entity.id);
            alert("Entidad creada");

        } catch (error) {
            alert(error.message);
        }
    });
    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    buildPersonas();
    buildProducts();
});

async function buildPersonas() {
    const elemento = document.getElementById('PersonasEntidad');
    await fetch("http://127.0.0.1:8000/api/v1/persons", {

    })
        .then(response =>{
            if(!response.ok){
                console.log("No hay personas");
            }else{
                return response.json();
            }
        })
        .then(data =>{
            if(data != undefined){
                const personas = data.persons;
                for(const person of personas){
                    const option = document.createElement("option");
                    option.value = person.person.id;
                    option.textContent = person.person.name;
                    elemento.appendChild(option);
                }
            }
        });
}

async function buildProducts() {
    const elemento = document.getElementById('ProductosEntidad');
    await fetch("http://127.0.0.1:8000/api/v1/products", {

    })
        .then(response =>{
            if(!response.ok){
                console.log("No hay productos");
            }else{
                return response.json();
            }
        })
        .then(data =>{
            if(data != undefined){
                const products = data.products;
                for(const product of products){
                    const option = document.createElement("option");
                    option.value = product.product.id;
                    option.textContent = product.product.name;
                    elemento.appendChild(option);
                }
            }
        });
}

function takePersonas(idEntidad){
    const select = document.getElementById("PersonasEntidad");
    const respuestas = select.selectedOptions;

    for(let i = 0; i < respuestas.length; i++){
        let idPersona = respuestas[i].value;
        aniadirRelacionPersona(idPersona, idEntidad);
    }
}

function takeProductos(idEntidad){
    const select = document.getElementById("ProductosEntidad");
    const respuestas = select.selectedOptions;

    for(let i = 0; i < respuestas.length; i++){
        let idProducto = respuestas[i].value;
        aniadirRelacionProducto(idProducto, idEntidad);
    }
}

async function aniadirRelacionPersona(idPersona, idEntidad){
    const token = sessionStorage.getItem("access_token");

    await fetch(`http://127.0.0.1:8000/api/v1/entities/${idEntidad}/persons/add/${idPersona}`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

async function aniadirRelacionProducto(idProducto, idEntidad){
    const token = sessionStorage.getItem("access_token");

    await fetch(`http://127.0.0.1:8000/api/v1/entities/${idEntidad}/products/add/${idProducto}`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
