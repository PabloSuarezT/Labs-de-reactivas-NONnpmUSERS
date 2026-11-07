function App() {
  // P3: el tablero. Lea las tareas del store y reparta cada una en la columna
  // que le corresponde según su estado. El esqueleto queda así:
  //
  //   <>
  //     <h1>Gestor de tareas</h1>
  //     <div className="toolbar">
  //       <TaskForm />
  //     </div>
  //     <div className="board">
  //       {/* una <div className="column"> por estado, con sus TaskCard */}
  //     </div>
  //   </>
  //
  // P4: agregue <TaskModal /> al final y abra el modal desde TaskCard.
  //
  // P6: agregue <CategoryFilter /> a la barra y aplique el filtro a las tareas
  // para mostrar solo las de la categoría seleccionada.
  return (
    <>
      <h1>Gestor de tareas</h1>
      <p>
        Todavía no hay tablero. Empiece por el store en
        {' '}
        <code>src/store/taskStore.ts</code>
        .
      </p>
    </>
  )
}

export default App
