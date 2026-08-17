function iniciarAcceso() {
    const accessScreen = document.getElementById('accessScreen');
    const mainHeader = document.getElementById('mainHeader');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeText = welcomeScreen.querySelector('.welcome-text');
    const appScreen = document.getElementById('appScreen');

    // Oculta pantalla inicial y cabecera
    accessScreen.classList.add('hidden');
    mainHeader.classList.add('hidden');

    // Muestra animación de bienvenida
    welcomeScreen.classList.remove('hidden');
    welcomeText.classList.add('animate-welcome');

    // Transición a la pantalla principal
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        welcomeText.classList.remove('animate-welcome');
        appScreen.classList.remove('hidden');
    }, 2500);
}

function toggleMenu() {
    const grid = document.getElementById('menuGrid');
    grid.classList.toggle('hidden');
}

// Navegación de botones
document.addEventListener('DOMContentLoaded', () => {
    const rutas = {
        'btnInecuaciones': './inecuaciones/index.html', // <-- Redirige a la subcarpeta inecuaciones
        'btnMateriales': './materiales/index.html',
        'btnVerClientes': './ver_clientes/index.html',
        'btnNuevoCliente': './nuevo_cliente/index.html',
        'btnCatalogos': './catalogos/index.html',
        'btnCostos': './costos/index.html'
    };

    Object.keys(rutas).forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener('click', () => {
                window.location.href = rutas[id];
            });
        }
    });
});
