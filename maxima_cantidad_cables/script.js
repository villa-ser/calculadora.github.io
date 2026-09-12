const CABLES_DATA = [
    { mm: "1.00", d: "2.8", s: "6.1" },
    { mm: "1.50", d: "3.0", s: "7.1" },
    { mm: "2.50", d: "3.7", s: "10.7" },
    { mm: "4.00", d: "4.2", s: "13.9" },
    { mm: "6.00", d: "4.8", s: "18.1" },
    { mm: "10.00", d: "6.0", s: "28.3" },
    { mm: "16.00", d: "7.2", s: "40.7" },
    { mm: "25.00", d: "8.9", s: "62.2" },
    { mm: "35.00", d: "10.1", s: "80.1" },
    { mm: "50.00", d: "12.0", s: "113.1" }
];

const DB = {
    metalica: {
        title: "TABLA 770.10.VII - METÁLICA (RS/RL)",
        legend: "RS: acero semipesado | RL: acero liviano",
        filters: ["TODOS", "RS", "RL"],
        pipes: [
            { id: "RS 16", type: "RS", mm: "16", si: "132", r: ["4+PE","3+PE","2+PE","-","-","-","-","-","-","-"] },
            { id: "RL 16", type: "RL", mm: "16", si: "154", r: ["4+PE","5+PE","3+PE","2+PE","-","-","-","-","-","-"] },
            { id: "RS 19", type: "RS", mm: "19", si: "177", r: ["5+PE","6+PE","4+PE","3+PE","-","-","-","-","-","-"] },
            { id: "RL 19", type: "RL", mm: "19", si: "227", r: ["9+PE","7+PE","5+PE","4+PE","2+PE","-","-","-","-","-"] },
            { id: "RS 22", type: "RS", mm: "22", si: "255", r: ["11+PE","9+PE","6+PE","4+PE","2+PE","-","-","-","-","-"] },
            { id: "RL 22", type: "RL", mm: "22", si: "314", r: ["15+PE","11+PE","7+PE","5+PE","3+PE","2+PE","-","-","-","-"] },
            { id: "RS 25", type: "RS", mm: "25", si: "346", r: ["-","13+PE","9+PE","6+PE","3+PE","2+PE","-","-","-","-"] },
            { id: "RL 25", type: "RL", mm: "25", si: "416", r: ["-","-","10+PE","7+PE","4+PE","2+PE","2+PE","-","-","-"] },
            { id: "RS 32", type: "RS", mm: "32", si: "616", r: ["-","-","15+PE","11+PE","6+PE","4+PE","3+PE","-","-","-"] },
            { id: "RL 32", type: "RL", mm: "32", si: "661", r: ["-","-","-","12+PE","7+PE","4+PE","3+PE","-","-","-"] },
            { id: "RS 38", type: "RS", mm: "38", si: "908", r: ["-","-","-","-","9+PE","6+PE","4+PE","2+PE","2+PE","-"] },
            { id: "RL 38", type: "RL", mm: "38", si: "962", r: ["-","-","-","-","10+PE","7+PE","5+PE","3+PE","2+PE","-"] },
            { id: "RS 51", type: "RS", mm: "51", si: "1662", r: ["-","-","-","-","18+PE","12+PE","9+PE","5+PE","4+PE","3+PE"] },
            { id: "RL 51", type: "RL", mm: "51", si: "1810", r: ["-","-","-","-","-","12+PE","9+PE","6+PE","4+PE","3+PE"] }
        ]
    },
    rigida: {
        title: "TABLA 770.10.VIII - RÍGIDA (RP/RSP)",
        legend: "RP: rígido pesado | RSP: rígido semipesado",
        filters: ["TODOS", "RP", "RSP"],
        pipes: [
            { id: "RP 16", type: "RP", mm: "16", si: "127", r: ["2+PE","4+PE","2+PE","-","-","-","-","-","-","-"] },
            { id: "RSP 16", type: "RSP", mm: "16", si: "146", r: ["3+PE","4+PE","3+PE","2+PE","-","-","-","-","-","-"] },
            { id: "RP 20", type: "RP", mm: "20", si: "213", r: ["8+PE","7+PE","4+PE","3+PE","-","-","-","-","-","-"] },
            { id: "RSP 20", type: "RSP", mm: "20", si: "235", r: ["10+PE","8+PE","5+PE","4+PE","2+PE","-","-","-","-","-"] },
            { id: "RP 22", type: "RP", mm: "22", si: "264", r: ["12+PE","9+PE","6+PE","4+PE","2+PE","-","-","-","-","-"] },
            { id: "RSP 22", type: "RSP", mm: "22", si: "302", r: ["14+PE","10+PE","7+PE","5+PE","2+PE","-","-","-","-","-"] },
            { id: "RP 25", type: "RP", mm: "25", si: "347", r: ["-","13+PE","9+PE","6+PE","3+PE","2+PE","-","-","-","-"] },
            { id: "RSP 25", type: "RSP", mm: "25", si: "388", r: ["-","13+PE","9+PE","6+PE","3+PE","2+PE","-","-","-","-"] },
            { id: "RP 32", type: "RP", mm: "32", si: "613", r: ["-","-","15+PE","11+PE","6+PE","4+PE","3+PE","-","-","-"] },
            { id: "RSP 32", type: "RSP", mm: "32", si: "649", r: ["-","-","15+PE","12+PE","7+PE","4+PE","3+PE","-","-","-"] },
            { id: "RP 40", type: "RP", mm: "40", si: "1012", r: ["-","-","-","-","10+PE","7+PE","5+PE","3+PE","2+PE","-"] },
            { id: "RSP 40", type: "RSP", mm: "40", si: "1034", r: ["-","-","-","-","11+PE","7+PE","5+PE","3+PE","2+PE","-"] },
            { id: "RP 50", type: "RP", mm: "50", si: "1643", r: ["-","-","-","-","17+PE","12+PE","8+PE","5+PE","4+PE","2+PE"] },
            { id: "RSP 50", type: "RSP", mm: "50", si: "1668", r: ["-","-","-","-","18+PE","12+PE","9+PE","5+PE","4+PE","3+PE"] }
        ]
    },
    corrugado: {
        title: "TABLA 770.10.IX - CORRUGADO (CSP/CL)",
        legend: "CSP: curvable semipesado | CL: curvable liviano",
        filters: ["TODOS", "CSP", "CL"],
        pipes: [
            { id: "CSP 16", type: "CSP", mm: "16", si: "98", r: ["1+PE","3+PE","-","-","-","-","-","-","-","-"] },
            { id: "CL 16", type: "CL", mm: "16", si: "102", r: ["1+PE","3+PE","2+PE","-","-","-","-","-","-","-"] },
            { id: "CSP 20", type: "CSP", mm: "20", si: "158", r: ["4+PE","5+PE","3+PE","2+PE","-","-","-","-","-","-"] },
            { id: "CL 20", type: "CL", mm: "20", si: "164", r: ["4+PE","5+PE","3+PE","2+PE","-","-","-","-","-","-"] },
            { id: "CSP 22", type: "CSP", mm: "22", si: "213", r: ["8+PE","7+PE","4+PE","3+PE","-","-","-","-","-","-"] },
            { id: "CL 22", type: "CL", mm: "22", si: "223", r: ["9+PE","7+PE","5+PE","3+PE","2+PE","-","-","-","-","-"] },
            { id: "CSP 25", type: "CSP", mm: "25", si: "293", r: ["-","10+PE","6+PE","5+PE","2+PE","-","-","-","-","-"] },
            { id: "CL 25", type: "CL", mm: "25", si: "309", r: ["-","10+PE","7+PE","5+PE","2+PE","-","-","-","-","-"] },
            { id: "CSP 32", type: "CSP", mm: "32", si: "509", r: ["-","-","12+PE","9+PE","5+PE","3+PE","2+PE","-","-","-"] },
            { id: "CL 32", type: "CL", mm: "32", si: "527", r: ["-","-","12+PE","9+PE","5+PE","3+PE","2+PE","-","-","-"] },
            { id: "CSP 40", type: "CSP", mm: "40", si: "767", r: ["-","-","-","-","8+PE","5+PE","3+PE","2+PE","-","-"] },
            { id: "CL 40", type: "CL", mm: "40", si: "814", r: ["-","-","-","-","8+PE","5+PE","4+PE","2+PE","-","-"] },
            { id: "CSP 50", type: "CSP", mm: "50", si: "1507", r: ["-","-","-","-","16+PE","11+PE","8+PE","5+PE","3+PE","2+PE"] },
            { id: "CL 50", type: "CL", mm: "50", si: "1545", r: ["-","-","-","-","16+PE","11+PE","8+PE","5+PE","3+PE","2+PE"] }
        ]
    }
};

let currentCategory = 'metalica';
let currentFilter = 'TODOS';
let currentCableIdx = 2; 
let currentPipeId = "RL 19";

// --- FUNCIÓN DE NAVEGACIÓN ---
function volverAlMenu() {
    window.location.href = '../index.html#menu';
}

function init() {
    const cOpt = document.getElementById('cable-options');
    CABLES_DATA.forEach((c, i) => {
        let div = document.createElement('div');
        div.innerText = c.mm + " mm²";
        div.onclick = () => selectCable(i);
        cOpt.appendChild(div);
    });
    updateCategoryUI();
}

function setCategory(cat) {
    currentCategory = cat;
    currentFilter = 'TODOS';
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + cat).classList.add('active');
    updateCategoryUI();
}

function setFilter(f) {
    currentFilter = f;
    updateCategoryUI();
}

function updateCategoryUI() {
    const catData = DB[currentCategory];
    document.getElementById('table-name').innerText = catData.title;
    document.getElementById('type-legend').innerText = catData.legend;

    // Renderizar Filtros
    const filterContainer = document.getElementById('sub-filters');
    filterContainer.innerHTML = "";
    catData.filters.forEach(f => {
        let btn = document.createElement('button');
        btn.className = `filter-btn ${currentFilter === f ? 'active' : ''}`;
        btn.innerText = f;
        btn.onclick = () => setFilter(f);
        filterContainer.appendChild(btn);
    });

    // Filtrar caños para el selector
    const filteredPipes = catData.pipes.filter(p => currentFilter === 'TODOS' || p.type === currentFilter);
    const pOpt = document.getElementById('pipe-options');
    pOpt.innerHTML = "";
    filteredPipes.forEach((p) => {
        let div = document.createElement('div');
        div.innerText = p.mm + " mm (" + p.id + ")";
        div.onclick = () => selectPipe(p.id);
        pOpt.appendChild(div);
    });

    // Validar si el caño seleccionado sigue existiendo en el filtro
    if (!filteredPipes.find(p => p.id === currentPipeId)) {
        currentPipeId = filteredPipes[0].id;
        document.getElementById('pipe-display').innerText = filteredPipes[0].mm + " mm";
    }

    renderFullTable();
    updateDisplay();
}

function selectCable(idx) {
    currentCableIdx = idx;
    document.getElementById('cable-display').innerText = CABLES_DATA[idx].mm + " mm²";
    updateDisplay();
}

function selectPipe(id) {
    currentPipeId = id;
    const p = DB[currentCategory].pipes.find(x => x.id === id);
    document.getElementById('pipe-display').innerText = p.mm + " mm";
    updateDisplay();
}

function updateDisplay() {
    const cable = CABLES_DATA[currentCableIdx];
    const pipe = DB[currentCategory].pipes.find(x => x.id === currentPipeId);
    const result = pipe.r[currentCableIdx];

    document.getElementById('cable-info').innerText = `Ø: ${cable.d}mm | Sec: ${cable.s}mm²`;
    document.getElementById('pipe-info').innerText = `Sección Int: ${pipe.si} mm²`;
    document.getElementById('res-val').innerText = result;

    document.querySelectorAll('td').forEach(td => td.classList.remove('highlight-cell'));
    document.querySelectorAll('tr').forEach(tr => tr.classList.remove('highlight-row'));
    
    const pipeIdxInFullList = DB[currentCategory].pipes.findIndex(x => x.id === currentPipeId);
    const cell = document.getElementById(`cell-${pipeIdxInFullList}-${currentCableIdx}`);
    if(cell) {
        cell.classList.add('highlight-cell');
        cell.parentElement.classList.add('highlight-row');
    }
}

function renderFullTable() {
    const head = document.getElementById('table-headers');
    const body = document.getElementById('table-body');
    head.innerHTML = "<th>Caño</th>";
    CABLES_DATA.forEach(c => head.innerHTML += `<th>${c.mm}</th>`);

    body.innerHTML = "";
    DB[currentCategory].pipes.forEach((p, pIdx) => {
        // Opacar filas que no pertenecen al filtro actual
        const isDimmed = currentFilter !== 'TODOS' && p.type !== currentFilter;
        let row = `<tr style="opacity: ${isDimmed ? '0.3' : '1'}"><td style="font-weight:bold; color:var(--primary-neon)">${p.id}</td>`;
        p.r.forEach((res, cIdx) => {
            row += `<td id="cell-${pIdx}-${cIdx}">${res}</td>`;
        });
        row += "</tr>";
        body.innerHTML += row;
    });
}

function toggleDrop(id) {
    const el = document.getElementById(id);
    const isShow = el.classList.contains('show');
    document.querySelectorAll('.select-items').forEach(d => d.classList.remove('show'));
    if(!isShow) {
        el.classList.add('show');
        document.getElementById(id === 'cable-options' ? 'cable-display' : 'pipe-display').classList.add('select-arrow-active');
    }
}

window.onclick = function(e) {
    if (!e.target.matches('.select-selected')) {
        document.querySelectorAll('.select-items').forEach(d => d.classList.remove('show'));
        document.querySelectorAll('.select-selected').forEach(d => d.classList.remove('select-arrow-active'));
    }
}

// Inicializar la aplicación al cargar
document.addEventListener('DOMContentLoaded', init);

