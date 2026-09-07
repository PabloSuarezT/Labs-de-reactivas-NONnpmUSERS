import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Threads from './pages/Threads'
import Thread from './pages/Thread'
import { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'

function App() {
  const [toast, setToast] = useState<{ message: string, severity: 'success' | 'error' } | null>(null)

  const handleClose = () => {
    setToast(null)
  }

  return (
    <>
      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={toast?.severity}>
          {toast?.message}
        </Alert>
      </Snackbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Threads setToast={setToast} />} />
          <Route path="/:id" element={<Thread setToast={setToast} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
