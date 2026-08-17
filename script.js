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
        'btnCaidadeTension': './caida_de_tension/index.html',
        'btnIntensidadadmisible': '.intensidad_admisible/index.html',
        'btnPotenciaMotoresCapacitores': './potencia_motores_apacitores/index.html',
        'btnVerificacion Intensidad de Cortocircuito': './verificacion_intensidad_de_cortocircuito/index.html',
        'btnBalancetermicoenTableros': './balance_termico_en_tableros/index.html'
        'btnCurvatermica': './curva_termica/index.html'
        'btnBancodeCapacitores': './banco_de_capacitores/index.html'
        'btnDiagnosticodeCapacitores': './diagnostico_de_capacitores/index.html'
        'btnCorrientedeCCMínima': './corriente_de_cc_minima/index.html'
        'btnReducciondeCCmáxima': './reduccion_de_cc_maxima/index.html'
        'btnMáximacantidadecablesencañería': './máxima_cantida_de_cables_en_cañeria/index.html'
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
