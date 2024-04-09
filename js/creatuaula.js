document.addEventListener('DOMContentLoaded', function () {
    let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
    let currentAulaIndex = null;
    let indiceEstudianteParaEditar = null; // Almacena el índice del estudiante a editar


    function cargarAulas() {
        const listaAulas = document.getElementById('listaAulas');
        listaAulas.innerHTML = '';
        aulas.forEach((aula, index) => {
            listaAulas.appendChild(crearElementoAula(aula, index));
        });

        // Mostrar la lista de estudiantes del aula seleccionada al cargar las aulas
        if (currentAulaIndex !== null) {
            actualizarListaEstudiantes();
        }
    }


    function crearElementoAula(aula, index) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center clickable'; // Agregamos la clase 'clickable' para hacer el elemento cliclable
        li.addEventListener('click', () => seleccionarAula(index)); // Agregamos el evento de clic para seleccionar el aula

        const texto = document.createElement('span');
        texto.textContent = aula.nombre;
        li.appendChild(texto);

        const div = document.createElement('div');
        div.className = 'action-buttons';

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-danger btn-sm btn-icon';
        btnEliminar.innerHTML = '<i class="fas fa-times"></i>';
        btnEliminar.onclick = () => mostrarModalConfirmacion(index);
        div.appendChild(btnEliminar);

        const btnEditar = document.createElement('button');
        btnEditar.className = 'btn btn-warning btn-sm btn-icon';
        btnEditar.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        btnEditar.onclick = () => mostrarModalEditar(index, aula.nombre);
        div.appendChild(btnEditar);

        const btnAgregarEstudiantes = document.createElement('button');
        btnAgregarEstudiantes.className = 'btn btn-info btn-sm btn-icon';
        btnAgregarEstudiantes.innerHTML = '<i class="fas fa-user-plus"></i>';
        btnAgregarEstudiantes.onclick = () => mostrarModalAgregarEstudiantes(index);
        div.appendChild(btnAgregarEstudiantes);

        li.appendChild(div);
        return li;
    }

    function seleccionarAula(index) {
        currentAulaIndex = index;
        const listaAulas = document.getElementById('listaAulas');
        listaAulas.querySelectorAll('.list-group-item').forEach((aula, i) => {
            if (i !== index) {
                aula.classList.add('inactive');
            } else {
                aula.classList.remove('inactive');
            }
        });
        // Aquí se llama a la función para mostrar la lista de estudiantes del aula seleccionada
        mostrarListaEstudiantes(index);
    }

    function mostrarListaEstudiantes(indexAula) {
        currentAulaIndex = indexAula;
        $('#modalListaEstudiantes').modal('show');
        // Aquí actualizas la lista de estudiantes del aula actual
        actualizarListaEstudiantes();
    }



    function mostrarModalConfirmacion(index) {
        $('#modalConfirmarEliminacion').modal('show');

        $('#confirmarEliminacion').off('click').on('click', function () {
            eliminarAula(index);
            $('#modalConfirmarEliminacion').modal('hide');
        });
    }

    function eliminarAula(index) {
        aulas.splice(index, 1);
        localStorage.setItem('aulas', JSON.stringify(aulas));
        cargarAulas();
    }

    function guardarAula(nombreAula) {
        aulas.push({ nombre: nombreAula, estudiantes: [] });
        localStorage.setItem('aulas', JSON.stringify(aulas));
        cargarAulas();
    }

    function editarAula(index, nuevoNombre) {
        aulas[index].nombre = nuevoNombre;
        localStorage.setItem('aulas', JSON.stringify(aulas));
        cargarAulas();
    }

    function mostrarModalEditar(index, nombreAula) {
        $('#editarNombreAula').val(nombreAula);
        $('#modalEditarAula').modal('show');

        $('#formEditarAula').off('submit').on('submit', function (e) {
            e.preventDefault();
            const nuevoNombre = $('#editarNombreAula').val();
            editarAula(index, nuevoNombre);
            $('#modalEditarAula').modal('hide');
        });
    }

    function mostrarModalAgregarEstudiantes(indexAula) {
        currentAulaIndex = indexAula;
        $('#modalAgregarEstudiantes').modal('show');
        actualizarListaEstudiantes();
    }
    let estudiantesAulaActual = []; // Variable global para almacenar la lista de estudiantes del aula actual

    function agregarEstudiante(e) {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario.
    
        const estudianteDatos = {
            primerApellido: $('#primerApellido').val(),
            segundoApellido: $('#segundoApellido').val(),
            primerNombre: $('#primerNombre').val(),
            segundoNombre: $('#segundoNombre').val(),
            puntaje: parseFloat($('#puntaje').val()),
            nota: ($('#puntaje').val() / 100).toFixed(2),
        };
    
        if (indiceEstudianteParaEditar !== null) {
            // Modo edición: actualizar estudiante existente.
            aulas[currentAulaIndex].estudiantes[indiceEstudianteParaEditar] = estudianteDatos;
        } else {
            // Modo agregación: añadir nuevo estudiante.
            aulas[currentAulaIndex].estudiantes.push(estudianteDatos);
        }
    
        // Actualiza el almacenamiento local y la lista de estudiantes.
        localStorage.setItem('aulas', JSON.stringify(aulas));
        actualizarListaEstudiantes();
    
        // Resetea el formulario y el índice del estudiante para editar, permitiendo agregar otro estudiante.
        $('#formAgregarEstudiante').find("input[type=text], input[type=number]").val("");
        indiceEstudianteParaEditar = null; // Importante para volver al modo de agregación.
    
        // Opcional: si deseas mantener el enfoque en un campo específico después de agregar/editar.
        $('#primerApellido').focus();
    }
    
    

    // La función actualizarListaEstudiantes se mantiene igual

    // El resto de tu código permanece sin cambios

    function actualizarListaEstudiantes() {
        const listaEstudiantes = document.getElementById('listaEstudiantes');
        listaEstudiantes.innerHTML = '';
        if (currentAulaIndex !== null) {
            aulas[currentAulaIndex].estudiantes.forEach((estudiante, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${estudiante.primerApellido}</td>
                    <td>${estudiante.segundoApellido}</td>
                    <td>${estudiante.primerNombre}</td>
                    <td>${estudiante.segundoNombre}</td>
                    <td>${estudiante.puntaje}</td>
                    <td>${estudiante.nota}</td>
                    <td class="actions-cell"> <!-- Aquí agregas la clase -->
                    <button class="btn btn-danger btn-sm eliminarEstudianteBtn"><i class="fas fa-times"></i></button>
                    <button class="btn btn-warning btn-sm editarEstudianteBtn"><i class="fas fa-pencil-alt"></i></button>
                </td>
                `;
                listaEstudiantes.appendChild(tr);
    
                // Event listeners para los botones
                const eliminarBtn = tr.querySelector('.eliminarEstudianteBtn');
                eliminarBtn.addEventListener('click', () => eliminarEstudiante(index));
    
                const editarBtn = tr.querySelector('.editarEstudianteBtn');
                editarBtn.addEventListener('click', () => editarEstudiante(index));
            });
        }
    }
    

    function eliminarEstudiante(indexEstudiante) {
        // Eliminar el estudiante del arreglo de estudiantes en la aula actual
        aulas[currentAulaIndex].estudiantes.splice(indexEstudiante, 1);
        // Actualizar el localStorage con los cambios
        localStorage.setItem('aulas', JSON.stringify(aulas));
        // Actualizar la lista de estudiantes en la interfaz
        actualizarListaEstudiantes();
    }

    function editarEstudiante(indexEstudiante) {
        const estudianteSeleccionado = aulas[currentAulaIndex].estudiantes[indexEstudiante];
        // Llenar el formulario con los datos del estudiante
        $('#primerApellido').val(estudianteSeleccionado.primerApellido);
        $('#segundoApellido').val(estudianteSeleccionado.segundoApellido);
        $('#primerNombre').val(estudianteSeleccionado.primerNombre);
        $('#segundoNombre').val(estudianteSeleccionado.segundoNombre);
        $('#puntaje').val(estudianteSeleccionado.puntaje);
    
        indiceEstudianteParaEditar = indexEstudiante; // Guardar índice para su uso en agregarEstudiante
    
        // Mostrar el modal para editar
        $('#modalAgregarEstudiantes').modal('show');
    }



    document.getElementById('formCrearAula').addEventListener('submit', function (e) {
        e.preventDefault();
        const nombreAula = document.getElementById('nombreAula').value.trim();
        if (nombreAula) {
            guardarAula(nombreAula);
            document.getElementById('nombreAula').value = '';
            $('#modalCrearAula').modal('hide');
        }
    });

    // Continuing from the 'formAgregarEstudiante' setup
    document.getElementById('formAgregarEstudiante').addEventListener('submit', agregarEstudiante);

    // Ensure all classrooms are loaded and displayed when the page is loaded
    cargarAulas();
});

// Esta es la función para guardar nuevas aulas, ajustada para no duplicar código.
function guardarAula(nombreAula) {
    let aulas = JSON.parse(localStorage.getItem('aulas')) || [];
    let nuevaAula = { nombre: nombreAula, estudiantes: [] };
    aulas.push(nuevaAula);
    localStorage.setItem('aulas', JSON.stringify(aulas));
    cargarAulas(); // Vuelve a cargar la lista de aulas para mostrar la nueva aula.
}

// Manejador de clic para el botón de inicio
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', function () {
    window.location.href = 'dashboard.html'; // Asegúrate de que el nombre del archivo de inicio sea correcto
});