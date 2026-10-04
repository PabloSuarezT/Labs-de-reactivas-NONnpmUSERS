import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import type { User } from '../types/users'

interface TopBarProps {
  user: User | null
  setUser: (user: User | null) => void
}

// TODO (P6): con sesión, mostrar un botón para cerrarla (usando setUser)
// en lugar de los enlaces de login y registro.
function TopBar({ user }: TopBarProps) {
  return (
    <Stack direction="row" p={1} gap={2} alignItems="center">
      <Typography>{user ? user.username : 'Invitado'}</Typography>
      <Button sx={{ p: 0 }} component={Link} to="/login">Login</Button>
      <Button sx={{ p: 0 }} component={Link} to="/register">Register</Button>
    </Stack>
  )
}

export default TopBar
