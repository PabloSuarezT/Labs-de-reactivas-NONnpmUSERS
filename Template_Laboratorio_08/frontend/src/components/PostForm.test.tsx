import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostForm from './PostForm'

describe('<PostForm /> - P2', () => {
  test('el formulario de thread llama a onSubmit con la información correcta', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<PostForm onSubmit={onSubmit} />)

    await user.type(screen.getByRole('textbox', { name: /name/i }), '67')
    await user.type(screen.getByRole('textbox', { name: /comment/i }), 'Mi primera funa')
    await user.click(screen.getByRole('button', { name: 'Post' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      content: 'Mi primera funa',
      author: '67',
      parent: undefined,
    })
  })

  test('el formulario de comentario llama a onSubmit incluyendo el parent', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<PostForm onSubmit={onSubmit} parentId={42} />)

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'ola')
    await user.type(screen.getByRole('textbox', { name: /comment/i }), 'adios')
    await user.click(screen.getByRole('button', { name: 'Post' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      content: 'adios',
      author: 'ola',
      parent: 42,
    })
  })
})