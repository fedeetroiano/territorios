// Estado de la Aplicación (Sincronizado con LocalStorage)
let appState = {
    conductores: [],
    territorios: [],
    ajustes: {
        horaM: '10:00',
        horaT: '16:30',
        zoomLluvia: '',
        zoomMiercoles: 'ZOOM'
    },
    ultimoGenerado: null,
    historial: []
};

// Cargar estado de LocalStorage
function loadState() {
    const saved = localStorage.getItem('territoriosAppState');
    if (saved) {
        appState = JSON.parse(saved);
        // Migraciones básicas por si faltan datos en versiones previas
        if (!appState.ajustes) {
            appState.ajustes = { horaM: '10:00', horaT: '16:30', zoomLluvia: '', zoomMiercoles: 'ZOOM' };
        }
        if (!appState.historial) {
            appState.historial = [];
        }
    } else {
        // Datos de ejemplo por defecto
        appState.conductores = [
            { id: 1, nombre: 'Lucas Saravia', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: true }, ultimaAsignacion: 0 },
            { id: 2, nombre: 'Benja Zambelli', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 3, nombre: 'Daniel Bustamante', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 4, nombre: 'Alex Villagran', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 5, nombre: 'Taiel Sanchez', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: true, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 6, nombre: 'Federico Troiano', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 7, nombre: 'Joel Jhonston', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: true, vieM: false, vieT: true, sabT: true }, ultimaAsignacion: 0 },
            { id: 8, nombre: 'Alberto Torchia', disp: { marM: true, marT: false, mieM: false, jueM: false, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 9, nombre: 'Rodolfo Morales', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 10, nombre: 'Martin Meza', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: false, vieM: false, vieT: false, sabT: true }, ultimaAsignacion: 0 },
            { id: 11, nombre: 'Matias Sicobiche', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: true, vieM: false, vieT: false, sabT: true }, ultimaAsignacion: 0 },
            { id: 12, nombre: 'Rolando Arnedo', disp: { marM: false, marT: false, mieM: true, jueM: false, jueT: false, vieM: false, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 13, nombre: 'Juan Moreno', disp: { marM: true, marT: false, mieM: false, jueM: true, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 14, nombre: 'Miguel Arnedo', disp: { marM: false, marT: false, mieM: false, jueM: true, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 15, nombre: 'Marcos Guevara', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: true, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 16, nombre: 'Luis Vigolo', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: true, vieM: false, vieT: false, sabT: false }, ultimaAsignacion: 0 }
        ];
        appState.territorios = [
            { id: 1, encuentro: 'Friuli y Fortunato de la Plz', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 5, encuentro: 'De los inmigrantes y Calabria', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 11, encuentro: 'Udine y Genova', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 12, encuentro: 'Friuli y Genova', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 14, encuentro: 'Castex y Calabria', noVisitar: 'Sicilia esquina Friuli, rejas gris', activo: true, ultimoTurno: null },
            { id: 15, encuentro: 'Dolores y calabria', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 17, encuentro: 'Gonzalez Chavez y Calabria', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 19, encuentro: 'G. Chavez y Napoles', noVisitar: 'lebensonh 6629, Villar 2166', activo: true, ultimoTurno: null },
            { id: 21, encuentro: 'Napoles y Juana Manso', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 22, encuentro: 'Napoles y Juana Manso', noVisitar: 'genova 6312, j manso 2482\nF. Sanchez 2554', activo: true, ultimoTurno: null },
            { id: 23, encuentro: 'Napoles y Juana Manso', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 24, encuentro: 'Napoles y Juana Manso', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 25, encuentro: 'Calabria y Villar', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 26, encuentro: 'Calabria y Florencio Sanchez', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 27, encuentro: 'William Morris y Juana Manso', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 30, encuentro: 'Peralta ramos y Garcia Lorca', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 37, encuentro: 'Antartida y Catriel', noVisitar: '', activo: true, ultimoTurno: null }
        ];
        saveState();
    }

    // Si detectamos conductores con nombres viejos o faltan los nuevos, actualizamos
    const necesitaActualizar = !appState.conductores.some(c => c.nombre === 'Luis Vigolo') || appState.conductores.length < 16;
    if (necesitaActualizar) {
        appState.conductores = [
            { id: 1, nombre: 'Lucas Saravia', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: true }, ultimaAsignacion: 0 },
            { id: 2, nombre: 'Benja Zambelli', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 3, nombre: 'Daniel Bustamante', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 4, nombre: 'Alex Villagran', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 5, nombre: 'Taiel Sanchez', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: true, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 6, nombre: 'Federico Troiano', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: false, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 7, nombre: 'Joel Jhonston', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: true, vieM: false, vieT: true, sabT: true }, ultimaAsignacion: 0 },
            { id: 8, nombre: 'Alberto Torchia', disp: { marM: true, marT: false, mieM: false, jueM: false, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 9, nombre: 'Rodolfo Morales', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 10, nombre: 'Martin Meza', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: false, vieM: false, vieT: false, sabT: true }, ultimaAsignacion: 0 },
            { id: 11, nombre: 'Matias Sicobiche', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: true, vieM: false, vieT: false, sabT: true }, ultimaAsignacion: 0 },
            { id: 12, nombre: 'Rolando Arnedo', disp: { marM: false, marT: false, mieM: true, jueM: false, jueT: false, vieM: false, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 13, nombre: 'Juan Moreno', disp: { marM: true, marT: false, mieM: false, jueM: true, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 14, nombre: 'Miguel Arnedo', disp: { marM: false, marT: false, mieM: false, jueM: true, jueT: false, vieM: true, vieT: false, sabT: false }, ultimaAsignacion: 0 },
            { id: 15, nombre: 'Marcos Guevara', disp: { marM: false, marT: true, mieM: false, jueM: false, jueT: true, vieM: false, vieT: true, sabT: false }, ultimaAsignacion: 0 },
            { id: 16, nombre: 'Luis Vigolo', disp: { marM: false, marT: false, mieM: false, jueM: false, jueT: true, vieM: false, vieT: false, sabT: false }, ultimaAsignacion: 0 }
        ];
        saveState();
    }

    // Migración/actualización de territorios si cambian o agregamos noVisitar
    const necesitaActualizarTerritorios = !appState.territorios.some(t => t.id === 1) || !appState.territorios.some(t => t.id === 4) || appState.territorios.length < 22;
    if (necesitaActualizarTerritorios) {
        appState.territorios = [
            { id: 1, encuentro: 'Friuli y Fortunato de la Plz', noVisitar: 'Gaudini 1972', activo: true, ultimoTurno: null },
            { id: 4, encuentro: '', noVisitar: 'Calabria 8045, magnasco 2496', activo: false, ultimoTurno: null },
            { id: 5, encuentro: 'De los inmigrantes y Calabria', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 7, encuentro: '', noVisitar: 'de los inmigrantes 2684', activo: false, ultimoTurno: null },
            { id: 8, encuentro: '', noVisitar: 'Rateriy 3055', activo: false, ultimoTurno: null },
            { id: 9, encuentro: '', noVisitar: 'no visitar. Vidal 2346', activo: false, ultimoTurno: null },
            { id: 11, encuentro: 'Udine y Genova', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 12, encuentro: 'Friuli y Genova', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 14, encuentro: 'Castex y Calabria', noVisitar: 'Sicilia esquina Friuli, rejas gris', activo: true, ultimoTurno: null },
            { id: 15, encuentro: 'Dolores y calabria', noVisitar: 'Calabria 6987', activo: true, ultimoTurno: null },
            { id: 17, encuentro: 'Gonzalez Chavez y Calabria', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 19, encuentro: 'G. Chavez y Napoles', noVisitar: 'lebensohn 6629, Villar 2166', activo: true, ultimoTurno: null },
            { id: 20, encuentro: '', noVisitar: 'Calabria y villar (vivero)', activo: false, ultimoTurno: null },
            { id: 21, encuentro: 'Napoles y Juana Manso', noVisitar: 'Puan 6414', activo: true, ultimoTurno: null },
            { id: 22, encuentro: 'Napoles y Juana Manso', noVisitar: 'genova 6312, j manso 2482\nF. Sanchez 2554', activo: true, ultimoTurno: null },
            { id: 23, encuentro: 'Napoles y Juana Manso', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 24, encuentro: 'Napoles y Juana Manso', noVisitar: 'Nápoles 6242', activo: true, ultimoTurno: null },
            { id: 25, encuentro: 'Calabria y Villar', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 26, encuentro: 'Calabria y Florencio Sanchez', noVisitar: 'Florencio Sanchez 2608 esquina', activo: true, ultimoTurno: null },
            { id: 27, encuentro: 'William Morris y Juana Manso', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 30, encuentro: 'Peralta ramos y Garcia Lorca', noVisitar: '', activo: true, ultimoTurno: null },
            { id: 37, encuentro: 'Antartida y Catriel', noVisitar: '', activo: true, ultimoTurno: null }
        ];
        saveState();
    }
}

function saveState() {
    localStorage.setItem('territoriosAppState', JSON.stringify(appState));
}

// Configuración de Días y Turnos
const estructuraSemana = [
    { diaId: 'mar', nombreDia: 'Martes', turnos: [{ id: 'M', nombre: 'M' }, { id: 'T', nombre: 'T' }] },
    { diaId: 'mie', nombreDia: 'Miércoles', turnos: [{ id: 'M', nombre: 'M', especial: 'Zoom' }] },
    { diaId: 'jue', nombreDia: 'Jueves', turnos: [{ id: 'M', nombre: 'M' }, { id: 'T', nombre: 'T' }] },
    { diaId: 'vie', nombreDia: 'Viernes', turnos: [{ id: 'M', nombre: 'M' }, { id: 'T', nombre: 'T' }] },
    { diaId: 'sab', nombreDia: 'Sábado', turnos: [{ id: 'M', nombre: 'M', especial: 'Grupo' }, { id: 'T', nombre: 'T' }] }
];

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initNavigation();
    initModals();
    renderConductores();
    renderTerritorios();
    renderAjustes();
    renderPlanilla(); // Muestra la última generada si existe

    // Eventos Generales
    document.getElementById('btn-generate').addEventListener('click', generarPlanilla);
    document.getElementById('btn-save-week').addEventListener('click', confirmarSemana);
    document.getElementById('btn-export').addEventListener('click', exportarImagen);
    document.getElementById('btn-print').addEventListener('click', () => window.print());
    document.getElementById('btn-save-horarios').addEventListener('click', saveAjustes);
    document.getElementById('btn-save-zoom').addEventListener('click', saveAjustes);

    // Permitir guardar la fecha cuando se edita manualmente
    document.getElementById('week-date-range').addEventListener('blur', (e) => {
        if (appState.ultimoGenerado) {
            appState.ultimoGenerado.fecha = e.target.innerText;
            saveState();
        }
    });

    // Nueva inicialización del historial
    renderHistorial();
    
    const searchHist = document.getElementById('search-historial');
    if (searchHist) {
        searchHist.addEventListener('input', renderHistorial);
    }

    const btnExportData = document.getElementById('btn-export-data');
    if (btnExportData) {
        btnExportData.addEventListener('click', exportarDatos);
    }

    const inputImportData = document.getElementById('input-import-data');
    if (inputImportData) {
        inputImportData.addEventListener('change', importarDatos);
    }
});

// --- Navegación ---
function initNavigation() {
    const links = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');

    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            link.classList.add('active');
            const targetView = link.getAttribute('data-tab');
            document.getElementById(`view-${targetView}`).classList.add('active');
        });
    });
}

// --- Modales y Formularios ---
function initModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // Conductores
    document.getElementById('btn-add-conductor').addEventListener('click', () => {
        document.getElementById('form-conductor').reset();
        document.getElementById('conductor-id').value = '';
        document.getElementById('modal-conductor-title').innerText = 'Nuevo Conductor';
        document.getElementById('modal-conductor').classList.add('show');
    });

    document.getElementById('form-conductor').addEventListener('submit', (e) => {
        e.preventDefault();
        saveConductor();
    });

    // Territorios
    document.getElementById('btn-add-territorio').addEventListener('click', () => {
        document.getElementById('form-territorio').reset();
        document.getElementById('modal-territorio-title').innerText = 'Nuevo Territorio';
        document.getElementById('modal-territorio').classList.add('show');
    });

    document.getElementById('form-territorio').addEventListener('submit', (e) => {
        e.preventDefault();
        saveTerritorio();
    });
}

// --- Lógica Conductores ---
function renderConductores() {
    const tbody = document.getElementById('conductores-tbody');
    tbody.innerHTML = '';
    appState.conductores.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${c.nombre}</strong></td>
            <td class="text-center">${c.disp.marM ? '✅' : '❌'}</td>
            <td class="text-center">${c.disp.marT ? '✅' : '❌'}</td>
            <td class="text-center">${c.disp.mieM ? '✅' : '❌'}</td>
            <td class="text-center">${c.disp.jueM ? '✅' : '❌'}</td>
            <td class="text-center">${c.disp.jueT ? '✅' : '❌'}</td>
            <td class="text-center">${c.disp.vieM ? '✅' : '❌'}</td>
            <td class="text-center">${c.disp.vieT ? '✅' : '❌'}</td>
            <td class="text-center">${c.disp.sabT ? '✅' : '❌'}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editConductor(${c.id})">Editar</button>
                <button class="btn btn-secondary btn-sm" onclick="deleteConductor(${c.id})" style="color: #dc2626;">Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function saveConductor() {
    const idInput = document.getElementById('conductor-id').value;
    const nombre = document.getElementById('conductor-name').value;
    const disp = {
        marM: document.getElementById('disp-mar-m').checked,
        marT: document.getElementById('disp-mar-t').checked,
        mieM: document.getElementById('disp-mie-m').checked,
        jueM: document.getElementById('disp-jue-m').checked,
        jueT: document.getElementById('disp-jue-t').checked,
        vieM: document.getElementById('disp-vie-m').checked,
        vieT: document.getElementById('disp-vie-t').checked,
        sabT: document.getElementById('disp-sab-t').checked
    };

    if (idInput) {
        // Editar
        const conductor = appState.conductores.find(c => c.id == idInput);
        if (conductor) {
            conductor.nombre = nombre;
            conductor.disp = disp;
        }
    } else {
        // Nuevo
        appState.conductores.push({
            id: Date.now(),
            nombre,
            disp,
            ultimaAsignacion: 0
        });
    }

    saveState();
    renderConductores();
    document.getElementById('modal-conductor').classList.remove('show');
}

window.editConductor = function(id) {
    const c = appState.conductores.find(x => x.id == id);
    if (!c) return;
    document.getElementById('conductor-id').value = c.id;
    document.getElementById('conductor-name').value = c.nombre;
    document.getElementById('disp-mar-m').checked = c.disp.marM;
    document.getElementById('disp-mar-t').checked = c.disp.marT;
    document.getElementById('disp-mie-m').checked = c.disp.mieM;
    document.getElementById('disp-jue-m').checked = c.disp.jueM;
    document.getElementById('disp-jue-t').checked = c.disp.jueT;
    document.getElementById('disp-vie-m').checked = c.disp.vieM;
    document.getElementById('disp-vie-t').checked = c.disp.vieT;
    document.getElementById('disp-sab-t').checked = c.disp.sabT;
    
    document.getElementById('modal-conductor-title').innerText = 'Editar Conductor';
    document.getElementById('modal-conductor').classList.add('show');
}

window.deleteConductor = function(id) {
    if (confirm('¿Seguro que deseas eliminar este conductor?')) {
        appState.conductores = appState.conductores.filter(c => c.id != id);
        saveState();
        renderConductores();
    }
}

// --- Lógica Territorios ---
function renderTerritorios() {
    const tbody = document.getElementById('territorios-tbody');
    tbody.innerHTML = '';
    // Ordenar por ID para visualizar mejor
    const terrs = [...appState.territorios].sort((a,b) => a.id - b.id);
    
    terrs.forEach(t => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${t.id}</strong></td>
            <td>${t.encuentro}</td>
            <td class="text-small text-left">${t.noVisitar || '-'}</td>
            <td><span class="badge ${t.activo ? 'badge-active' : 'badge-inactive'}">${t.activo ? 'Activo' : 'Inactivo'}</span></td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editTerritorio(${t.id})">Editar</button>
                <button class="btn btn-secondary btn-sm" onclick="deleteTerritorio(${t.id})" style="color: #dc2626;">Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function saveTerritorio() {
    const id = parseInt(document.getElementById('territorio-id').value);
    const encuentro = document.getElementById('territorio-encuentro').value;
    const noVisitar = document.getElementById('territorio-novisitar').value;
    const activo = document.getElementById('territorio-activo').checked;

    const existente = appState.territorios.find(t => t.id == id);
    if (existente) {
        existente.encuentro = encuentro;
        existente.noVisitar = noVisitar;
        existente.activo = activo;
    } else {
        appState.territorios.push({ id, encuentro, noVisitar, activo, ultimoTurno: null });
    }

    saveState();
    renderTerritorios();
    document.getElementById('modal-territorio').classList.remove('show');
}

window.editTerritorio = function(id) {
    const t = appState.territorios.find(x => x.id == id);
    if (!t) return;
    document.getElementById('territorio-id').value = t.id;
    document.getElementById('territorio-encuentro').value = t.encuentro;
    document.getElementById('territorio-novisitar').value = t.noVisitar;
    document.getElementById('territorio-activo').checked = t.activo;
    
    document.getElementById('modal-territorio-title').innerText = 'Editar Territorio';
    document.getElementById('modal-territorio').classList.add('show');
}

window.deleteTerritorio = function(id) {
    if (confirm('¿Seguro que deseas eliminar el territorio ' + id + '?')) {
        appState.territorios = appState.territorios.filter(t => t.id != id);
        saveState();
        renderTerritorios();
    }
}

// --- Ajustes ---
function renderAjustes() {
    document.getElementById('setting-hora-m').value = appState.ajustes.horaM || '10:00';
    document.getElementById('setting-hora-t').value = appState.ajustes.horaT || '16:30';
    document.getElementById('setting-zoom-lluvia').value = appState.ajustes.zoomLluvia || '';
    document.getElementById('setting-zoom-miercoles').value = appState.ajustes.zoomMiercoles || 'ZOOM';
}

function saveAjustes() {
    appState.ajustes.horaM = document.getElementById('setting-hora-m').value;
    appState.ajustes.horaT = document.getElementById('setting-hora-t').value;
    appState.ajustes.zoomLluvia = document.getElementById('setting-zoom-lluvia').value;
    appState.ajustes.zoomMiercoles = document.getElementById('setting-zoom-miercoles').value;
    saveState();
    alert('Ajustes guardados correctamente.');
    if (appState.ultimoGenerado) renderPlanilla(); // Actualiza la vista de planilla
}

// --- Generador de Planilla ---

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getUltimaFechaTerritorio(tId) {
    if (!appState.historial || appState.historial.length === 0) return new Date(0);
    const matches = appState.historial.filter(h => h.territorioId == tId);
    if (matches.length === 0) return new Date(0);
    let masReciente = new Date(0);
    matches.forEach(m => {
        const parts = m.fecha.split('/');
        const d = new Date(parts[2], parts[1] - 1, parts[0]);
        if (d > masReciente) masReciente = d;
    });
    return masReciente;
}

function getUltimaFechaConductor(cId) {
    if (!appState.historial || appState.historial.length === 0) return new Date(0);
    const matches = appState.historial.filter(h => h.conductorId == cId);
    if (matches.length === 0) return new Date(0);
    let masReciente = new Date(0);
    matches.forEach(m => {
        const parts = m.fecha.split('/');
        const d = new Date(parts[2], parts[1] - 1, parts[0]);
        if (d > masReciente) masReciente = d;
    });
    return masReciente;
}

function generarPlanilla() {
    // Obtenemos inicio de semana (lunes a domingo)
    const hoy = new Date();
    const dif = hoy.getDay() === 0 ? 6 : hoy.getDay() - 1; // 0 is sunday
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() - dif);
    lunes.setHours(0, 0, 0, 0);
    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6);

    const opcionesMeses = { month: 'short', day: 'numeric' };
    const fechaTexto = `${lunes.toLocaleDateString('es-ES', opcionesMeses)} al ${domingo.toLocaleDateString('es-ES', opcionesMeses)}`;

    let asignaciones = [];
    let terrDisponibles = appState.territorios.filter(t => t.activo);
    
    // Contadores de uso en esta generación para evitar repetir en la misma semana
    let conductoresUsados = {};
    let territoriosUsados = {};

    estructuraSemana.forEach(dia => {
        const totalTurnos = dia.turnos.length;
        dia.turnos.forEach((turno, index) => {
            let row = {
                diaNombre: index === 0 ? dia.nombreDia : '',
                totalTurnos: index === 0 ? totalTurnos : 0,
                hora: turno.id === 'M' ? appState.ajustes.horaM : appState.ajustes.horaT,
                territorioId: '',
                encuentro: '',
                conductorId: '',
                noVisitar: '',
                turnoId: turno.id,
                diaId: dia.diaId
            };

            // Casos especiales
            if (turno.especial === 'Zoom') {
                row.encuentro = appState.ajustes.zoomMiercoles;
                row.territorioId = ''; // Zoom no tiene nro
            } else if (turno.especial === 'Grupo') {
                row.encuentro = 'Salida por grupo';
                row.conductorId = 'N/A';
            } else {
                // Asignar Territorio (si hay)
                // Priorizar los que no se usaron en esta semana
                let candTerrs = terrDisponibles.filter(t => !territoriosUsados[t.id]);
                
                // Priorizar por última fecha de asignación en historial (ascendente)
                candTerrs.sort((a, b) => getUltimaFechaTerritorio(a.id) - getUltimaFechaTerritorio(b.id));

                // Filtrar para evitar repetir el mismo turno consecutivo del territorio
                let candTerrsTurnoOpuesto = candTerrs.filter(t => {
                    // Buscar último registro de este territorio en el historial
                    const ult = [...appState.historial]
                        .reverse()
                        .find(h => h.territorioId == t.id);
                    // Si nunca se usó o el último turno fue distinto al actual, es apto
                    return !ult || ult.turnoId !== turno.id;
                });
                
                // Si al filtrar nos quedamos sin candidatos, volvemos a la lista ordenada completa
                if (candTerrsTurnoOpuesto.length > 0) {
                    candTerrs = candTerrsTurnoOpuesto;
                }

                if (candTerrs.length > 0) {
                    // Tomar de entre los más antiguos (ej: los primeros 4 o el 50% de los más antiguos) al azar
                    const poolSize = Math.min(5, candTerrs.length);
                    const mejores = candTerrs.slice(0, poolSize);
                    const selectedT = mejores[Math.floor(Math.random() * mejores.length)];
                    
                    row.territorioId = selectedT.id;
                    row.encuentro = selectedT.encuentro;
                    row.noVisitar = selectedT.noVisitar;
                    territoriosUsados[selectedT.id] = true;
                }
            }

            // Asignar Conductor (si no es grupo)
            if (turno.especial !== 'Grupo') {
                if (dia.diaId === 'mie' && index > 0) {
                    // Copiar el conductor de la primera fila del miércoles
                    const prevMie = asignaciones.find(a => a.diaId === 'mie');
                    if (prevMie) {
                        row.conductorId = prevMie.conductorId;
                    }
                } else {
                    // Filtramos por disp de este dia/turno
                    const propDisp = `${dia.diaId}${turno.id}`; // ej: marM
                    let candConds = appState.conductores.filter(c => c.disp[propDisp]);
                    
                    // Evitar los que ya salieron esta semana si es posible
                    let noUsadosSemana = candConds.filter(c => !conductoresUsados[c.id]);
                    if (noUsadosSemana.length > 0) candConds = noUsadosSemana;

                    // Ordenar por asignación más lejana en historial
                    candConds.sort((a, b) => getUltimaFechaConductor(a.id) - getUltimaFechaConductor(b.id));

                    if (candConds.length > 0) {
                        // Tomamos algunos de los mejores y elegimos al azar
                        const mejores = candConds.slice(0, 3);
                        const selectedC = mejores[Math.floor(Math.random() * mejores.length)];
                        row.conductorId = selectedC.id;
                        conductoresUsados[selectedC.id] = true;
                    }
                }
            }

            asignaciones.push(row);
        });
    });

    appState.ultimoGenerado = {
        fecha: fechaTexto,
        lunesFecha: lunes.toISOString(),
        asignaciones: asignaciones,
        guardada: false
    };

    saveState();
    renderPlanilla();
}

function renderPlanilla() {
    if (!appState.ultimoGenerado) return;

    document.getElementById('week-date-range').innerText = appState.ultimoGenerado.fecha;
    document.getElementById('lluvia-terris-display').innerText = appState.ajustes.zoomLluvia;

    const tbody = document.getElementById('planilla-tbody');
    tbody.innerHTML = '';

    // Opciones para selects
    let condOptions = `<option value="">-- Seleccionar --</option>`;
    appState.conductores.forEach(c => condOptions += `<option value="${c.id}">${c.nombre}</option>`);

    let terrOptions = `<option value="">-- Seleccionar --</option>`;
    appState.territorios.forEach(t => terrOptions += `<option value="${t.id}">${t.id}</option>`);

    appState.ultimoGenerado.asignaciones.forEach((row, idx) => {
        const tr = document.createElement('tr');
        const rowspan = row.totalTurnos || (row.diaId === 'mie' ? 1 : 2);
        let diaHtml = row.diaNombre ? `<td class="dia-col" rowspan="${rowspan}">${row.diaNombre}</td>` : '';
        
        // Celdas editables interactivas
        let terrHtml = ``;
        if (row.diaId === 'mie') {
            terrHtml = `<input type="text" class="edit-cell input-terr-txt" data-idx="${idx}" value="${row.territorioId}" placeholder="Ej: 1 y 2">`;
        } else if (row.territorioId !== '' || (!row.encuentro.includes('Zoom') && row.conductorId !== 'N/A')) {
            terrHtml = `<select class="edit-cell select-terr" data-idx="${idx}">
                            ${terrOptions.replace(`value="${row.territorioId}"`, `value="${row.territorioId}" selected`)}
                        </select>`;
        } else {
            terrHtml = ``;
        }

        let condHtml = ``;
        if (row.conductorId === 'N/A') {
            condHtml = ``;
        } else {
            condHtml = `<select class="edit-cell select-cond" data-idx="${idx}">
                            ${condOptions.replace(`value="${row.conductorId}"`, `value="${row.conductorId}" selected`)}
                        </select>`;
        }

        tr.innerHTML = `
            ${diaHtml}
            <td><input type="time" class="edit-cell input-hora" data-idx="${idx}" value="${row.hora}"></td>
            <td>${terrHtml}</td>
            <td class="text-left"><div contenteditable="true" class="edit-cell div-encuentro" data-idx="${idx}">${row.encuentro}</div></td>
            <td class="text-left">${condHtml}</td>
            <td class="text-left text-small"><div contenteditable="true" class="edit-cell div-novisitar" data-idx="${idx}">${row.noVisitar}</div></td>
        `;
        tbody.appendChild(tr);
    });

    // Eventos para interactividad
    document.querySelectorAll('.select-terr').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-idx');
            const newTId = e.target.value;
            appState.ultimoGenerado.asignaciones[idx].territorioId = newTId;
            
            // Auto completar encuentro y no visitar si selecciona territorio válido
            if (newTId) {
                const t = appState.territorios.find(x => x.id == newTId);
                if (t) {
                    appState.ultimoGenerado.asignaciones[idx].encuentro = t.encuentro;
                    appState.ultimoGenerado.asignaciones[idx].noVisitar = t.noVisitar;
                }
            }
            saveState();
            renderPlanilla();
        });
    });

    document.querySelectorAll('.select-cond').forEach(sel => {
        sel.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-idx');
            appState.ultimoGenerado.asignaciones[idx].conductorId = e.target.value;
            saveState();
        });
    });
    
    document.querySelectorAll('.input-hora').forEach(inp => {
        inp.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-idx');
            appState.ultimoGenerado.asignaciones[idx].hora = e.target.value;
            saveState();
        });
    });

    document.querySelectorAll('.input-terr-txt').forEach(inp => {
        inp.addEventListener('change', (e) => {
            const idx = e.target.getAttribute('data-idx');
            appState.ultimoGenerado.asignaciones[idx].territorioId = e.target.value;
            saveState();
        });
    });

    document.querySelectorAll('.div-encuentro').forEach(div => {
        div.addEventListener('blur', (e) => {
            const idx = e.target.getAttribute('data-idx');
            appState.ultimoGenerado.asignaciones[idx].encuentro = e.target.innerText.trim();
            saveState();
        });
    });

    document.querySelectorAll('.div-novisitar').forEach(div => {
        div.addEventListener('blur', (e) => {
            const idx = e.target.getAttribute('data-idx');
            appState.ultimoGenerado.asignaciones[idx].noVisitar = e.target.innerText.trim();
            saveState();
        });
    });
}

function exportarImagen() {
    const el = document.getElementById('planilla-capture-area');
    // Forzamos un estilo temporal para la captura
    el.style.background = 'white';
    el.style.padding = '20px';
    
    // Ocultamos bordes, fondo y sombras de inputs para la foto
    const inputs = el.querySelectorAll('input.edit-cell, select.edit-cell, div.edit-cell');
    inputs.forEach(i => {
        i.style.border = 'none';
        i.style.background = 'transparent';
        i.style.boxShadow = 'none';
        i.style.appearance = 'none';
        i.style.webkitAppearance = 'none';
    });

    html2canvas(el, { scale: 2 }).then(canvas => {
        // Restaurar estilos
        inputs.forEach(i => {
            i.style.border = '';
            i.style.background = '';
            i.style.boxShadow = '';
            i.style.appearance = '';
            i.style.webkitAppearance = '';
        });

        const link = document.createElement('a');
        link.download = `Planilla_Territorios_${appState.ultimoGenerado.fecha}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}

function confirmarSemana() {
    if (!appState.ultimoGenerado || !appState.ultimoGenerado.asignaciones) {
        alert("No hay ninguna planilla generada para guardar.");
        return;
    }
    
    if (appState.ultimoGenerado.guardada) {
        if (!confirm("Esta planilla ya ha sido guardada anteriormente. ¿Deseas volver a guardarla? (Esto incrementará nuevamente las estadísticas de asignación).")) {
            return;
        }
    } else {
        if (!confirm("¿Deseas confirmar y guardar esta planilla? Esto registrará las asignaciones en el historial y actualizará las fechas de rotación.")) {
            return;
        }
    }

    const diaOffsets = { mar: 1, mie: 2, jue: 3, vie: 4, sab: 5 };
    const baseLunes = new Date(appState.ultimoGenerado.lunesFecha || new Date());

    // Procesar asignaciones actuales de la planilla
    appState.ultimoGenerado.asignaciones.forEach(row => {
        let offset = diaOffsets[row.diaId] || 0;
        let fechaAsignacion = new Date(baseLunes);
        fechaAsignacion.setDate(baseLunes.getDate() + offset);
        let fechaTexto = fechaAsignacion.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

        let condNombre = 'Salida por grupo';
        if (row.conductorId && row.conductorId !== 'N/A') {
            const cObj = appState.conductores.find(c => c.id == row.conductorId);
            condNombre = cObj ? cObj.nombre : 'Sin asignar';
        }

        // Registrar en el historial
        appState.historial.push({
            id: Date.now() + Math.random(),
            fecha: fechaTexto,
            diaNombre: row.diaNombre || estructuraSemana.find(d => d.diaId === row.diaId).nombreDia,
            turnoId: row.turnoId,
            territorioId: row.territorioId || 'N/A',
            encuentro: row.encuentro,
            conductorId: row.conductorId,
            conductorNombre: condNombre
        });

        // Actualizar último turno de territorio para fallback rápido
        if (row.territorioId) {
            const terr = appState.territorios.find(t => t.id == row.territorioId);
            if (terr) {
                terr.ultimoTurno = row.turnoId;
            }
        }
    });

    appState.ultimoGenerado.guardada = true;
    saveState();
    renderHistorial();
    alert("Planilla guardada y confirmada con éxito. Historial actualizado.");
}

function renderHistorial() {
    const tbody = document.getElementById('historial-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const filterVal = document.getElementById('search-historial').value.toLowerCase();

    // Ordenar historial de más reciente a más antiguo
    const sortedHistorial = [...appState.historial].sort((a, b) => {
        const partsA = a.fecha.split('/');
        const partsB = b.fecha.split('/');
        const dateA = new Date(partsA[2], partsA[1] - 1, partsA[0]);
        const dateB = new Date(partsB[2], partsB[1] - 1, partsB[0]);
        return dateB - dateA;
    });

    sortedHistorial.forEach(h => {
        const matchesFilter = h.conductorNombre.toLowerCase().includes(filterVal) ||
                              String(h.territorioId).toLowerCase().includes(filterVal) ||
                              h.encuentro.toLowerCase().includes(filterVal);
        if (!matchesFilter) return;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${h.fecha}</strong></td>
            <td>${h.diaNombre}</td>
            <td>${h.turnoId}</td>
            <td>${h.territorioId}</td>
            <td>${h.encuentro}</td>
            <td>${h.conductorNombre}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="deleteHistorialItem(${h.id})" style="color: #dc2626;">Borrar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.deleteHistorialItem = function(id) {
    if (confirm('¿Seguro que deseas eliminar este registro del historial?')) {
        appState.historial = appState.historial.filter(h => h.id != id);
        saveState();
        renderHistorial();
    }
}

// --- Importación y Exportación ---
function exportarDatos() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `Copia_Seguridad_Territorios_${new Date().toISOString().slice(0,10)}.json`);
    dlAnchorElem.click();
}

function importarDatos(e) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            const imported = JSON.parse(event.target.result);
            if (imported.conductores && imported.territorios) {
                if (confirm('¿Seguro que deseas importar estos datos? Se sobrescribirá tu lista actual de conductores, territorios e historial.')) {
                    appState = imported;
                    saveState();
                    location.reload();
                }
            } else {
                alert('El archivo no parece ser una copia de seguridad válida.');
            }
        } catch (err) {
            alert('Error al leer el archivo. Asegúrate de que sea un JSON válido.');
        }
    };
    if (e.target.files.length > 0) {
        fileReader.readAsText(e.target.files[0]);
    }
}
