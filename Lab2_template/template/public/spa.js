// Function helper para renderizar un nodo de Thread
function createThreadNode(thread) {
  const card = document.createElement('article');
  card.className = 'thread-card';

  const header = document.createElement('header');
  header.className = 'thread-header';

  const author = document.createElement('strong');
  author.textContent = thread.autor;

  const dateSpan = document.createElement('span');
  dateSpan.className = 'thread-date';
  
  // Soporta createAt o createdAt según la definición del modelo
  const rawDate = thread.createAt || thread.createdAt;
  dateSpan.textContent = rawDate ? new Date(rawDate).toLocaleString() : '';

  header.appendChild(author);
  header.appendChild(dateSpan);

  const body = document.createElement('p');
  body.className = 'thread-body';
  body.textContent = thread.contenido;

  card.appendChild(header);
  card.appendChild(body);

  return card;
}

// P3: Solicitud AJAX a /data.json para obtener y renderizar los hilos
function loadThreads() {
  const container = document.getElementById('threads-container');
  const xhr = new XMLHttpRequest();

  xhr.open('GET', '/data.json', true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const threads = JSON.parse(xhr.responseText);
          container.innerHTML = ''; // Limpiar loader

          if (threads.length === 0) {
            container.innerHTML = '<p>No hay hilos disponibles aún.</p>';
            return;
          }

          threads.forEach(function (thread) {
            const threadElement = createThreadNode(thread);
            container.appendChild(threadElement);
          });
        } catch (e) {
          console.error('Error parseando JSON:', e);
          container.innerHTML = '<p>Error al procesar los datos.</p>';
        }
      } else {
        console.error('Error en la petición:', xhr.status);
        container.innerHTML = '<p>Error al cargar los hilos desde el servidor.</p>';
      }
    }
  };

  xhr.send();
}

// P5: Interceptar el envío del formulario y publicar vía POST /new por AJAX
function setupFormHandler() {
  const form = document.getElementById('thread-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Previene la recarga tradicional de la página

    const autorInput = document.getElementById('autor');
    const contenidoInput = document.getElementById('contenido');

    const newThreadData = {
      autor: autorInput.value.trim(),
      contenido: contenidoInput.value.trim()
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/new', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 201 || xhr.status === 200) {
          const createdThread = JSON.parse(xhr.responseText);

          const container = document.getElementById('threads-container');
          
          // Si había un mensaje de "No hay hilos", lo limpiamos
          const emptyMsg = document.getElementById('empty-msg');
          if (emptyMsg) {
            container.innerHTML = '';
          }

          // Crear nodo HTML y agregarlo al principio de la lista sin recargar
          const threadNode = createThreadNode(createdThread);
          container.insertBefore(threadNode, container.firstChild);

          // Limpiar el formulario
          form.reset();
        } else {
          alert('Ocurrió un error al guardar el hilo.');
        }
      }
    };

    xhr.send(JSON.stringify(newThreadData));
  });
}

// Inicializar la SPA al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  loadThreads();
  setupFormHandler();
});