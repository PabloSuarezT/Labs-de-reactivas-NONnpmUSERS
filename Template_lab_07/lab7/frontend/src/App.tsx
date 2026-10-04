import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Threads from './pages/Threads'
import Thread from './pages/Thread'
import Login from './pages/Login'
import Register from './pages/Register'
import { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import type { User } from './types/users'

function App() {
  const [toast, setToast] = useState<{ message: string, severity: 'success' | 'error' } | null>(null)
  const [user, setUser] = useState<User | null>(null)

  // TODO (P6): restaurar la sesión al montar la aplicación.

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
          <Route path="/threads" element={<Threads setToast={setToast} user={user} setUser={setUser} />} />
          <Route path="/threads/:id" element={<Thread setToast={setToast} user={user} setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/threads" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
