// Configuración y variables de estado unificadas
const state = {
    activeField: 'val',
    phase: 'mono',
    inputs: { val: "0", aux: "0" },
    cabeceras: [],
    salidas: []
};

const tableDissipation = [
    { max: 10, w: 3 }, { max: 16, w: 3.5 }, { max: 25, w: 4.5 },
    { max: 32, w: 6 }, { max: 40, w: 7.5 }, { max: 50, w: 9 },
    { max: 63, w: 13 }, { max: 100, w: 15 }, { max: 125, w: 20 }
];

// --- FUNCIÓN DE NAVEGACIÓN ---
function volverAlMenu() {
    window.location.href = '../index.html#menu';
}

function getWatts(amps) {
    const entry = tableDissipation.find(e => amps <= e.max);
    return entry ? entry.w : 20; // Default 20W si supera 125A
}

function setFocus(fieldId) {
    state.activeField = fieldId;
    document.querySelectorAll('.input-group').forEach(el => el.classList.remove('active'));
    document.getElementById(`in-${fieldId}`).classList.add('active');
}

function setPhase(p) {
    state.phase = p;
    document.getElementById('phase-mono').classList.toggle('active', p === 'mono');
    document.getElementById('phase-tri').classList.toggle('active', p === 'tri');
    calculate();
}

function press(n) {
    let currentString = state.inputs[state.activeField];
    
    // Prevención de múltiples puntos
    if (n === '.' && currentString.includes('.')) return;
    
    // Lógica de reemplazo del cero inicial
    if (currentString === "0" && n !== '.') {
        currentString = n;
    } else if (currentString === "" && n === '.') {
        currentString = "0.";
    } else {
        currentString += n;
    }

    // Límite de caracteres para no romper el CSS
    if (currentString.length > 6) return;

    state.inputs[state.activeField] = currentString;
    document.getElementById(`v-${state.activeField}`).innerText = currentString;
    
    // Calcular en tiempo real (útil para el campo Auxiliar)
    calculate();
}

function del() {
    let currentString = state.inputs[state.activeField];
    
    // Borrado caracter por caracter
    if (currentString.length > 1) {
        currentString = currentString.slice(0, -1);
    } else {
        currentString = "0";
    }

    // Limpieza si solo queda el punto
    if (currentString === "0.") currentString = "0";

    state.inputs[state.activeField] = currentString;
    document.getElementById(`v-${state.activeField}`).innerText = currentString;
    calculate();
}

function addItem(type) {
    const val = parseFloat(state.inputs.val);
    if (val > 0) {
        if (type === 'CAB') state.cabeceras.push(val);
        else state.salidas.push(val);
        
        // Resetear el campo visual de Amperes
        state.inputs.val = "0";
        document.getElementById('v-val').innerText = "0";
        
        updateList();
        calculate();
    }
}

function removeItem(type, index) {
    if (type === 'CAB') state.cabeceras.splice(index, 1);
    else state.salidas.splice(index, 1);
    updateList();
    calculate();
}

function updateList() {
    const container = document.getElementById('circ-list');
    if (state.cabeceras.length === 0 && state.salidas.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:15px; font-size:0.8rem; color:rgba(255,255,255,0.4);">Tablero vacío</div>';
        return;
    }
    
    let html = "";
    state.cabeceras.forEach((v, i) => {
        html += `<div class="circuit-item"><span><span class="tag-cab">CAB</span> ${v}A</span><span style="color:var(--error-red); cursor:pointer; font-weight:bold; font-size:1.1rem;" onclick="removeItem('CAB', ${i})">✕</span></div>`;
    });
    state.salidas.forEach((v, i) => {
        html += `<div class="circuit-item"><span><span class="tag-pia">PIA</span> ${v}A</span><span style="color:var(--error-red); cursor:pointer; font-weight:bold; font-size:1.1rem;" onclick="removeItem('PIA', ${i})">✕</span></div>`;
    });
    
    container.innerHTML = html;
    
    // Auto-Scroll al fondo
    container.scrollTop = container.scrollHeight;
}

function calculate() {
    // Factor de simultaneidad K
    let k = 1;
    const n = state.salidas.length;
    if (n >= 2 && n <= 3) k = 0.8;
    else if (n >= 4 && n <= 5) k = 0.7;
    else if (n >= 6 && n <= 9) k = 0.6;
    else if (n >= 10) k = 0.5;

    const ke = 0.85; 
    const poles = (state.phase === 'mono') ? 2 : 4;

    // Sumatoria Cabeceras
    let p_cab_total = 0;
    state.cabeceras.forEach(amp => { 
        p_cab_total += (getWatts(amp) * poles * (ke ** 2)); 
    });

    // Sumatoria Salidas
    let p_sal_total = 0;
    state.salidas.forEach(amp => { 
        p_sal_total += (getWatts(amp) * poles * (k ** 2)); 
    });

    // Auxiliares
    const p_aux = parseFloat(state.inputs.aux) || 0;
    
    // Total Final
    const ptot = ((p_cab_total + p_sal_total) * 1.2) + p_aux;

    // Renderizado de Resultados
    document.getElementById('res-ptot').innerText = ptot.toFixed(1);
    document.getElementById('rec-box').innerText = `Gabinete: > ${Math.ceil(ptot * 1.1)} W`;

    // Renderizado del Desglose Matemático
    if (state.cabeceras.length === 0 && state.salidas.length === 0) {
        document.getElementById('math-breakdown').innerHTML = "Agregue dispositivos para calcular...";
        return;
    }

    let breakdown = `
        <span style="color: var(--primary-neon);">Cabeceras (${state.cabeceras.length} ud, Ke=0.85):</span><br>
        Suma disipada: ${p_cab_total.toFixed(2)} W<br><br>
        
        <span style="color: var(--primary-neon);">Salidas (${state.salidas.length} ud, K=${k}):</span><br>
        Suma disipada: ${p_sal_total.toFixed(2)} W<br><br>
        
        <span style="color: var(--primary-neon);">Cálculo Final:</span><br>
        P_tot = (P_cab + P_sal) · 1.2 + P_au<br>
        P_tot = (${p_cab_total.toFixed(2)} + ${p_sal_total.toFixed(2)}) · 1.2 + ${p_aux}<br>
        P_tot = <span style="color: var(--warning-amber); font-weight: bold;">${ptot.toFixed(1)} W</span>
    `;
    document.getElementById('math-breakdown').innerHTML = breakdown;
}

function resetAll() {
    state.cabeceras = [];
    state.salidas = [];
    state.inputs.val = "0";
    state.inputs.aux = "0";
    document.getElementById('v-val').innerText = "0";
    document.getElementById('v-aux').innerText = "0";
    updateList();
    calculate();
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', calculate);
