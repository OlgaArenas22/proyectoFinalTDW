signin();
async function signin() {

    const form = new FormData();
    form.append("username", "adminUser")
    form.append("password", "*adminUser*")

    return await fetch("http://127.0.0.1:8000/api/v1/users", {
        method: 'POST',
        body: form
    })
        .then(response => response.json())
        .then(json => console.log(json))

}