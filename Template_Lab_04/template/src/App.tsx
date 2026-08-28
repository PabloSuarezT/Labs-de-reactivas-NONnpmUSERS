import { useState, useEffect, type FormEvent } from 'react';
import PostBox from './components/PostBox';
import { getAll, create } from './services/threads';
import type { Post } from './types/posts';

function App() {
  // P2: reemplace este contenido por la página principal, con el listado de
  // threads.
  const [threads, setThreads] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const homePage = () => {
    return 
        <>
            <h1>Listado de Threads:</h1>
            <ul>
              {threads.map((thread) => (
                <li key = {thread.id}>
                  <Threads />
                </li>
              ))}
            </ul>
        </>
    };
  
  // P3: para llegar a la vista detallada de un thread hay que decidir qué
  // página mostrar. Con React Router, el esqueleto queda así:
  //
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Threads />} />
  //       <Route path="/:id" element={<Thread />} />
  //     </Routes>
  //   </BrowserRouter>

  return (
    <div>
      <h1>Pila Completa</h1>
      <p>
        Todavía no hay nada que mostrar. Empiece por el componente de
        publicaciones en
        {' '}
        <code>src/components/PostBox.tsx</code>
        .
      </p>
    </div>
  )
}

export default App
