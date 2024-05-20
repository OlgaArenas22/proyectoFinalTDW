async function prueba() {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ0ZHctdXBtIiwiaWF0IjoxNzE2MTk4NDA4LjU1OTM4Mywic3ViIjoiYSIsImp0aSI6IjYyZjE0ZjVjLWU0NGUtNGQ5YS05ZWY2LWVlZjk5MGRhZDQ1ZCIsIm5iZiI6MTcxNjE5ODQwOC41NTkzODMsImV4cCI6MTcxNjIxMjgwOC41NTkzODMsImF1ZCI6InVwbS10ZHctYWNpZW5jaWEiLCJ1aWQiOjksInNjb3BlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXX0.dzOmvr-XIqg2Xxlk-DCOQZTEB62d9L3q1gJ6n3cZ6UjjtfHOrNXcFr9kFMSaShC-B6OAp5AKcB7MXZvwZ-S9BTIIxGqJEj_2h6FKUY1bHUt2ERG7XU_tMVGv-j0FCvWPwZ-ivWfEyR1v0TOiYWhqenIbtqhioe5gmdu_kz4MsGT6ieLHDpoef8eRnd8-Tdzf7CKCoqIOAbgKU6Kxo3GUzbs_5t6i5ihmagPFJU4Ru4VUhqJ5eTTW4Vlaf3qBIELNQ1KYRASRtUD2Z9GE_5QQGBgEokwE2AzVZ4UpY9aECEkS7zuPP90pYqSVdeNfoWA8zzLUthE27rUb-tJ1o_MGyBrrD6rVQ757cbJOELHTwUjdL7ul2rcQBWv41z_ARw0a0tockw64l-MuPo7YxO6lxzIo7bwJ5mVtedpsqoHuOjsjUKKhHl9nP7mw75jpQVlUNjcTFJJ6yTz8phtcoFQ9GDrYv_XaApbM8Gs7RroSZX0OvOwc4ZOaBcJOPVHTIcQexj0TxJF5NS1cYQ3RA5nOgEgy9iHgVSO_5btBrJytwL6DtuLvRqqVidNkqnOYDjtXypHuipH-sRUBqrApbfv4cO1zO5BODOEoaMu1mL4FCiXITF0SuOr5YC3mjbFiaUK_Y0WsVK1K7XLwBDv-5ch9L5wW12kkOEJoLyugOxuZNnM";
    const name = "2";

    await fetch(`http://127.0.0.1:8000/api/v1/products/30/entities/add/${name}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            console.log(data);
        })
}


prueba();
