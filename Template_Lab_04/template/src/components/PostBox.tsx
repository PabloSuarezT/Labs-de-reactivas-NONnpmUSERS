// P1: componente que renderiza un thread o un comentario.
//
// Recibe por props el contenido y el autor. Si el autor viene vacío, muestra
// "Anónimo". Si el comentario responde a otro, recibe además el id del
// respondido y lo muestra; si no responde a nadie, no muestra nada.
//
// P3: agregue aquí una estructura clickeable para entrar a la vista detallada
// del thread.
//
// P5: muestre la cantidad de likes y dislikes, con un botón para cada uno. El
// número debe cambiar sin recargar la página, así que conviene guardarlo en el
// estado del componente además de mandarlo al servidor.
//
// import type { Post } from '../types/posts'
//
// interface PostBoxProps {
//   ...
// }
//
// const PostBox = ({ ... }: PostBoxProps) => { ... }
//
// export default PostBox
