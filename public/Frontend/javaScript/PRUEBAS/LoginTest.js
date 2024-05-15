login();
async function login() {

    const data = {
        "username": "adminUser",
        "password": "*adminUser*"
    };

    return await fetch("http://127.0.0.1:8000/access_token", {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
        .then(json => console.log(json))

}