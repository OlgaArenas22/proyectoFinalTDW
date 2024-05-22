async function prueba() {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ0ZHctdXBtIiwiaWF0IjoxNzE2Mzc4OTM1LjA5MTk4Nywic3ViIjoiYSIsImp0aSI6IjIzYTJlYjBiLWQ4ZmItNDZiZC1iYzcxLTZmN2E1YjRlMzk1NCIsIm5iZiI6MTcxNjM3ODkzNS4wOTE5ODcsImV4cCI6MTcxNjM5MzMzNS4wOTE5ODcsImF1ZCI6InVwbS10ZHctYWNpZW5jaWEiLCJ1aWQiOjksInNjb3BlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXX0.SUwMt-J7QrgGbqQHSCPmS7Whj4xxsR4Nh17fzSBcqisjlx21r6bG3ym7L-G2OO9W-ApL7UBon8Ju_nnPv3INESlEgPA5czmaLe2yPuUfOFefyxr5wvXbTnXEo3TadYjGLdwYk0W1nEun2RfPJbJlPnQVfKboV4-HvzQMF12-UxITmtAE7Nsr3n24Xuqa1xxRPTdHn7qAVnJg1Ok21Fr-UK-4hryik4cZiWJ2q2dPcNhCMe_O0p7HW_EN-mmyLOE-mJ-VSUn1qB6lxNqidiEB_urVZC86b4SmL3Eh0VJb6gHSewJN_wAG2wii-mJWXBsp12NA5DJGma-0697zAit-q30_0F-0NAbOPWh7mawixGwanGY5CWv08Z0RwmVXTVd57du9QWskjSyBIC7f7D4hd9y2KP2Llch4sULnntlQDtG_7EE3_n-qY_oqdiC32L8m804KJHWJ8v0IcVpW1zWp1ownLZLH3f61hF7EK_ySLLkf6cynmdoRN58ggx32Sou5Wh5JCwGL8jC8G9J3N1Y6x4lzvIgt2CcAsWtuTeFtuxjUKkK1nOJi6zjiLN8YBecu6soxR19fv6ICngqK71-F6H_8cgVMkcxsYEWlN5sY8GQ_qWqB7YumuVsfsfHGpcMLDONhslpOB6apusURphhTb6O524H-1ZFlDutO5ZSyjXI";
    const user = "13";
    const etag = "ab403807c28a6ab5b66ab41f050708bb";

    const formData = new FormData;
    formData.set("username", "root");
    formData.set("email", "root");
    formData.set("password", "root");
    formData.set('role', 'inactive');

    const usuario = Object.fromEntries(formData);
    const usuarioJson = JSON.stringify(usuario);

    await fetch(`http://127.0.0.1:8000/api/v1/users/${user}`,{
        method: 'PUT',
        body: usuarioJson,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`,
            "If-Match": `${etag}`
        }
    })
        .then(response=>{
            console.log(response.status);
            return response.json();
        })
        .then(data=>{
            console.log(data);
        })

}



prueba();
