import axios from 'axios'

const axiosSecure = axios.create({ withCredentials: true })

axiosSecure.interceptors.request.use((config) => {
  const csrfToken = localStorage.getItem('csrfToken')
  if (csrfToken) config.headers['X-CSRF-Token'] = csrfToken
  return config
})

export default axiosSecure