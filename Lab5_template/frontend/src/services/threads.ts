import axios from 'axios'
import type { Post } from '../types/posts'

const baseUrl = `/threads`

const getAll = () => {
  const request = axios.get<Post[]>(`${baseUrl}/`)
  return request.then(response => response.data)
}

interface ThreadAnswer {
  thread: Post
  comments: Post[]
}
const getThread = (id: string) => {
  const request = axios.get<ThreadAnswer>(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

interface ThreadCreateData {
  content: string
  author?: string
}
const create = (data: ThreadCreateData) => {
  return axios.post<Post>(`${baseUrl}`, data).then(request => request.data)
}

interface CommentCreateData {
  content: string
  author?: string
  parent?: number
}
const createComment = (data: CommentCreateData, threadId: number) => {
  return axios.post<Post>(`${baseUrl}/${threadId}`, data).then(request => request.data)
}

const update = (id: number, newObject: Post) => {
  return axios
    .put<Post>(`/posts/${id}`, newObject)
    .then(request => request.data)
}

export default {
  getAll,
  getThread,
  create,
  createComment,
  update,
}
