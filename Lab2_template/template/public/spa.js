/** Lógica para manejar la aplicación SPA */

document.addEventListener('DOMContentLoaded', () => {
    loadThreads();
});

// P3: Cargar hilos mediante GET /data.json sin recargar la página
async function loadThreads() {
    const spinner = document.getElementById('loading-spinner');
    const tbody = document.getElementById('threads-tbody');
    const emptyState = document.getElementById('empty-state');
    const table = document.getElementById('threads-table');

    try {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const threads = await response.json();
        
        if (spinner) spinner.classList.add('hidden');
        
        if (!threads || threads.length === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            if (table) table.classList.add('hidden');
            if (tbody) tbody.innerHTML = '';
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');
        if (table) table.classList.remove('hidden');
        
        renderThreadsList(threads);
    } catch (error) {
        console.error('Error al obtener los threads:', error);
        if (spinner) spinner.classList.add('hidden');
        if (emptyState) {
            emptyState.classList.remove('hidden');
            emptyState.innerHTML = `<p style="color: #f87171;">Ocurrió un error al cargar los threads. Revisa la consola o recarga.</p>`;
        }
    }
}

function renderThreadsList(threads) {
    const tbody = document.getElementById('threads-tbody');
    if (!tbody) return;

    tbody.innerHTML = threads.map((thread, index) => createThreadRowHTML(thread, index + 1)).join('');
}

function createThreadRowHTML(thread, rowNum) {
    const author = thread.autor || thread.author || 'Anónimo';
    const content = thread.contenido || thread.content || '';
    const dateRaw = thread.createdAt || thread.createAt || thread.date;
    const dateFormatted = dateRaw 
        ? new Date(dateRaw).toLocaleString('es-CL', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })
        : 'Fecha desconocida';

    return `
        <tr data-id="${thread._id || ''}">
            <td class="row-num">${rowNum}</td>
            <td class="author-col">${escapeHTML(author)}</td>
            <td class="content-col">${escapeHTML(content)}</td>
            <td class="date-col">${escapeHTML(dateFormatted)}</td>
        </tr>
    `;
}

function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}