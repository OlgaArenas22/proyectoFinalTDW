document.addEventListener("DOMContentLoaded", function () {

    // Cuando se hace click en volverWriter ...
    document.getElementById("volverWriter").addEventListener("click", function () {
        window.location.href = "indexWriter.html";
    });

    const select = document.getElementById('entitySelect');
    obtenerEntidades();



    async function obtenerEntidadesSeleccionado() {
        const id = select.selectedOptions[0].value;
        const response = await fetch(`http://127.0.0.1:8000/api/v1/entities/${id}`);
        const data = await response.json();
        return data.entity;
    }


    // Escuchar el evento change del select
    select.addEventListener('change', async function () {
        const opcionSeleccionada = await obtenerEntidadesSeleccionado();
        document.getElementById('entityForm').reset();
        vaciaElemento(document.getElementById("PersonasEntidad"));

        // Rellenar el formulario con la informaci�n del producto seleccionado
        document.getElementById('name').value = opcionSeleccionada.name;
        document.getElementById('birthDate').value = opcionSeleccionada.birthDate;
        document.getElementById('deathDate').value = opcionSeleccionada.deathDate;
        document.getElementById('wikiUrl').value = opcionSeleccionada.wikiUrl;
        document.getElementById('imageUrl').value = opcionSeleccionada.imageUrl;
        buildPersonas();
        sessionStorage.setItem("idEntidad", opcionSeleccionada.id);

        // Si se selecciona una opcion diferente de "selecionaUnProducto" se habilita el boton
        if(select.selectedIndex > 0){
            document.getElementById("saveChanges").disabled = false;
        }else{
            document.getElementById("saveChanges").disabled = true;
        }
    });

    // Escuchar el evento submit del formulario
    document.getElementById('entityForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const idEntidad = sessionStorage.getItem("idEntidad");
        sessionStorage.removeItem("idEntidad");
        const etag = await obtenerEtag(idEntidad);
        const token = sessionStorage.getItem("access_token");
        const form = document.getElementById("entityForm");
        const formData = new FormData(form);
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        await fetch(`http://127.0.0.1:8000/api/v1/entities/${idEntidad}`,{
            method: 'PUT',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                "If-Match": `${etag}`
            }

        })
            .then(response=>{
                if(response.ok){
                    takePersonas(idEntidad);
                    alert("Entidad modificada");
                    window.location.href = "editarEntidad.html";
                }
            })

    });

    async function obtenerEtag(idEntidad) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/entities/${idEntidad}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const headers = response.headers;
            const etag = headers.get('etag');
            return etag;
        } catch (error) {
            console.error('Error al obtener el ETag:', error);
            throw error; // Lanza el error para que pueda ser manejado por quien llame la función
        }
    }

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

    function takePersonas(idEntidad){
        const select = document.getElementById("PersonasEntidad");
        const respuestas = select.selectedOptions;

        for(let i = 0; i < respuestas.length; i++){
            let idPersona = respuestas[i].value;
            aniadirRelacionPersona(idPersona, idEntidad);
        }
    }
})

async function aniadirRelacionPersona(idPersona, idEntidad){
    const token = sessionStorage.getItem("access_token");

    await fetch(`http://127.0.0.1:8000/api/v1/entities/${idEntidad}/persons/add/${idPersona}`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function vaciaElemento(elemento){
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

async function obtenerEntidades(){
    const select = document.getElementById('entitySelect');
    await fetch('http://127.0.0.1:8000/api/v1/entities',{

    })
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            for(let i = 0; i < data.entities.length; i++){
                const option = document.createElement('option');
                option.value = data.entities[i].entity.id;
                option.textContent = data.entities[i].entity.name;
                select.appendChild(option);
            }
        })

}