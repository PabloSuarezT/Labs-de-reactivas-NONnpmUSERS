// P5: formulario para publicar.
//
// Pide contenido y, de forma opcional, un autor. Quien lo usa decide qué hacer
// al enviarlo: en la página principal crea un thread, y en la vista detallada
// crea un comentario. Conviene entonces recibir esa acción por props en vez de
// llamar al servidor desde acá.
//
// El mismo componente sirve para el formulario desplegable de respuesta, que
// además manda el id del comentario al que responde.
//
// interface PostFormProps {
//   onSubmit: (data: { content: string, author?: string, parent?: number }) => void
//   ...
// }
//
// const PostForm = ({ ... }: PostFormProps) => { ... }

import { useState } from 'react'

interface PostFormProps {
  onSubmit: (data: { content: string, author?: string, parent?: number }) => void
  buttonText?: string
}

const PostForm = ({ onSubmit, buttonText = 'Publicar' }: PostFormProps) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    onSubmit({ content, author: author || undefined })
    setContent('')
    setAuthor('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Autor"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <input
        placeholder="Comentario"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default PostForm
