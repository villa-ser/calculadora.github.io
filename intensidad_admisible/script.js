// --- FUNCIÓN DE NAVEGACIÓN ---
function volverAlMenu() {
    window.location.href = '../index.html#menu';
}

// --- DATOS TABLAS AEA ---
const allData = {
    "770.12.I": {
        "1.0":  { B1: [11, 10] },
        "1.5":  { B1: [15, 14] },
        "2.5":  { B1: [21, 18] },
        "4":    { B1: [28, 25] },
        "6":    { B1: [36, 32] },
        "10":   { B1: [50, 44] },
        "16":   { B1: [66, 59] },
        "25":   { B1: [88, 77] },
        "35":   { B1: [109, 96] },
        "50":   { B1: [131, 117] },
        "70":   { B1: [167, 149] },
        "95":   { B1: [202, 180] },
        "120":  { B1: [234, 208] },
        "150":  { B1: [261, 228] },
        "185":  { B1: [297, 258] },
        "240":  { B1: [348, 301] },
        "300":  { B1: [398, 343] }
    },
    "770.12.III": {
        "1.5": { B2: [14, 13], D1: [25, 20], D2: [29, 25] },
        "2.5": { B2: [20, 17], D1: [33, 27], D2: [39, 34] },
        "4":   { B2: [26, 23], D1: [43, 35], D2: [51, 44] },
        "6":   { B2: [33, 30], D1: [53, 44], D2: [65, 55] },
        "10":  { B2: [45, 40], D1: [71, 58], D2: [88, 74] },
        "16":  { B2: [60, 54], D1: [91, 75], D2: [112, 95] },
        "25":  { B2: [78, 70], D1: [117, 96], D2: [144, 123] },
        "35":  { B2: [97, 86], D1: [140, 115], D2: [173, 147] },
        "50":  { B2: [116, 103], D1: [166, 137], D2: [207, 173] },
        "70":  { B2: [146, 130], D1: [205, 169], D2: [254, 211] },
        "95":  { B2: [175, 156], D1: [242, 201], D2: [306, 254] },
        "120": { B2: [202, 179], D1: [276, 228], D2: [350, 290] },
        "150": { B2: [224, 196], D1: [312, 258], D2: [393, 325] },
        "185": { B2: [256, 222], D1: [350, 289], D2: [445, 369] },
        "240": { B2: [299, 258], D1: [405, 333], D2: [519, 428] },
        "300": { B2: [343, 295], D1: [457, 377], D2: [587, 484] }
    }
};

const descriptionsText = {
    "B1": "<b>Método B1:</b> Caño en mampostería, cielorraso o a la vista.<br><span style='color: var(--primary-neon);'>Sin envoltura IRAM-NM 247-3 / IRAM 62267</span>",
    "B2": "<b>Método B2:</b> Caño embutido en pared o caño a la vista.<br><span style='color: var(--primary-neon);'>Con envoltura IRAM 2178-1 / IRAM 62266</span>",
    "D1": "<b>Método D1:</b> Caño enterrado.<br><span style='color: var(--primary-neon);'>Con envoltura IRAM 2178-1 / IRAM 62266</span>",
    "D2": "<b>Método D2:</b> Directamente enterrado.<br><span style='color: var(--primary-neon);'>Con envoltura IRAM 2178-1 / IRAM 62266</span>"
};

const descriptionsImages = {
    "B1": `<svg viewBox="0 0 120 70" height="70px"><pattern id="wallB1" width="20" height="10" patternUnits="userSpaceOnUse"><rect width="20" height="10" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/></pattern><rect x="30" y="0" width="60" height="70" fill="url(#wallB1)"/><circle cx="60" cy="35" r="15" fill="rgba(0,0,0,0.8)" stroke="#00d4ff" stroke-width="1.5"/><circle cx="56" cy="38" r="2.5" fill="#00d4ff"/><circle cx="64" cy="38" r="2.5" fill="#00d4ff"/><circle cx="60" cy="32" r="2.5" fill="#00d4ff"/></svg>`,
    "B2": `<svg viewBox="0 0 120 70" height="70px"><pattern id="wall" width="20" height="10" patternUnits="userSpaceOnUse"><rect width="20" height="10" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/></pattern><rect x="30" y="0" width="60" height="70" fill="url(#wall)"/><circle cx="60" cy="35" r="18" fill="rgba(0,0,0,0.8)" stroke="#00d4ff" stroke-width="2"/><circle cx="53" cy="35" r="4" fill="white"/><circle cx="67" cy="35" r="4" fill="white"/></svg>`,
    "D1": `<svg viewBox="0 0 120 70" height="70px"><pattern id="earth" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/></pattern><rect width="120" height="70" fill="url(#earth)"/><circle cx="60" cy="45" r="18" fill="rgba(0,0,0,0.8)" stroke="#00d4ff" stroke-width="2"/><circle cx="53" cy="45" r="4" fill="white"/><circle cx="67" cy="45" r="4" fill="white"/></svg>`,
    "D2": `<svg viewBox="0 0 120 70" height="70px"><pattern id="earth2" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/></pattern><rect width="120" height="70" fill="url(#earth2)"/><line x1="30" y1="35" x2="90" y2="35" stroke="#00d4ff" stroke-width="4"/><circle cx="50" cy="53" r="5" fill="white"/><circle cx="70" cy="53" r="5" fill="white"/></svg>`
};

// --- LÓGICA DE LA CALCULADORA ---
document.addEventListener('DOMContentLoaded', () => {
    setTable('770.12.I');
});

function setTable(tableId) {
    document.getElementById('table-val').value = tableId;
    document.getElementById('btn-T1').classList.toggle('active', tableId === '770.12.I');
    document.getElementById('btn-T3').classList.toggle('active', tableId === '770.12.III');
    document.getElementById('main-title').innerText = `TABLA ${tableId}`;
    
    updateCableSelect(tableId); 
    updateMethodsUI(tableId);

    const footer = document.getElementById('footer-text');
    if(tableId === '770.12.I') {
        footer.innerHTML = "<b>Referencia:</b> Tabla 770.12.I. Intensidades admisibles [A] para temperatura ambiente de 40 °C. Cables sin envoltura en cañerías o cablecanales.";
        setMethod('B1');
    } else {
        footer.innerHTML = "<b>Referencia:</b> Tabla 770.12.III. Intensidades admisibles [A] para temperatura del aire de 40 °C y enterrados a 25 °C. Aislación termoplástica con envoltura.";
        setMethod('B2');
    }
    
    renderTable();
    calculate();
}

function updateMethodsUI(tableId) {
    const container = document.getElementById('methods-container');
    container.innerHTML = '';
    const methods = tableId === '770.12.I' ? ['B1'] : ['B2', 'D1', 'D2'];
    
    methods.forEach(m => {
        const btn = document.createElement('button');
        btn.className = 'toggle-btn';
        btn.id = 'btn-' + m;
        btn.innerText = m + (m==='B1'?' (Caño Emb.)':m==='B2'?' (Pared/Vista)':m==='D1'?' (Caño Ent.)':' (Dir. Ent.)');
        btn.onclick = () => setMethod(m);
        container.appendChild(btn);
    });
}

function updateCableSelect(tableId) {
    const container = document.getElementById('cable-options');
    container.innerHTML = '';
    const keys = Object.keys(allData[tableId]).sort((a, b) => parseFloat(a) - parseFloat(b));
    
    keys.forEach(mm => {
        const div = document.createElement('div');
        div.innerText = mm + " mm²";
        div.onclick = () => {
            document.getElementById('cable-display').innerText = mm + " mm²";
            document.getElementById('mm-val').value = mm;
            toggleDrop();
            calculate();
        };
        container.appendChild(div);
    });

    const currentVal = document.getElementById('mm-val').value;
    if (!allData[tableId][currentVal]) {
        const defaultVal = keys[0]; 
        document.getElementById('mm-val').value = defaultVal;
        document.getElementById('cable-display').innerText = defaultVal + " mm²";
    }
}

function toggleDrop(e) {
    if(e) e.stopPropagation();
    document.getElementById('cable-options').classList.toggle('show');
    document.getElementById('cable-display').classList.toggle('select-arrow-active');
}

function setMethod(method) {
    document.getElementById('method-val').value = method;
    const btns = document.querySelectorAll('#methods-container .toggle-btn');
    btns.forEach(b => b.classList.remove('active'));
    if(document.getElementById('btn-' + method)) document.getElementById('btn-' + method).classList.add('active');
    
    document.getElementById('table-title-display').innerText = `Mostrando valores para Método ${method}`;
    document.getElementById('method-image').innerHTML = descriptionsImages[method];
    document.getElementById('method-text').innerHTML = descriptionsText[method];
    
    calculate();
    renderTable();
}

function setType(type) {
    document.getElementById('type-val').value = type;
    document.getElementById('btn-2x').classList.toggle('active', type === '2x');
    document.getElementById('btn-3x').classList.toggle('active', type === '3x');
    calculate();
}

function calculate() {
    const tableId = document.getElementById('table-val').value;
    const mm = document.getElementById('mm-val').value;
    const type = document.getElementById('type-val').value;
    const method = document.getElementById('method-val').value;
    
    if(!allData[tableId][mm] || !allData[tableId][mm][method]) return;

    const typeIndex = type === '2x' ? 0 : 1;
    const result = allData[tableId][mm][method][typeIndex];
    
    document.getElementById('res-val').innerHTML = result + '<span class="unit">A</span>';
}

function renderTable() {
    const tableId = document.getElementById('table-val').value;
    const method = document.getElementById('method-val').value;
    const keys = Object.keys(allData[tableId]).sort((a, b) => parseFloat(a) - parseFloat(b));
    const half = Math.ceil(keys.length / 2);
    let html = '';
    
    for(let i = 0; i < half; i++) {
        const k1 = keys[i];
        const k2 = keys[i + half];
        html += `<tr>
            <td style="color:var(--primary-neon); font-weight:bold">${k1}</td>
            <td>${allData[tableId][k1][method][0]}</td>
            <td>${allData[tableId][k1][method][1]}</td>
            ${k2 ? `
            <td style="color:var(--primary-neon); font-weight:bold">${k2}</td>
            <td>${allData[tableId][k2][method][0]}</td>
            <td>${allData[tableId][k2][method][1]}</td>
            ` : '<td>-</td><td>-</td><td>-</td>'}
        </tr>`;
    }
    document.getElementById('data-table').innerHTML = html;
}

window.onclick = function(event) {
    if (!event.target.matches('.select-selected')) {
        const dropdowns = document.getElementsByClassName("select-items");
        const selecteds = document.getElementsByClassName("select-selected");
        
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].classList.contains('show')) dropdowns[i].classList.remove('show');
        }
        for (let i = 0; i < selecteds.length; i++) {
            if (selecteds[i].classList.contains('select-arrow-active')) selecteds[i].classList.remove('select-arrow-active');
        }
    }
                }
                                                    
