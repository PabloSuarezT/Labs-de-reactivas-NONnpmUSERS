# Laboratorio 9: manejo avanzado del estado

Punto de partida para el gestor de tareas tipo kanban, con todo el estado global
en un store de Zustand.

## Cómo correrlo

```sh
npm install
npm run dev
```

Abra `http://localhost:5173`.

`zustand` ya está en las dependencias, así que `npm install` la trae junto al
resto: no hace falta instalarla aparte.

## Qué hay que escribir

Cada archivo trae comentarios con lo que le corresponde. La numeración sigue las
preguntas del enunciado.

| Archivo | Pregunta |
|---|---|
| `src/types/task.ts` | P1, y después P5 |
| `src/store/taskStore.ts` | P2, y después P4 y P5 |
| `src/components/TaskCard.tsx` | P2, y después P4 y P5 |
| `src/components/TaskForm.tsx` | P3, y después P5 |
| `src/App.tsx` | P3, y después P4 y P6 |
| `src/components/TaskModal.tsx` | P4 |
| `src/components/CategoryFilter.tsx` | P6 |

La P1 es conceptual y define los tipos en `src/types/task.ts`.

## Estilos

`src/index.css` ya trae las clases del tablero, las tarjetas y el modal, con la
lista completa comentada al principio del archivo. Las clases ya están listas: basta usarlas.
