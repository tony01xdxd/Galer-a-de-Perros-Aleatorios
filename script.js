// --- Utilidades de almacenamiento local ---
function guardarPerro(url) {
    let perros = JSON.parse(localStorage.getItem('perrosGuardados')) || [];
    if (!perros.includes(url)) {
        perros.push(url);
        localStorage.setItem('perrosGuardados', JSON.stringify(perros));
    }
}

function obtenerPerrosGuardados() {
    return JSON.parse(localStorage.getItem('perrosGuardados')) || [];
}

function mostrarGaleria() {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = '';
    const perros = obtenerPerrosGuardados();
    perros.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Perro guardado';
        galeria.appendChild(img);
    });
}

// --- API Dog CEO ---
async function obtenerImagenPerro(raza = '') {
    try {
        let url = 'https://dog.ceo/api/breeds/image/random';
        if (raza) url = `https://dog.ceo/api/breed/${raza}/images/random`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos.message;
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        return null;
    }
}

async function obtenerRazas() {
    try {
        const respuesta = await fetch('https://dog.ceo/api/breeds/list/all');
        const datos = await respuesta.json();
        return Object.keys(datos.message);
    } catch (error) {
        console.error('Error al obtener razas:', error);
        return [];
    }
}

// --- Interacción con el DOM ---
async function cargarRazas() {
    const selector = document.getElementById('raza-selector');
    const razas = await obtenerRazas();
    razas.forEach(raza => {
        const option = document.createElement('option');
        option.value = raza;
        option.textContent = raza.charAt(0).toUpperCase() + raza.slice(1);
        selector.appendChild(option);
    });
}

async function mostrarImagen() {
    const selector = document.getElementById('raza-selector');
    const raza = selector.value;
    const urlImagen = await obtenerImagenPerro(raza);
    if (urlImagen) {
        document.getElementById('imagen-perro').src = urlImagen;
    }
}

// --- Eventos ---
window.addEventListener('DOMContentLoaded', async () => {
    await cargarRazas();
    await mostrarImagen();
    mostrarGaleria();

    document.getElementById('btn-ver').addEventListener('click', mostrarImagen);

    document.getElementById('btn-guardar').addEventListener('click', () => {
        const url = document.getElementById('imagen-perro').src;
        if (url) {
            guardarPerro(url);
            mostrarGaleria();
        }
    });

    document.getElementById('raza-selector').addEventListener('change', mostrarImagen);
});