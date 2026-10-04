import axios from 'axios'

type UserData = {
  username: string
  email: string
  password: string
}

const create = (data: UserData) => {
  return axios.post('/api/users', data).then(response => response.data)
}

export default {
  create,
}
