import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import threadsService from '../services/threads'
import type { Post } from '../types/posts'
import PostBox from '../components/PostBox'
import PostForm from '../components/PostForm'

interface ThreadsProps {
  setToast: (toast: { message: string, severity: 'success' | 'error' } | null) => void
}

function Threads({ setToast }: ThreadsProps) {
  const [threads, setThreads] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    threadsService.getAll()
      .then(threads => setThreads(threads))
      .then(() => setLoading(false))
  }, [])

  const reversed = threads.slice().reverse()

  return (
    <Box sx={{ backgroundColor: '#fffaf6', padding: 2 }}>
      <Typography variant="h2" gutterBottom>Pila Completa</Typography>
      <Typography variant="subtitle1" mb={2}>
        {'Han creado '}
        {loading ? <CircularProgress disableShrink size="1rem" /> : threads.length}
        {' threads!'}
      </Typography>
      <Box mb={4}>
        <Typography variant="subtitle1">¿Crear uno nuevo?</Typography>
        <PostForm onSubmit={data =>
          threadsService.create(data)
            .then(thread => setThreads(threads.concat(thread)))
            .then(() => setToast({ message: 'Thread creado exitosamente', severity: 'success' }))
            .catch((error: Error) => setToast({ message: `Error al crear el thread: ${error.message}`, severity: 'error' }))}
        />
      </Box>
      {reversed.map(thread => (
        <Paper elevation={4}>
          <PostBox post={thread} action="forward" setToast={setToast} />
        </Paper>
      ))}
    </Box>
  )
}

export default Threads
