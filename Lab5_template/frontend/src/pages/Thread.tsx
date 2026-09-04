import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import type { Post } from '../types/posts'
import threads from '../services/threads'
import { useParams } from 'react-router-dom'
import PostForm from '../components/PostForm'
import PostBox from '../components/PostBox'

interface ThreadProps {
  setToast: (toast: { message: string, severity: 'success' | 'error' } | null) => void
}

function Thread({ setToast }: ThreadProps) {
  const { id } = useParams()
  const [comments, setComments] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [replyToPostId, setReplyToPostId] = useState<number | null>(null)

  useEffect(() => {
    if (id) {
      threads.getThread(id)
        .then(thread => setComments([thread.thread, ...thread.comments]))
        .then(() => setLoading(false))
    }
  }, [])

  const handleReplyClick = (postId: number) => {
    setReplyToPostId(replyToPostId === postId ? null : postId)
  }

  const handleReplySubmit = (data: { content: string, parent?: number, author?: string }) => {
    return threads.createComment(data, Number(id))
      .then((comment) => {
        setComments(comments.concat(comment))
        setReplyToPostId(null)
        setToast({ message: 'Comentario creado exitosamente', severity: 'success' })
      })
      .catch((error: Error) => setToast({ message: `Error al crear el comentario: ${error.message}`, severity: 'error' }))
  }

  if (!id) return null

  return (
    <Box sx={{ backgroundColor: '#fffaf6', padding: 2 }}>
      <Typography variant="h2" gutterBottom>Pila Completa</Typography>
      <Typography variant="subtitle1" mb={2}>
        {'Han creado '}
        {loading ? <CircularProgress disableShrink size="1rem" /> : comments.length - 1}
        {' comentarios!'}
      </Typography>
      <Box mb={4}>
        <PostForm onSubmit={data =>
          threads.createComment(data, Number(id))
            .then(comment => setComments(comments.concat(comment)))
            .then(() => setToast({ message: 'Comentario creado exitosamente', severity: 'success' }))
            .catch((error: Error) => setToast({ message: `Error al crear el comentario: ${error.message}`, severity: 'error' }))}
        />
      </Box>
      {comments.map(comment => (
        <>
          <Paper elevation={4} sx={{ ml: comment.thread === null ? 0 : { xs: 2, sm: 4 } }}>
            <PostBox
              post={comment}
              action="reply"
              setToast={setToast}
              onReply={() => handleReplyClick(comment.id)}
            />
          </Paper>
          {replyToPostId === comment.id && (
            <Box mt={2} mb={4} sx={{ ml: { xs: 4, sm: 6 } }}>
              <PostForm
                onSubmit={handleReplySubmit}
                onCancel={() => setReplyToPostId(null)}
                parentId={comment.id}
              />
            </Box>
          )}
        </>

      ))}
    </Box>
  )
}
export default Thread
