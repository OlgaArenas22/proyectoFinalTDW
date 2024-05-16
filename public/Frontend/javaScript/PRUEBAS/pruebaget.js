prueba();

async function prueba(){
    await fetch("http://127.0.0.1:8000/api/v1/persons",{

    })
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            if(data.persons[1].person.imageUrl === null){
                console.log("hola");
            }
            console.log(data.persons[2].person.imageURL);

        });
}