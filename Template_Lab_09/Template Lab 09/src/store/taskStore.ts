// P2: store global con Zustand. Es el único lugar donde vive el estado de la
// aplicación.
//
// El estado guarda:
//   - P2: la lista de tareas
//   - P4: si el modal está abierto y cuál es la tarea seleccionada
//   - P5: la categoría por la que se está filtrando
//
// Y expone las acciones para:
//   - P2: agregar una tarea
//   - P4: abrir y cerrar el modal, y cambiar el estado de una tarea
//   - P5: cambiar el filtro
//
// La forma de un store de Zustand es la que vieron en clases: un tipo que
// junta estado y acciones, y `create` recibiendo una función que usa `set`.
//
//   import { create } from 'zustand'
//
//   type TaskState = {
//     ...
//   }
//
//   export const useTaskStore = create<TaskState>(set => ({
//     ...
//   }))
//
// Cuidado con la acción que cambia el estado de una tarea: no modifique el
// arreglo existente, entregue uno nuevo para que React note el cambio.
