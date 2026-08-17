let activeField = 'ib';
let currentPhase = 'mono';
let data = { ib: '', in: 0, iz: 0, i2: 0, ik: '', pdc: '', w: '', v: '220' };

// Tabla de corrientes admisibles AEA (Cobre - PVC - En Cañería)
const tablaIz = {
    mono: [
        {s: "1.5", a: 15}, {s: "2.5", a: 21}, {s: "4", a: 28}, 
        {s: "6", a: 36}, {s: "10", a: 50}, {s: "16", a: 66}, 
        {s: "25", a: 88}, {s: "35", a: 109}
    ],
    tri: [
        {s: "1.5", a: 14}, {s: "2.5", a: 18}, {s: "4", a: 25}, 
        {s: "6", a: 32}, {s: "10", a: 44}, {s: "16", a: 58}, 
        {s: "25", a: 77}, {s: "35", a: 96}
    ]
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    setPhase('mono');
}

function volverAlMenu() {
    window.location.href = '../index.html';
}

// Menú desplegable personalizado
function toggleDropdown(listId, displayId) {
    const list = document.getElementById(listId);
    const display = document.getElementById(displayId);
    const isShowing = list.classList.contains('show');
    closeAllDropdowns();
    if (!isShowing) { 
        list.classList.add('show'); 
        display.classList.add('select-arrow-active'); 
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.select-items').forEach(el => el.classList.remove('show'));
    document.querySelectorAll('.select-selected').forEach(el => el.classList.remove('select-arrow-active'));
}

document.addEventListener("click", function(event) {
    if (!event.target.closest('.custom-select')) closeAllDropdowns();
});

function selectOptionIn(val, text) {
    document.getElementById('display-in').innerText = text;
    closeAllDropdowns();
    updateIn(val);
}

function selectOptionIz(val, text) {
    document.getElementById('display-iz').innerText = text;
    closeAllDropdowns();
    updateIz(val);
}

// Lógica de fases y datos
function setPhase(p) {
    currentPhase = p;
    document.getElementById('btn-mono').classList.toggle('active', p === 'mono');
    document.getElementById('btn-tri').classList.toggle('active', p === 'tri');
    
    const listIz = document.getElementById('list-iz');
    listIz.innerHTML = '<div class="opt-item" onclick="selectOptionIz(0, \'--\')">--</div>';
    tablaIz[p].forEach(item => {
        listIz.innerHTML += `<div class="opt-item" onclick="selectOptionIz(${item.a}, '${item.s} mm² (${item.a}A)')">${item.s} mm² (${item.a}A)</div>`;
    });
    
    data.iz = 0;
    document.getElementById('display-iz').innerText = '--';
    calculate();
}

function updateIn(val) {
    data.in = parseFloat(val);
    data.i2 = (data.in * 1.45).toFixed(2);
    document.getElementById('disp-i2').innerText = data.in > 0 ? data.i2 : '0';
    calculate();
}

function updateIz(val) {
    data.iz = parseFloat(val);
    calculate();
}

function setActive(field) {
    activeField = field;
    document.querySelectorAll('.input-group').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.p-input').forEach(el => el.classList.remove('active'));

    if (field === 'w' || field === 'v') {
        document.getElementById('ib-helper').classList.add('visible');
        document.getElementById(field + '-val').classList.add('active');
        document.getElementById('group-ib').classList.add('active');
    } else if (['ib', 'ik', 'pdc'].includes(field)) {
        const target = document.getElementById('group-' + field);
        if (target) target.classList.add('active');
        document.getElementById('ib-helper').classList.toggle('visible', field === 'ib');
    }
}

function calcIB() {
    const w = parseFloat(data.w) || 0;
    const v = parseFloat(data.v) || 220;
    if (w > 0) {
        let res = (w / v).toFixed(2);
        data.ib = res.toString();
        document.getElementById('disp-ib').innerText = data.ib;
        calculate();
    }
}

function press(num) {
    if (['ib', 'ik', 'pdc', 'w', 'v'].includes(activeField)) {
        if (data[activeField].length < 7) {
            data[activeField] += num;
            if (activeField === 'w' || activeField === 'v') {
                document.getElementById(activeField + '-val').value = data[activeField];
                calcIB();
            } else {
                document.getElementById('disp-' + activeField).innerText = data[activeField];
                calculate();
            }
        }
    }
}

function clearVal() {
    if (['ib', 'ik', 'pdc', 'w', 'v'].includes(activeField)) {
        data[activeField] = '';
        if (activeField === 'w' || activeField === 'v') {
            document.getElementById(activeField + '-val').value = '';
            calcIB();
        } else {
            document.getElementById('disp-' + activeField).innerText = '0';
            calculate();
        }
    }
}

function resetAll() {
    data = { ib: '', in: 0, iz: 0, i2: 0, ik: '', pdc: '', w: '', v: '220' };
    document.getElementById('disp-ib').innerText = '0';
    document.getElementById('disp-ik').innerText = '0';
    document.getElementById('disp-pdc').innerText = '0';
    document.getElementById('disp-i2').innerText = '0';
    document.getElementById('w-val').value = '';
    document.getElementById('v-val').value = '220';
    document.getElementById('display-in').innerText = '--';
    document.getElementById('display-iz').innerText = '--';
    calculate();
}

function calculate() {
    const ib = parseFloat(data.ib) || 0;
    const in_val = data.in;
    const iz = data.iz;
    const i2 = parseFloat(data.i2) || 0;
    const ik = parseFloat(data.ik) || 0;
    const pdc = parseFloat(data.pdc) || 0;

    updateStatus('cond1', 'status1', (ib > 0 && in_val > 0 && iz > 0 && ib <= in_val && in_val <= iz));
    updateStatus('cond2', 'status2', (i2 > 0 && iz > 0 && i2 <= (1.45 * iz)));
    updateStatus('cond3', 'status3', (ik > 0 && pdc > 0 && ik <= pdc));
}

function updateStatus(cardId, statusId, passed) {
    const card = document.getElementById(cardId);
    const status = document.getElementById(statusId);
    if (!card || !status) return;
    
    card.className = passed ? 'condition-card pass' : 'condition-card fail';
    status.innerHTML = passed ? '✔' : '✖';
    status.style.color = passed ? 'var(--success-neon)' : 'var(--error-neon)';
}
