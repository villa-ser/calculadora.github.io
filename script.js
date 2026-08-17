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
        
        // Muestra la grilla de botones automáticamente al terminar la animación
        document.getElementById('menuGrid').classList.remove('hidden');
    }, 2500);
}

function toggleMenu() {
    const grid = document.getElementById('menuGrid');
    grid.classList.toggle('hidden');
}

// Lógica de carga y navegación
document.addEventListener('DOMContentLoaded', () => {
    
    // --- NUEVO: Verificar si regresamos con el botón "Volver" ---
    if (window.location.hash === '#menu') {
        // Ocultar pantalla de acceso
        document.getElementById('accessScreen').classList.add('hidden');
        document.getElementById('mainHeader').classList.add('hidden');
        
        // Mostrar la app y la grilla de botones directamente (sin animación)
        document.getElementById('appScreen').classList.remove('hidden');
        document.getElementById('menuGrid').classList.remove('hidden');
    }
    // -------------------------------------------------------------

    // Rutas de los módulos
    const rutas = {
        'btnInecuaciones': './inecuaciones/index.html',
        'btnCaidadeTension': './caida_de_tension/index.html',
        'btnIntensidadadmisible': './intensidad_admisible/index.html',
        'btnPotenciaMotoresCapacitores': './potencia_motores_apacitores/index.html',
        'btnVerificacionCortocircuito': './verificacion_intensidad_de_cortocircuito/index.html', 
        'btnBalancetermicoenTableros': './balance_termico_en_tableros/index.html', 
        'btnCurvatermica': './curva_termica/index.html', 
        'btnBancodeCapacitores': './banco_de_capacitores/index.html', 
        'btnDiagnosticodeCapacitores': './diagnostico_de_capacitores/index.html', 
        'btnCorrientedeCCMinima': './corriente_de_cc_minima/index.html', 
        'btnReducciondeCCmaxima': './reduccion_de_cc_maxima/index.html', 
        'btnMaximaCantidadCables': './maxima_cantida_de_cables_en_caneria/index.html', 
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
