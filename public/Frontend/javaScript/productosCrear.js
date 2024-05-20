document.addEventListener("DOMContentLoaded", function () {
    // Cuando se hace click en crearProducto...
    document.getElementById("crearProducto").addEventListener("click", async event => {
        event.preventDefault();

        const token = sessionStorage.getItem("access_token");
        const form = document.getElementById("producto");
        const formData = new FormData(form);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/products", {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('No se ha podido crear el producto');
            }

            const data = await response.json();
            takeEntidades(data.product.id);
            takePersonas(data.product.id);
            alert("Producto creado");

        } catch (error) {
            alert(error.message);
        }
    });
    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    buildPersonas();
    buildEntidades();
});

async function buildPersonas() {
    const elemento = document.getElementById('PersonasProducto');
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

async function buildEntidades() {
    const elemento = document.getElementById('EntidadesProducto');
    await fetch("http://127.0.0.1:8000/api/v1/entities", {

    })
        .then(response =>{
            if(!response.ok){
                console.log("No hay entidades");
            }else{
                return response.json();
            }
        })
        .then(data =>{
            if(data != undefined){
                const entidades = data.entities;
                for(const entity of entidades){
                    const option = document.createElement("option");
                    option.value = entity.entity.id;
                    option.textContent = entity.entity.name;
                    elemento.appendChild(option);
                }
            }
        });
}

function takeEntidades(idProducto){
    const select = document.getElementById("EntidadesProducto");
    const respuestas = select.selectedOptions;

    for(let i = 0; i < respuestas.length; i++){
        let idEntidad = respuestas[i].value;
        aniadirRelacionEntidad(idEntidad, idProducto);
    }
}
function takePersonas(idProducto){
    const select = document.getElementById("PersonasProducto");
    const respuestas = select.selectedOptions;

    for(let i = 0; i < respuestas.length; i++){
        let idPersona = respuestas[i].value;
        aniadirRelacionPersona(idPersona, idProducto);
    }
}

async function aniadirRelacionEntidad(idEntidad, idProducto){
    const token = sessionStorage.getItem("access_token");

    await fetch(`http://127.0.0.1:8000/api/v1/products/${idProducto}/entities/add/${idEntidad}`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

async function aniadirRelacionPersona(idPersona, idProducto){
    const token = sessionStorage.getItem("access_token");

    await fetch(`http://127.0.0.1:8000/api/v1/products/${idProducto}/persons/add/${idPersona}`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
