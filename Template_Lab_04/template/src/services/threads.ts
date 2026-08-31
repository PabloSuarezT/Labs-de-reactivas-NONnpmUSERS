import type { Post } from '../types/posts'
import axios from 'axios'
const baseUrl = 'http://localhost:3001'
// import { threadData } from '../mock-server/db.json'

// Estado inicial simulado
// let mockPosts: Post[] = [
//   {
//     id: 1,
//     content: '¡Bienvenidos al laboratorio de React!',
//     author: 'Profesor',
//     likes: 5,
//     dislikes: 0,
//     thread: null,
//     parent: null,
//     createdAt: new Date().toDateString(), // agregados ahora para cumplir con parámetros
//     updatedAt: new Date().toDateString(), // de la interfaz 'Post'.
//   },
// ]



// const getAll = (): Promise<Post[]> => {
//   return Promise.resolve([...mockPosts.filter((p) => p.thread === null)])
// }

const getAll = (): Promise<Post[]> => {
  return axios.get<Post[]>(`${baseUrl}/threads`).then((response) => response.data)
}

export interface ThreadCreateData {
  content: string
  author?: string
}

// const create = (data: ThreadCreateData): Promise<Post> => {
//   const newPost: Post = {
//     id: Date.now(),
//     content: data.content,
//     author: data.author || 'Anónimo',
//     likes: 0,
//     dislikes: 0,
//     thread: null,
//     parent: null,
//     createdAt: new Date().toDateString(), // Nuevamente, agregado para cumplir con
//     updatedAt: new Date().toDateString(), // los parámetros de 'Post'.
//   }
//   mockPosts.push(newPost)
//   return Promise.resolve(newPost)
// }

const create = (data: ThreadCreateData): Promise<Post> => {
  return axios.post<Post>(`${baseUrl}/threads`, data).then((response) => response.data)
}

export interface ThreadAnswer {
  thread: Post
  comments: Post[]
}

// const getThread = (id: string): Promise<ThreadAnswer> => {
//   const threadId = Number(id)
//   const thread = mockPosts.find((p) => p.id === threadId)
//   const comments = mockPosts.filter((p) => p.thread === threadId || p.parent === threadId)

//   if (!thread) {
//     return Promise.reject(new Error('Thread no encontrado'))
//   }

//   return Promise.resolve({ thread, comments })
// }

const getThread = (id: string): Promise<ThreadAnswer> => {
  return axios.get<ThreadAnswer>(`${baseUrl}/threads/${id}`).then((response) => response.data)
}

export interface CommentCreateData {
  content: string
  author?: string
  parent?: number
}

// const createComment = (data: CommentCreateData, threadId: number): Promise<Post> => {
//   const newComment: Post = {
//     id: Date.now(),
//     content: data.content,
//     author: data.author || 'Anónimo',
//     likes: 0,
//     dislikes: 0,
//     thread: threadId,
//     parent: data.parent || null,
//     createdAt: new Date().toDateString(), // Finalmente y una vez más, agregado para 
//     updatedAt: new Date().toDateString(), // cumplir con los parámetros de 'Post'.
//   }
//   mockPosts.push(newComment)
//   return Promise.resolve(newComment)
// }

const createComment = (data: CommentCreateData, threadId: number): Promise<Post> => {
  return axios.post<Post>(`${baseUrl}/threads/${threadId}`, data).then((response) => response.data)
}

// const update = (id: number, updatedPost: Post): Promise<Post> => {
//   mockPosts = mockPosts.map((p) => (p.id === id ? updatedPost : p))
//   return Promise.resolve(updatedPost)
// }

const update = (id: number, updatedPost: Post): Promise<Post> => {
  return axios.put<Post>(`${baseUrl}/posts/${id}`, updatedPost).then((response) => response.data)
}

export default {
  getAll,
  create,
  getThread,
  createComment,
  update,
}

// Se llama a este archivo desde PostBox como 'ThreadsService'. Esto funciona
// internamente como si se tuviera:

// const threadsService = {
//   getAll,
//   create,
//   getThread,
//   createComment,
//   update
// }

// al momento de hacer 'export default'. Se puede llamar utilizando cualquier nombre.