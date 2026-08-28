// P2, P3 y P5: módulo para comunicarse con el servidor.
//
// El servidor de datos corre en http://localhost:3001 (`npm run server`) y
// expone estos endpoints:
//
//   GET  /threads      -> Post[]                      listado de threads
//   POST /threads      -> Post                         crea un thread
//   GET  /threads/:id  -> { thread, comments }         un thread y sus comentarios
//   POST /threads/:id  -> Post                         crea un comentario en el thread
//   PUT  /posts/:id    -> Post                         sobrescribe un thread o comentario
//
// Cada función debe declarar el tipo de sus argumentos y el de su retorno.
//
// import axios from 'axios'
// import type { Post } from '../types/posts'
//
// const baseUrl = 'http://localhost:3001/threads'

// P2: obtener el listado de threads.
//
// const getAll = () => { ... }

// P2: crear un thread. El servidor solo necesita el contenido y, si lo hay,
// el autor; del resto de los campos se encarga él.
//
// interface ThreadCreateData {
//   content: string
//   author?: string
// }
// const create = (data: ThreadCreateData) => { ... }

// P3: obtener un thread junto a sus comentarios.
//
// interface ThreadAnswer {
//   thread: Post
//   comments: Post[]
// }
// const getThread = (id: string) => { ... }

// P3: crear un comentario dentro de un thread. `parent` es el id del
// comentario al que responde, y debe pertenecer al mismo thread.
//
// interface CommentCreateData {
//   content: string
//   author?: string
//   parent?: number
// }
// const createComment = (data: CommentCreateData, threadId: number) => { ... }

// P5: actualizar un thread o comentario. Ojo con la ruta: es /posts/:id, no
// /threads/:id. El endpoint sobrescribe el objeto, así que hay que mandar una
// copia completa con el campo ya modificado.
//
// const update = (id: number, newObject: Post) => { ... }

// export default {
//   getAll,
//   create,
//   getThread,
//   createComment,
//   update,
// }
