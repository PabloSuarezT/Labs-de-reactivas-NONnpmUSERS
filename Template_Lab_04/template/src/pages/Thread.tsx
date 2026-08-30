// P3: vista detallada de un thread, con el thread y su listado de comentarios.

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Post } from '../types/posts'
import PostBox from '../components/PostBox'
import PostForm from '../components/PostForm'
import threadsService from '../services/threads'

const Thread = () => {
  const { id } = useParams()
  const [thread, setThread] = useState<Post | null>(null)
  const [comments, setComments] = useState<Post[]>([])

  useEffect(() => {
    if (!id) return

    threadsService.getThread(id).then((data) => {
      setThread(data.thread)
      setComments(data.comments)
    })
  }, [id])

  const handleCreateComment = (data: { content: string, author?: string, parent?: number }) => {
    if (!id) return

    threadsService.createComment(data, Number(id)).then((newComment) => {
      setComments(prevComments => [...prevComments, newComment])
    })
  }

  if (!thread) {
    return <p>Cargando...</p>
  }

  return (
    <>
      <PostBox post={thread} />
      <h2>Crear un nuevo comentario</h2>
      <PostForm buttonText="Crear Comentario" onSubmit={handleCreateComment} />
      <h2>Comentarios</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <PostBox post={comment} onReply={data => handleCreateComment({ ...data, parent: comment.id })} />
          </li>
        ))}
      </ul>
    </>
  )
}

// El id del thread viene de la ruta. Con React Router se obtiene con
// `useParams`; si resuelve la navegación de otra forma, tendrá que recibirlo
// por props.
//
// P5: agregue el formulario al principio, que aquí crea un comentario, y el
// formulario desplegable de respuesta debajo de cada comentario.
//
// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import type { Post } from '../types/posts'
// import threadsService from '../services/threads'
//
// const Thread = () => { ... }
//
export default Thread
