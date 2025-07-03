// Función para obtener una imagen aleatoria de perro desde la API
async function obtenerImagenPerro() {
    try {
        const respuesta = await fetch('https://dog.ceo/api/breeds/image/random');
        const datos = await respuesta.json();
        // Retorna la URL de la imagen
        return datos.message;
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        return null;
    }
}

// Ejemplo de cómo usar la función (esto lo puede usar quien haga la parte de mostrar la imagen)
async function mostrarImagen() {
    const urlImagen = await obtenerImagenPerro();
    if (urlImagen) {
        // Suponiendo que hay un <img id="imagen-perro"> en el HTML
        document.getElementById('imagen-perro').src = urlImagen;
    }
}

// Puedes avisar a tu equipo que la función obtenerImagenPerro() está lista para ser utilizada.
