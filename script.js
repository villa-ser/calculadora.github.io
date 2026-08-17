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
        
        // OPCIONAL: Si quieres que los botones se muestren inmediatamente 
        // sin tener que presionar "MENÚ PRINCIPAL", descomenta la siguiente línea:
        // document.getElementById('menuGrid').classList.remove('hidden');
    }, 2500);
}

function toggleMenu() {
    const grid = document.getElementById('menuGrid');
    grid.classList.toggle('hidden');
}

// Navegación de botones
document.addEventListener('DOMContentLoaded', () => {
    const rutas = {
        'btnInecuaciones': './inecuaciones/index.html',
        'btnCaidadeTension': './caida_de_tension/index.html',
        'btnIntensidadadmisible': './intensidad_admisible/index.html', // Corregido: antes era un punto en lugar de ./
        'btnPotenciaMotoresCapacitores': './potencia_motores_apacitores/index.html',
        'btnVerificacionCortocircuito': './verificacion_intensidad_de_cortocircuito/index.html', // ID corregido
        'btnBalancetermicoenTableros': './balance_termico_en_tableros/index.html', // Coma agregada
        'btnCurvatermica': './curva_termica/index.html', // Coma agregada
        'btnBancodeCapacitores': './banco_de_capacitores/index.html', // Coma agregada
        'btnDiagnosticodeCapacitores': './diagnostico_de_capacitores/index.html', // Coma agregada
        'btnCorrientedeCCMinima': './corriente_de_cc_minima/index.html', // Coma agregada
        'btnReducciondeCCmaxima': './reduccion_de_cc_maxima/index.html', // Coma agregada
        'btnMaximaCantidadCables': './maxima_cantida_de_cables_en_caneria/index.html', // ID corregido y coma agregada
        'btnNuevoModulo': './nuevo_modulo/index.html'
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
