// Forma en que el servidor entrega threads y comentarios. Es la misma que
// aparece en el enunciado: un thread tiene `thread: null` y un comentario
// lleva el id del thread al que pertenece.
export interface Post {
  id: number
  content: string
  author: string | null
  thread: number | null // null si es thread, un id si es comentario
  parent: number | null // null si no responde a nadie o el id del respondido
  createdAt: string
  updatedAt: string
  likes: number
  dislikes: number
}
