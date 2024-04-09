document.addEventListener('DOMContentLoaded', function () {
    // Evento click para la tarjeta "Estudiantes"
    document.querySelector('.estudiantes-card').addEventListener('click', function () {
         window.location.href = '../pages/students-board.html', '_blank';
    });

    // Evento click para la tarjeta "Crea tu Aula de Clases"
    document.querySelector('.aula-card').addEventListener('click', function () {
        // Cambio aquí: utiliza window.location.href para navegar en la misma pestaña
        window.location.href = 'creatuaula.html'; // Asegúrate de que esta ruta sea correcta
    });

    // Aquí puedes agregar más código JS para otros eventos onclick según necesites
});

