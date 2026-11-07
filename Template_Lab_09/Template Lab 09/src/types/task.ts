// P1: estructura de una tarea.
//
// Cada tarea tiene id, título, descripción, estado y fecha de creación. El
// estado es uno de tres: por hacer, en progreso o terminada; conviene
// declararlo como un tipo aparte, porque el tablero y el formulario del modal
// recorren esos tres valores.
//
// El estado inicial de una tarea recién creada siempre es "por hacer".
//
// P1: Respuestas conceptuales:
//
// a) ¿Qué problema resuelve un store global como Zustand frente a mantener
// el estado con useState en cada componente? Relacione su respuesta con el
// tablero y el modal.
// R: Resuelve el prop drilling y la desincronización de estados entre
// componentes distantes. El modal puede cambiar el estado de una tarea y el
// tablero se actualiza directamente al estar suscrito al store.
//
// b) ¿Por qué una acción del store debe entregar un arreglo nuevo en vez de
// modificar el existente? ¿Qué consecuencia tiene para la vista?
// R: React y Zustand detectan cambios por igualdad de referencia.
// Si se muta el arreglo existente, la referencia en memoria no cambia y la
// vista no se re-renderiza. Al entregar un nuevo arreglo, la referencia
// referencia cambia y React gatilla el re-render.
//
// c) ¿Por qué conviene guardar en el store solo el id de la tarea seleccionada
// y no una copia completa de la tarea?
// R: Para mantener una única fuente de la verdad y evitar inconsistencias
// o duplicidad de datos. Guardando solo el id, los datos de la tarea
// se derivan directamente de la lista principal (tasks.find),
// garantizando que el modal siempre muestre la información actualizada.

// P5: agregue después el atributo de categoría.

export type TaskStatus = 'to_do' | 'in_progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
}
