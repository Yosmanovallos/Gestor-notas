document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario de manera tradicional

    // Aquí podrías agregar validación o llamadas a un servidor backend

    // Redirigir al dashboard
    window.location.href = 'pages/dashboard.html';
});