/** Lógica para manejar la aplicación SPA */

document.addEventListener('DOMContentLoaded', () => {
    loadThreads();
    setupFormHandler();
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

// P5: Configurar envío del formulario vía AJAX a POST /new sin recargar la página
function setupFormHandler() {
    const form = document.getElementById('create-thread-form');
    const authorInput = document.getElementById('author-input');
    const contentInput = document.getElementById('content-input');

    [authorInput, contentInput].forEach(element => {
        if (element) {
            element.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = this.scrollHeight + 'px';
            });
        }
    });

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');

        const autor = authorInput ? authorInput.value.trim() : '';
        const contenido = contentInput ? contentInput.value.trim() : '';

        if (!autor || !contenido) {
            showFeedback('Por favor completa todos los campos.', 'error');
            return;
        }

        try {
            if (submitBtn) submitBtn.disabled = true;

            const response = await fetch('/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ autor, contenido })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al guardar el thread');
            }

            const newThread = await response.json();

            // Agregar el nuevo thread al listado dinámicamente sin recargar la página
            prependThread(newThread);

            // Limpiar formulario y dar retroalimentación
            if (authorInput) {
                authorInput.value = '';
                authorInput.style.height = 'auto';
            }
            if (contentInput) {
                contentInput.value = '';
                contentInput.style.height = 'auto';
            }
            showFeedback('¡Thread publicado exitosamente!', 'success');

        } catch (error) {
            console.error('Error al crear thread:', error);
            showFeedback(error.message || 'No se pudo publicar el thread.', 'error');
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// Agregar thread al inicio de la lista
function prependThread(thread) {
    const tbody = document.getElementById('threads-tbody');
    const emptyState = document.getElementById('empty-state');
    const table = document.getElementById('threads-table');

    if (emptyState) emptyState.classList.add('hidden');
    if (table) table.classList.remove('hidden');

    if (tbody) {
        const currentCount = tbody.children.length + 1;
        const threadHTML = createThreadRowHTML(thread, currentCount);
        tbody.insertAdjacentHTML('afterbegin', threadHTML);
        updateRowNumbers();
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

function updateRowNumbers() {
    const rows = document.querySelectorAll('#threads-tbody tr');
    rows.forEach((row, index) => {
        const numCell = row.querySelector('.row-num');
        if (numCell) numCell.textContent = index + 1;
    });
}

function showFeedback(message, type) {
    const feedback = document.getElementById('form-feedback');
    if (!feedback) return;

    feedback.textContent = message;
    feedback.className = `feedback-msg ${type}`;
    
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 3500);
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