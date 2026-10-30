import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import type { User } from '../types/users'
import loginService from '../services/login'

interface TopBarProps {
  user: User | null
  setUser: (user: User | null) => void
}

function TopBar({ user, setUser }: TopBarProps) {
  return (
    <Stack direction="row" p={1} gap={2} alignItems="center">
      <Typography>{user ? user.username : 'Invitado'}</Typography>
      {user
        ? <Button sx={{ p: 0 }} onClick={() => loginService.logout().then(() => setUser(null))}>Logout</Button>
        : (
            <>
              <Button sx={{ p: 0 }} component={Link} to="/login">Login</Button>
              <Button sx={{ p: 0 }} component={Link} to="/register">Register</Button>
            </>
          )}
    </Stack>
  )
}

export default TopBar
