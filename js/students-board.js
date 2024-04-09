document.addEventListener('DOMContentLoaded', function () {
    const aulas = JSON.parse(localStorage.getItem('aulas')) || [];
    const listaAulas = document.getElementById('listaAulas');

    // Verificar si hay aulas almacenadas
    if (!aulas.length) {
        listaAulas.innerHTML = '<p class="text-center">No hay aulas creadas aún.</p>';
        return;
    }

    // Crear y añadir las cards de aulas al contenedor
    aulas.forEach((aula, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '60rem';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${aula.nombre}</h5>
                <p class="card-text">Estudiantes: ${aula.estudiantes.length}</p>
                <a href="#" class="btn btn-primary" onclick="mostrarEstudiantes(${index})">Ver Estudiantes</a>
            </div>
        `;
        listaAulas.appendChild(card);
    });
});

function mostrarEstudiantes(index) {
    // Guardar el índice del aula seleccionada en localStorage
    localStorage.setItem('selectedAulaIndex', index);

    // Redirigir a la página de visualización de estudiantes del aula
    window.location.href = 'view-students-aula.html';
}

// Manejador de clic para el botón de inicio
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', function () {
    window.location.href = 'dashboard.html'; // Asegúrate de que el nombre del archivo de inicio sea correcto
});