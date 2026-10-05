import axios from 'axios'
import axiosSecure from '../utils/axiosSecure'

const login = async (credentials: { username: string, password: string }) => {
  const response = await axios.post('/api/login', credentials)
  const csrfToken = response.headers['x-csrf-token']
  if (csrfToken) localStorage.setItem('csrfToken', csrfToken)
  return response.data
}

const restoreLogin = async () => {
  try {
    const response = await axiosSecure.get('/api/login/me')
    return response.data
  } catch {
    return null
  }
}

const logout = async () => {
  await axios.post('/api/login/logout')
  localStorage.removeItem('csrfToken')
}

export default { login, restoreLogin, logout }