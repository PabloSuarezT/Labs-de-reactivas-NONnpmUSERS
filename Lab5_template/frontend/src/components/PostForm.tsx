import { Box, Button, Stack, TextField } from '@mui/material'
import { brown } from '@mui/material/colors'
import { useState } from 'react'

interface PostFormProps {
  onSubmit: (data: { content: string, author?: string, parent?: number }) => void
  onCancel?: () => void
  parentId?: number
}

function PostForm({ parentId, onSubmit, onCancel }: PostFormProps) {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) {
      setError('Content is required.')
      return
    }
    onSubmit({ content, author: author.trim(), parent: parentId })
    setContent('')
    setAuthor('')
    setError('')
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        border: '1px solid #d9bfb0',
        borderRadius: '4px',
        backgroundColor: '#f7ede6',
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Name (Optional)"
          variant="outlined"
          size="small"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <TextField
          label="Comment"
          variant="outlined"
          multiline
          rows={4}
          required
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          error={!!error}
          helperText={error}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          {onCancel && (
            <Button onClick={onCancel} variant="contained" size="small" sx={{ bgcolor: brown[300], color: 'white' }}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" size="small" sx={{ bgcolor: brown[300], color: 'white' }}>
            Post
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default PostForm
