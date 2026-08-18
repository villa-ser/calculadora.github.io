// --- FUNCIÓN DE NAVEGACIÓN ---
function volverAlMenu() {
    window.location.href = '../index.html#menu';
}

// --- LÓGICA DE CALCULADORA ---
let activeField = 'amp';
let data = { amp: '', mts: '', vnom: '220', cosphi: '0.85', senphi: '0.53' };

const tablaR = {
    'cu': { 1.0: 18.1, 1.5: 13.3, 2.5: 7.98, 4: 4.95, 6: 3.30, 10: 1.91, 16: 1.21, 25: 0.78, 35: 0.554, 50: 0.386 },
    'al': { 1.0: 30.1, 1.5: 21.0, 2.5: 12.6, 4: 7.82, 6: 5.21, 10: 3.08, 16: 1.91, 25: 1.20, 35: 0.868, 50: 0.641 }
};

// Inicialización de la pantalla
document.addEventListener('DOMContentLoaded', () => {
    updateTable();
    setActive('amp');
});

function setActive(field) {
    activeField = field;
    
    // Limpiar clases activas
    document.querySelectorAll('.input-group').forEach(el => {
        el.classList.remove('active');
        el.classList.remove('pulse-active');
    });
    document.querySelectorAll('.display-value span').forEach(el => el.classList.remove('sub-active'));

    // Asignar estado activo según selección
    if (field === 'cosphi' || field === 'senphi') {
        document.getElementById('grp-phi').classList.add('active');
        document.getElementById('disp-' + field).classList.add('sub-active');
    } else {
        document.getElementById('grp-' + field).classList.add('active');
    }
}

function toggleDrop(e) {
    e.stopPropagation();
    const options = document.getElementById('sec-options');
    const selected = document.getElementById('disp-sec-sel');
    options.classList.toggle('show');
    selected.classList.toggle('select-arrow-active');
}

// Cierra el menú desplegable si se hace click afuera
window.onclick = function(event) {
    if (!event.target.matches('.select-selected')) {
        let dropdowns = document.getElementsByClassName("select-items");
        let selecteds = document.getElementsByClassName("select-selected");
        
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) {
                dropdowns[i].classList.remove('show');
            }
        }
        for (let i = 0; i < selecteds.length; i++) {
            if (selecteds[i].classList.contains('select-arrow-active')) {
                selecteds[i].classList.remove('select-arrow-active');
            }
        }
    }
}

function setSec(val) {
    document.getElementById('disp-sec-sel').innerText = val;
    document.getElementById('sec-val').value = val;
    document.getElementById('sec-options').classList.remove('show');
    document.getElementById('disp-sec-sel').classList.remove('select-arrow-active');
    updateTable();
}

function setPreset(cp, sp) {
    data.cosphi = cp.toString();
    data.senphi = sp.toString();
    document.getElementById('disp-cosphi').innerText = cp;
    document.getElementById('disp-senphi').innerText = sp;
    calc();

    // Mostrar alerta modal si se selecciona "Arranque Motor"
    if (cp === 0.30) {
        document.getElementById('modal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    setActive('amp');
    document.getElementById('grp-amp').classList.add('pulse-active');
}

function press(num) {
    if (data[activeField].length < 7) {
        if (data[activeField] === '0') data[activeField] = '';
        data[activeField] += num;
        document.getElementById('disp-' + activeField).innerText = data[activeField];
        calc();
    }
}

function clearVal() {
    if (data[activeField].length > 0) {
        data[activeField] = data[activeField].slice(0, -1);
        document.getElementById('disp-' + activeField).innerText = data[activeField] === '' ? '0' : data[activeField];
        calc();
    }
}

function resetAll() {
    data = { amp: '', mts: '', vnom: '220', cosphi: '0.85', senphi: '0.53' };
    document.getElementById('disp-amp').innerText = '0';
    document.getElementById('disp-mts').innerText = '0';
    document.getElementById('disp-vnom').innerText = '220';
    document.getElementById('disp-cosphi').innerText = '0.85';
    document.getElementById('disp-senphi').innerText = '0.53';
    
    setSec('2.5');
    document.querySelector('input[value="normal"]').checked = true;
    updateTable();
    
    document.getElementById('out_u').innerText = "0.00 V";
    document.getElementById('out_pct').innerText = "0.00 %";
    document.getElementById('out_fin').innerText = "0.00 V";
    setActive('amp');
}

function updateTable() {
    const m = document.querySelector('input[name="mat"]:checked').value;
    const s = document.getElementById('sec-val').value;
    document.getElementById('disp-res').innerText = tablaR[m][s];
    calc();
}

function calc() {
    const k = parseFloat(document.querySelector('input[name="sis"]:checked').value);
    const Vn = parseFloat(data.vnom) || 220;
    const I = parseFloat(data.amp) || 0;
    const M = parseFloat(data.mts) || 0;
    const R = parseFloat(document.getElementById('disp-res').innerText);
    const X = 0.08; 
    const cp = parseFloat(data.cosphi) || 0;
    const sp = parseFloat(data.senphi) || 0;

    if (I <= 0 || M <= 0) {
        document.getElementById('out_u').innerText = "0.00 V";
        document.getElementById('out_pct').innerText = "0.00 %";
        document.getElementById('out_fin').innerText = "0.00 V";
        return;
    }

    const L = M / 1000;
    const du = k * I * L * (R * cp + X * sp);
    const pc = (du / Vn) * 100;
    const vf = Vn - du;

    document.getElementById('out_u').innerText = du.toFixed(2) + " V";
    document.getElementById('out_pct').innerText = pc.toFixed(2) + " %";
    document.getElementById('out_fin').innerText = vf.toFixed(2) + " V";
                  }

