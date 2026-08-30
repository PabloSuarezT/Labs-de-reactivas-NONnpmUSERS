// P1: componente que renderiza un thread o un comentario.
//
// Recibe por props el contenido y el autor. Si el autor viene vacío, muestra
// "Anónimo". Si el comentario responde a otro, recibe además el id del
// respondido y lo muestra; si no responde a nadie, no muestra nada.
import type { Post } from '../types/posts'
import { useNavigate, useParams } from 'react-router-dom'

interface ComentarioProps {
  post: Post
};

const PostBox = ({ post }: ComentarioProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isThread = post.thread === null
  const isCurrentThread = isThread && id === String(post.id)

  return (
    <div>
      <p>
        Nota escrita por: {post.author ? post.author : 'Anónimo'}
      </p>
      <p>Contenido: {post.content}</p>
      {post.parent ? <p>Respondiendo a: {post.parent}</p> : null}
      {isThread && !isCurrentThread ? (
        <button type="button" onClick={() => navigate(`/${post.id}`)}>
          Ver Detalle →
        </button>
      ) : null}
    </div>
  )
 };

export default PostBox;

// P6: muestre la cantidad de likes y dislikes, con un botón para cada uno. El
// número debe cambiar sin recargar la página, así que conviene guardarlo en el
// estado del componente además de mandarlo al servidor.
//
// import type { Post } from '../types/posts'
//
// interface PostBoxProps {
//   ...
// }
//
// const PostBox = ({ ... }: PostBoxProps) => { ... }
//
// export default PostBox
