import type { Post } from '../types/posts'

// Estado inicial simulado
let mockPosts: Post[] = [
  {
    id: 1,
    content: '¡Bienvenidos al laboratorio de React!',
    author: 'Profesor',
    likes: 5,
    dislikes: 0,
    thread: null,
    parent: null,
  },
]

const getAll = (): Promise<Post[]> => {
  return Promise.resolve([...mockPosts.filter((p) => p.thread === null)])
}

export interface ThreadCreateData {
  content: string
  author?: string
}

const create = (data: ThreadCreateData): Promise<Post> => {
  const newPost: Post = {
    id: Date.now(),
    content: data.content,
    author: data.author || 'Anónimo',
    likes: 0,
    dislikes: 0,
    thread: null,
    parent: null,
  }
  mockPosts.push(newPost)
  return Promise.resolve(newPost)
}

export interface ThreadAnswer {
  thread: Post
  comments: Post[]
}

const getThread = (id: string): Promise<ThreadAnswer> => {
  const threadId = Number(id)
  const thread = mockPosts.find((p) => p.id === threadId)
  const comments = mockPosts.filter((p) => p.thread === threadId || p.parent === threadId)

  if (!thread) {
    return Promise.reject(new Error('Thread no encontrado'))
  }

  return Promise.resolve({ thread, comments })
}

export interface CommentCreateData {
  content: string
  author?: string
  parent?: number
}

const createComment = (data: CommentCreateData, threadId: number): Promise<Post> => {
  const newComment: Post = {
    id: Date.now(),
    content: data.content,
    author: data.author || 'Anónimo',
    likes: 0,
    dislikes: 0,
    thread: threadId,
    parent: data.parent || null,
  }
  mockPosts.push(newComment)
  return Promise.resolve(newComment)
}

const update = (id: number, updatedPost: Post): Promise<Post> => {
  mockPosts = mockPosts.map((p) => (p.id === id ? updatedPost : p))
  return Promise.resolve(updatedPost)
}

export default {
  getAll,
  create,
  getThread,
  createComment,
  update,
}