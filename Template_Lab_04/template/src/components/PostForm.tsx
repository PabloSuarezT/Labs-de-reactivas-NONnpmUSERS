// P4: formulario para publicar.
//
// Pide contenido y, de forma opcional, un autor. Quien lo usa decide qué hacer
// al enviarlo: en la página principal crea un thread, y en la vista detallada
// crea un comentario. Conviene entonces recibir esa acción por props en vez de
// llamar al servidor desde acá.
//
// El mismo componente sirve para el formulario desplegable de respuesta, que
// además manda el id del comentario al que responde.
//
// interface PostFormProps {
//   onSubmit: (data: { content: string, author?: string, parent?: number }) => void
//   ...
// }
//
// const PostForm = ({ ... }: PostFormProps) => { ... }
//
// export default PostForm
