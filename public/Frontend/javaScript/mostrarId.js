document.addEventListener("DOMContentLoaded", function () {
    const id = JSON.parse(sessionStorage.getItem('idUser'));
    document.getElementById('idUser').textContent = `Id: ${id}. Ver usuario`;

})