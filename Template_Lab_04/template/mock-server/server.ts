// Servidor de datos para el laboratorio. Reemplaza al servidor del curso, así
// que el template corre sin depender de la red.
//
// Implementa los mismos endpoints que describe el enunciado:
//
//   GET  /threads      listado de threads
//   POST /threads      crea un thread
//   GET  /threads/:id  un thread junto a sus comentarios
//   POST /threads/:id  crea un comentario dentro del thread
//   PUT  /posts/:id    sobrescribe un thread o comentario
//
// Los datos se cargan de db.json y viven en memoria: lo que se cree o edite se
// pierde al reiniciar. No es necesario modificar este archivo en el
// laboratorio.

import express from 'express'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

interface Post {
  id: number
  content: string
  author: string | null
  thread: number | null
  parent: number | null
  createdAt: string
  updatedAt: string
  likes: number
  dislikes: number
}

const here = dirname(fileURLToPath(import.meta.url))
const seed = JSON.parse(readFileSync(join(here, 'db.json'), 'utf8')) as { posts: Post[] }

const posts: Post[] = seed.posts
let nextId = Math.max(0, ...posts.map(post => post.id)) + 1

const app = express()
app.use(express.json())

// La aplicación corre en otro puerto, así que el navegador exige CORS.
app.use((request, response, next) => {
  response.set('Access-Control-Allow-Origin', '*')
  response.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  response.set('Access-Control-Allow-Headers', 'Content-Type')
  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }
  next()
})

const isThread = (post: Post) => post.thread === null

// Lee `content` y `author` del cuerpo de la petición. Un autor vacío se guarda
// como null, y el enunciado pide que se muestre como "Anónimo".
const readPostBody = (body: unknown) => {
  const { content, author } = (body ?? {}) as { content?: unknown, author?: unknown }
  if (typeof content !== 'string' || content.trim() === '') {
    return null
  }
  return {
    content: content.trim(),
    author: typeof author === 'string' && author.trim() !== '' ? author.trim() : null,
  }
}

app.get('/threads', (_request, response) => {
  response.json(posts.filter(isThread))
})

app.post('/threads', (request, response) => {
  const data = readPostBody(request.body)
  if (!data) {
    response.status(400).json({ error: 'content is required' })
    return
  }

  const now = new Date().toISOString()
  const thread: Post = {
    id: nextId++,
    content: data.content,
    author: data.author,
    thread: null,
    parent: null,
    createdAt: now,
    updatedAt: now,
    likes: 0,
    dislikes: 0,
  }
  posts.push(thread)
  response.status(201).json(thread)
})

app.get('/threads/:id', (request, response) => {
  const id = Number(request.params.id)
  const thread = posts.find(post => post.id === id && isThread(post))
  if (!thread) {
    response.status(404).json({ error: 'thread not found' })
    return
  }

  response.json({
    thread,
    comments: posts.filter(post => post.thread === id),
  })
})

app.post('/threads/:id', (request, response) => {
  const threadId = Number(request.params.id)
  const thread = posts.find(post => post.id === threadId && isThread(post))
  if (!thread) {
    response.status(404).json({ error: 'thread not found' })
    return
  }

  const data = readPostBody(request.body)
  if (!data) {
    response.status(400).json({ error: 'content is required' })
    return
  }

  // El comentario respondido, si lo hay, tiene que pertenecer a este thread.
  const { parent } = request.body as { parent?: unknown }
  let parentId: number | null = null
  if (parent !== undefined && parent !== null) {
    const found = posts.find(post => post.id === Number(parent) && post.thread === threadId)
    if (!found) {
      response.status(400).json({ error: 'parent must be a comment of this thread' })
      return
    }
    parentId = found.id
  }

  const now = new Date().toISOString()
  const comment: Post = {
    id: nextId++,
    content: data.content,
    author: data.author,
    thread: threadId,
    parent: parentId,
    createdAt: now,
    updatedAt: now,
    likes: 0,
    dislikes: 0,
  }
  posts.push(comment)
  response.status(201).json(comment)
})

// Sobrescribe la publicación completa, como advierte el enunciado: para
// cambiar un campo hay que mandar una copia del objeto con ese campo ya
// modificado.
app.put('/posts/:id', (request, response) => {
  const id = Number(request.params.id)
  const index = posts.findIndex(post => post.id === id)
  if (index === -1) {
    response.status(404).json({ error: 'post not found' })
    return
  }

  const previous = posts[index]
  const body = (request.body ?? {}) as Partial<Post>
  const updated: Post = {
    ...previous,
    ...body,
    id: previous.id,
    createdAt: previous.createdAt,
    updatedAt: new Date().toISOString(),
  }
  posts[index] = updated
  response.json(updated)
})

const PORT = 3001
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor de datos escuchando en http://localhost:${PORT}`)
})
