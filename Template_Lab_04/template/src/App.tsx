import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Threads from './pages/Threads'
import Thread from './pages/Thread'
//import newCommentForm from './components/PostForm'   -> Para poder importar después el formulario para la P5

function App() {
  // P2: reemplace este contenido por la página principal, con el listado de
  // threads.

  // P3: para llegar a la vista detallada de un thread hay que decidir qué
  // página mostrar. Con React Router, el esqueleto queda así:
  //
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/threads" replace />} />
        <Route path="/threads" element={<Threads />} />
        <Route path="/threads/:id" element={<Thread />} />
      </Routes>
    </BrowserRouter>

  // return (
    // <Threads/>
    // <>
    //   <div>
    //     <h1>Pila Completa</h1>
    //     <p>
    //       Todavía no hay nada que mostrar. Empiece por el componente de
    //       publicaciones en {' '}
    //       <code>src/components/PostBox.tsx</code>.
    //     </p>
    //   </div>
    // </>
  )
}

export default App
