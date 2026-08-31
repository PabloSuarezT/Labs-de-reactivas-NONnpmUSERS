import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Post } from '../types/posts'
import PostForm from './PostForm'
import threadsService from '../services/threads' // Importar el servicio

interface ComentarioProps {
  post: Post
  onReply?: (data: { content: string; author?: string; parent?: number }) => void
}

const PostBox = ({ post, onReply }: ComentarioProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isThread = post.thread === null
  const isCurrentThread = isThread && id === String(post.id)
  const [showReplyForm, setShowReplyForm] = useState(false)

  // P6: Estado local reactivo para likes y dislikes
  const [likes, setLikes] = useState(post.likes)
  const [dislikes, setDislikes] = useState(post.dislikes)

  // P6: Handlers para enviar el PUT al servidor y actualizar el estado
  const handleLike = () => {
    const updatedPost = { ...post, likes: likes + 1, dislikes }
    threadsService.update(post.id, updatedPost).then(saved => {
      setLikes(saved.likes)
    })
  }

  const handleDislike = () => {
    const updatedPost = { ...post, likes, dislikes: dislikes + 1 }
    threadsService.update(post.id, updatedPost).then(saved => {
      setDislikes(saved.dislikes)
    })
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <p><strong>Nota escrita por:</strong> {post.author || 'Anónimo'}</p>
      <p><strong>Contenido:</strong> {post.content}</p>
      {post.parent && <p><em>Respondiendo a: #{post.parent}</em></p>}

      {/* P6: Botones de Like / Dislike */}
      <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        <button type="button" onClick={handleLike}>
          👍 {likes}
        </button>
        <button type="button" onClick={handleDislike}>
          👎 {dislikes}
        </button>
      </div>

      {isThread && !isCurrentThread && (
        <button type="button" onClick={() => navigate(`/${post.id}`)}>
          Ver Detalle →
        </button>
      )}

      {onReply && (
        <div style={{ marginTop: '10px' }}>
          <button type="button" onClick={() => setShowReplyForm(!showReplyForm)}>
            {showReplyForm ? 'Cancelar' : 'Responder'}
          </button>
          {showReplyForm && (
            <PostForm
              buttonText="Enviar Respuesta"
              onSubmit={(data) => {
                onReply(data)
                setShowReplyForm(false)
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default PostBox