// P2: página principal, con el listado de threads.
//
// Pide los threads al servidor con el módulo de servicios y los renderiza con
// el componente de P1. Recuerde que la llamada al servidor va dentro de un
// `useEffect` y su resultado en el estado del componente.
//

import { useEffect, useState } from 'react'
import type { Post } from '../types/posts'
import PostBox from '../components/PostBox'
import threadsService from '../services/threads'

const Threads = () => {
    const [threads, setThreads] = useState<Post[]>([])

    useEffect(() => {
        threadsService.getAll().then((data) => {
            setThreads(data)
        })
    }, [])

    return (
        <>
          <h1>Listado de Threads: </h1>
          <ul>
            {threads.map((thread) =>(
                <li key = {thread.id}>
                    <PostBox post={thread}/>
                </li>
            ))}
          </ul> 
        </>
    )
}


// P5: agregue el formulario al principio de la página. Aquí crea un thread.


export default Threads