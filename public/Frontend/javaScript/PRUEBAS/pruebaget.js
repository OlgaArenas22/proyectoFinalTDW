async function prueba() {
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ0ZHctdXBtIiwiaWF0IjoxNzE2Mjk5MTU2LjA2NzcyNCwic3ViIjoiYnMwMzEzIiwianRpIjoiNmUzOTc0YmUtOTRlMS00N2YyLTkwZDItNGRjYzUyNzYyNWRmIiwibmJmIjoxNzE2Mjk5MTU2LjA2NzcyNCwiZXhwIjoxNzE2MzEzNTU2LjA2NzcyNCwiYXVkIjoidXBtLXRkdy1hY2llbmNpYSIsInVpZCI6MTAsInNjb3BlcyI6WyJyZWFkZXIiXX0.dRYIpl_ThNiLwRhfFu6EG8SozXc-dz1SDTvLYYnmdWMhFesWNTX-ILO1egN-1EMEOWnyCB3hl0hZwMfjmrvtCOz7853uzt705RP2PIy9Q0c0YRtn958Wpn6Bu-Uk5jwyIQICaEyV8JcAysq1ms7d15cHcX3pW5lcVuL43pBrLPMAkMnhYmdFCiwjxqax1SXdp24yOyk7sMzVVxzLQPCtKMoJFjfB-XSQYklI9gvXt6zaGxKPKZl66Q39HwcD7UzyWeyIo8ANZDTM59bMzZ3rEunSuEYduixGASCSs691eVG4zh3jw2t9Ni3G6pXdjigQLPD4Tk6vnh00yhEosDCbr1Ttrc3n_4mlEbGq_zTxI54ZHK6Fh6rSDA9FEkOy-A25FHL2N45tTNT54rEOAbOEprpVztW8nP7UFXLyO5PrZuMI7K7igtoD_2Ij0Z2NDESO-SNTrzT3ziB_HBPf9zyBqGFwvYWWoKl8ItrMEcPfWwmuqE0StFdf4C6jeU7n5yELGb7bJIrb9CRu8Zyu0ttu5fKRHW_S-fG5o_ce2lkT193LeLo27ypZD4t-lUfC57TB-BQtYW-vaTIF19mg7Uut0ZHW8EWhpKGbQUwTMhQ0KPF8yG4zwhIHRwpgUWeHQu5zkFuYeVx-UNhxlJaJ1BjlmocyRKwPmW1eG1LhBOD1iAI";
    const user = "10";

    const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${user}`,{

    });

    const data = await response.json();
    const productos = data.products;
    console.log(data);

}



prueba();
