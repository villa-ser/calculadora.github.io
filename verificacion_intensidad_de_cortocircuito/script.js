let activeF = 'Icc';
let k_val = 115;
let t_val = 0.01;
let vals = { S: '2.5', Icc: '4500', L: '15', IccT: '20000', LT: '150' };

// --- FUNCIÓN DE NAVEGACIÓN ---
function volverAlMenu() {
    window.location.href = '../index.html#menu';
}

function setFocus(f) {
    activeF = f;
    document.querySelectorAll('.input-group').forEach(i => i.classList.remove('active'));
    document.getElementById('in-' + f).classList.add('active');
}

function setAEA(val, id) {
    vals.Icc = val.toString();
    document.getElementById('v-Icc').innerText = val;
    document.querySelectorAll('[id^="aea-"]').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    calc();
}

function setK(v, id) {
    k_val = v;
    document.querySelectorAll('[id^="k-"]').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    calc();
}

function setT(v, id) {
    t_val = v;
    document.querySelectorAll('[id^="t-"]').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    calc();
}

function press(n) {
    if(vals[activeF] === '0') vals[activeF] = '';
    
    // Limitador de caracteres para no romper la interfaz visual
    if(vals[activeF].length < 7) {
        vals[activeF] += n;
        document.getElementById('v-' + activeF).innerText = vals[activeF];
        calc();
    }
}

function del() {
    // Borrado dígito por dígito
    let valStr = vals[activeF].toString();
    
    if (valStr.length > 1) {
        vals[activeF] = valStr.slice(0, -1);
    } else {
        vals[activeF] = '0';
    }
    
    document.getElementById('v-' + activeF).innerText = vals[activeF];
    calc();
}

function calc() {
    const IccT = parseFloat(vals.IccT) || 0;
    const LT = parseFloat(vals.LT) || 0;
    const S = parseFloat(vals.S) || 2.5;
    const L = parseFloat(vals.L) || 0;

    // Autocálculo de Icc Origen si cambian los valores del Transformador
    if(activeF === 'LT' || activeF === 'IccT') {
        const R_red = (0.028 * LT) / 35;
        vals.Icc = Math.round(IccT / (1 + (IccT * R_red / 230))).toString();
        document.getElementById('v-Icc').innerText = vals.Icc;
    }

    const IccO = parseFloat(vals.Icc);
    const R_loc = (0.018 * L) / S;
    const IccL = IccO / (1 + (IccO * R_loc / 230));
    document.getElementById('v-IccL').innerText = Math.round(IccL);

    const KS2 = Math.pow(k_val * S, 2);
    const IT2 = Math.pow(IccL, 2) * t_val;

    document.getElementById('res-ks').innerText = Math.round(KS2).toLocaleString('de-DE');
    document.getElementById('res-it').innerText = Math.round(IT2).toLocaleString('de-DE');

    const mainRes = document.getElementById('main-result');
    const op = document.getElementById('res-op');
    const rec = document.getElementById('rec-text');

    if (KS2 >= IT2) {
        mainRes.innerText = "CUMPLE";
        mainRes.style.color = "var(--success-green)";
        op.innerText = "≥"; 
        op.style.color = "white";
        rec.innerText = "SISTEMA PROTEGIDO"; 
        rec.style.color = "var(--success-green)";
    } else {
        mainRes.innerText = "NO CUMPLE";
        mainRes.style.color = "var(--error-red)";
        op.innerText = "<"; 
        op.style.color = "var(--error-red)";
        rec.innerText = "RIESGO TÉRMICO EXTREMO"; 
        rec.style.color = "var(--error-red)";
    }
}

function resetAll() {
    vals = { S: '2.5', Icc: '4500', L: '15', IccT: '20000', LT: '150' };
    setK(115, 'k-115'); 
    setT(0.01, 't-01');
    document.querySelectorAll('[id^="aea-"]').forEach(c => c.classList.remove('active'));
    document.getElementById('aea-4500').classList.add('active');
    Object.keys(vals).forEach(k => document.getElementById('v-' + k).innerText = vals[k]);
    calc();
}

// Inicialización
window.addEventListener('DOMContentLoaded', calc);
