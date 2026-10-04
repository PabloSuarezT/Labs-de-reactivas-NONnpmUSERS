import { Box, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import type { Post } from '../types/posts'
import { Comment, Forum, PushPin, Reply, ThumbDown, ThumbUp } from '@mui/icons-material'
import { useState } from 'react'
import threads from '../services/threads'
import { Link, useNavigate } from 'react-router-dom'

interface PostBoxProps {
  post: Post
  action: 'forward' | 'reply'
  setToast: (toast: { message: string, severity: 'success' | 'error' } | null) => void
  onReply?: (postId: number) => void
}

// Helper function to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(dateString).toLocaleString('en-US', options)
}

const PostBox = ({ post, action, setToast, onReply }: PostBoxProps) => {
  const navigate = useNavigate()
  const isThread = post.thread === null

  const [{ likes, dislikes }, setLikesDislikes] = useState({ likes: post.likes, dislikes: post.dislikes })

  const handleForward = () => {
    navigate(post.id.toString())
  }

  const handleReply = () => {
    if (onReply) {
      onReply(post.id)
    }
  }

  return (
    <Card
      sx={{
        backgroundColor: isThread ? '#f0e0d6' : '#f7ede6',
        border: '1px solid #d9bfb0',
        borderRadius: '4px',
        marginBottom: 2,
      }}
    >
      <CardHeader
        sx={{
          'backgroundColor': isThread ? '#d9bfb0' : '#e8d8c8',
          'padding': '4px 12px',
          '& .MuiCardHeader-content': {
            overflow: 'hidden',
          },
        }}
        avatar={(
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#555' }}>
            {isThread ? <PushPin fontSize="small" /> : <Comment fontSize="small" />}
          </Box>
        )}
        title={(
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 'bold', color: '#800000' }}
          >
            {post.author || 'Anonymous'}
          </Typography>
        )}
        subheader={(
          <Typography variant="caption" sx={{ color: '#4f4f4f' }}>
            {`No. ${post.id} · ${formatDate(post.createdAt)}`}
            {post.parent && (
              <Link to={{ hash: `#${post.parent}` }} style={{ color: '#d63333', textDecoration: 'none' }}>
                {' '}
                &gt;&gt;
                {post.parent}
              </Link>
            )}
          </Typography>
        )}
        action={(
          <IconButton onClick={action === 'forward' ? handleForward : handleReply}>
            {action === 'forward' ? <Forum /> : <Reply />}
          </IconButton>
        )}
      />
      <CardContent sx={{ padding: '12px' }}>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          {post.content}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ justifyContent: 'flex-end' }}
      >
        <IconButton
          size="small"
          aria-label="like post"
          onClick={() => {
            const newLikes = likes + 1
            threads.update(post.id, { ...post, likes: newLikes })
              .then(() => setLikesDislikes({ likes: newLikes, dislikes }))
              .then(() => setToast({ message: 'Me gusta registrado', severity: 'success' }))
              .catch((error: Error) => setToast({ message: `Error al registrar el me gusta: ${error.message}`, severity: 'error' }))
          }}
        >
          <ThumbUp fontSize="small" />
        </IconButton>
        <Typography variant="caption" sx={{ marginRight: 1 }}>
          {likes}
        </Typography>
        <IconButton
          size="small"
          aria-label="dislike post"
          onClick={() => {
            const newDislikes = dislikes + 1
            threads.update(post.id, { ...post, dislikes: newDislikes })
              .then(() => setLikesDislikes({ likes, dislikes: newDislikes }))
              .then(() => setToast({ message: 'No me gusta registrado', severity: 'success' }))
              .catch(error => setToast({ message: `Error al registrar el no me gusta: ${error.message}`, severity: 'error' }))
          }}
        >
          <ThumbDown fontSize="small" />
        </IconButton>
        <Typography variant="caption">
          {dislikes}
        </Typography>
      </CardActions>
    </Card>
  )
}

export default PostBox
