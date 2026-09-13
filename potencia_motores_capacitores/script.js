let activeF = '';
let currentVals = {};
let selectedEqId = '';

// Almacén persistente para mantener valores entre cambios de cálculo
let persistentStore = {}; 

const db = {
    mono: {
        desc: "<b>Potencias Monofásicas:</b> Se utiliza para cargas conectadas entre una fase y el neutro (220V). La potencia activa representa el trabajo útil, mientras que la reactiva es la energía que oscila en la red.",
        eqs: {
            p_m: { n: "Potencia Activa (W)", f_txt: "P = U · I · cos φ", v: {U:220, I:0, cos:0.85}, f: d => d.U * d.I * d.cos },
            s_m: { n: "Potencia Aparente (VA)", f_txt: "S = U · I", v: {U:220, I:0}, f: d => d.U * d.I },
            q_m: { n: "Potencia Reactiva (VAr)", f_txt: "Q = U · I · sen φ", v: {U:220, I:0, sen:0.53}, f: d => d.U * d.I * d.sen }
        }
    },
    tri: {
        desc: "<b>Sistemas Trifásicos (380V):</b> En estos cálculos se introduce la raíz cuadrada de 3 (1.732) para compensar el desfase entre las tres fases. Es la base técnica para instalaciones industriales.",
        eqs: {
            p_t: { n: "Potencia Activa (W)", f_txt: "P = √3 · U · I · cos φ", v: {U:380, I:0, cos:0.85}, f: d => 1.732 * d.U * d.I * d.cos },
            s_t: { n: "Potencia Aparente (VA)", f_txt: "S = √3 · U · I", v: {U:380, I:0}, f: d => 1.732 * d.U * d.I },
            q_t: { n: "Potencia Reactiva (VAr)", f_txt: "Q = √3 · U · I · sen φ", v: {U:380, I:0, sen:0.53}, f: d => 1.732 * d.U * d.I * d.sen }
        }
    },
    mot: {
        desc: "<b>Cálculo de Motores:</b> Permite determinar la corriente necesaria basándose en la potencia del eje (P). Es vital considerar el rendimiento (η) para cubrir las pérdidas mecánicas y magnéticas.",
        eqs: {
            i_mm: { n: "I Motor Mono [A]", f_txt: "I = P / (U · η · cos φ)", v: {P:1500, U:220, n:0.85, cos:0.8}, f: d => d.P / (d.U * d.n * d.cos) },
            i_mt: { n: "I Motor Trif [A]", f_txt: "I = P / (√3 · U · η · cos φ)", v: {P:5500, U:380, n:0.88, cos:0.82}, f: d => d.P / (1.732 * d.U * d.n * d.cos) }
        }
    },
    cap: {
        desc: "<b>Corrección del Factor de Potencia:</b> Calcula la capacidad en µF para compensar la energía reactiva inductiva. Se busca reducir la diferencia entre las tangentes del ángulo original y el deseado.",
        eqs: {
            c_uf: { n: "Capacidad (µF)", f_txt: "C = (P·(tgφ1-tgφ2)·10⁶) / (ω·U²)", v: {P:1000, tg1:0.75, tg2:0.33, U:220}, f: d => (d.P * (d.tg1 - d.tg2) * 1000000) / (314.16 * Math.pow(d.U, 2)) }
        }
    }
};

// --- FUNCIÓN DE NAVEGACIÓN ---
function volverAlMenu() {
    window.location.href = '../index.html#menu';
}

function updateCat(catId) {
    document.querySelectorAll('.category-grid .check-card').forEach(c => c.classList.remove('active'));
    document.getElementById('card-' + catId).classList.add('active');
    
    const subArea = document.getElementById('sub-selectors');
    subArea.innerHTML = '';
    
    const eqKeys = Object.keys(db[catId].eqs);
    eqKeys.forEach((k, idx) => {
        let label = document.createElement('label');
        label.className = 'check-card' + (idx === 0 ? ' active' : '');
        
        let radio = document.createElement('input');
        radio.type = 'radio'; 
        radio.name = 'sub-eq'; 
        radio.value = k;
        
        if(idx === 0) { 
            radio.checked = true; 
            selectedEqId = k; 
        }
        
        label.onclick = () => {
            selectedEqId = k;
            document.querySelectorAll('.sub-category-grid .check-card').forEach(c => c.classList.remove('active'));
            label.classList.add('active');
            renderInputs();
        };
        
        label.appendChild(radio);
        
        let span = document.createElement('span');
        span.innerText = db[catId].eqs[k].n.split(' ')[1] || db[catId].eqs[k].n.substring(0,6);
        
        label.appendChild(span);
        subArea.appendChild(label);
    });
    
    renderInputs();
}

function renderInputs() {
    const cat = document.querySelector('input[name="cat"]:checked').value;
    const eq = db[cat].eqs[selectedEqId];
    
    document.getElementById('formula-info').innerHTML = `${db[cat].desc} <span class="formula-large">${eq.f_txt}</span> <span class="formula-note">* Estilo NGC: Cálculo Preciso.</span>`;
    
    const area = document.getElementById('input-area');
    area.innerHTML = '';
    currentVals = {};
    
    // Ajustar columnas dinámicamente según la cantidad de variables
    const varCount = Object.keys(eq.v).length;
    area.style.gridTemplateColumns = `repeat(${varCount}, 1fr)`;
    
    Object.keys(eq.v).forEach((k, i) => {
        // Si el valor ya existe en el almacén persistente, lo usamos, si no, usamos el por defecto
        if (persistentStore[k] !== undefined) {
            currentVals[k] = persistentStore[k];
        } else {
            currentVals[k] = eq.v[k].toString();
        }
        
        let div = document.createElement('div');
        div.className = 'input-group' + (i === 0 ? ' active' : '');
        div.onclick = () => {
            activeF = k;
            document.querySelectorAll('.input-row .input-group').forEach(x => x.classList.remove('active'));
            div.classList.add('active');
        };
        
        div.innerHTML = `<label>${k.toUpperCase()}</label><div id="v-${k}" class="display-value">${currentVals[k]}</div>`;
        area.appendChild(div);
        
        if(i === 0) activeF = k;
    });
    
    document.getElementById('res-label').innerText = eq.n;
    calc();
}

function press(n) {
    if(currentVals[activeF] === '0') currentVals[activeF] = '';
    
    // Limitar a un número máximo de caracteres para no romper la UI
    if(currentVals[activeF].length < 7) {
        currentVals[activeF] += n;
        persistentStore[activeF] = currentVals[activeF]; // Guardar en persistente
        document.getElementById('v-' + activeF).innerText = currentVals[activeF];
        calc();
    }
}

function del() {
    let val = currentVals[activeF].toString();
    
    if (val.length > 1) {
        currentVals[activeF] = val.slice(0, -1);
    } else {
        currentVals[activeF] = '0';
    }
    
    persistentStore[activeF] = currentVals[activeF]; // Actualizar persistente
    document.getElementById('v-' + activeF).innerText = currentVals[activeF];
    calc();
}

function calc() {
    const cat = document.querySelector('input[name="cat"]:checked').value;
    const d = {};
    Object.keys(currentVals).forEach(k => d[k] = parseFloat(currentVals[k]) || 0);
    
    const res = db[cat].eqs[selectedEqId].f(d);
    document.getElementById('main-result').innerText = isFinite(res) ? res.toFixed(2) : "0.00";
}

function resetAll() { 
    persistentStore = {}; // Limpiar memoria persistente al reiniciar todo
    updateCat('mono'); 
}

// Inicializar la aplicación al cargar
document.addEventListener('DOMContentLoaded', () => {
    updateCat('mono');
});
