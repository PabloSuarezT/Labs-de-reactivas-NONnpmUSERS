import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import PostBox from './PostBox'
import type { Post } from '../types/posts'
import threads from '../services/threads'

vi.mock('../services/threads', () => ({
  default: {
    update: vi.fn(),
  },
}))

describe('<PostBox /> - P1', () => {
  test('renderiza el contenido del comentario y el nombre del autor', () => {
    const comment: Post = {
      id: 1,
      content: 'Este es un comentario de prueba',
      author: 'Juan Pérez',
      thread: 1,
      parent: null,
      createdAt: '2026-10-30T12:00:00.000Z',
      updatedAt: '2026-10-30T12:00:00.000Z',
      likes: 0,
      dislikes: 0,
    }

    render(
      <MemoryRouter>
        <PostBox post={comment} action="reply" setToast={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Este es un comentario de prueba')).toBeDefined()
    expect(screen.getByText('Juan Pérez')).toBeDefined()
  })

  test('renderiza el autor como Anonymous si no se entrega un autor', () => {
    const commentWithoutAuthor: Post = {
      id: 2,
      content: 'Comentario anónimo de prueba',
      author: null,
      thread: 1,
      parent: null,
      createdAt: '2026-10-30T12:00:00.000Z',
      updatedAt: '2026-10-30T12:00:00.000Z',
      likes: 0,
      dislikes: 0,
    }

    render(
      <MemoryRouter>
        <PostBox post={commentWithoutAuthor} action="reply" setToast={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Comentario anónimo de prueba')).toBeDefined()
    expect(screen.getByText('Anonymous')).toBeDefined()
  })

  test('renderiza el ID del comentario al que responde cuando es respuesta a otro comentario', () => {
    const replyComment: Post = {
      id: 3,
      content: 'Respuesta al comentario con id 42',
      author: 'María',
      thread: 1,
      parent: 42,
      createdAt: '2026-10-30T12:00:00.000Z',
      updatedAt: '2026-10-30T12:00:00.000Z',
      likes: 0,
      dislikes: 0,
    }

    render(
      <MemoryRouter>
        <PostBox post={replyComment} action="reply" setToast={vi.fn()} />
      </MemoryRouter>,
    )

    expect(screen.getByText(/>>42/)).toBeDefined()
  })
})

describe('<PostBox /> - P2', () => {
  const comment: Post = {
    id: 1,
    content: 'Probando Like',
    author: 'Pablo Chilli',
    thread: 1,
    parent: null,
    createdAt: '2000-10-30T12:00:00.000Z',
    updatedAt: '2000-10-30T12:00:00.000Z',
    likes: 0,
    dislikes: 0,
  }

  beforeEach(() => {
    vi.mocked(threads.update).mockReset()
    vi.mocked(threads.update).mockResolvedValue(comment)
  })

  test('al presionar dos veces el botón de like se llama dos veces a setToast', async () => {
    const setToast = vi.fn()
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <PostBox post={comment} action="reply" setToast={setToast} />
      </MemoryRouter>,
    )

    const likeButton = screen.getByRole('button', { name: 'like post' })
    await user.click(likeButton)
    await user.click(likeButton)

    await waitFor(() => expect(setToast).toHaveBeenCalledTimes(2))
  })
})
