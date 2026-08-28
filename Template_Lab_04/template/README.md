# Laboratorio 4: comunicando con el servidor

Punto de partida para rehacer la página de threads y comentarios en React,
obteniendo los datos de un servidor.

## Cómo correrlo

Se necesitan dos terminales. En la primera, el servidor de datos:

```sh
npm install
npm run server
```

En la segunda, la aplicación:

```sh
npm run dev
```

Abra `http://localhost:5173`.

## El servidor de datos

`mock-server/` implementa los endpoints que describe el enunciado, con los datos
de `mock-server/db.json`. Corre en `http://localhost:3001`, esa es la URL base
que va en el módulo de servicios, y acepta peticiones desde el navegador porque
responde con las cabeceras de CORS.

| Método | Ruta | Respuesta |
|---|---|---|
| GET | `/threads` | `Post[]` |
| POST | `/threads` | `Post` |
| GET | `/threads/:id` | `{ thread, comments }` |
| POST | `/threads/:id` | `Post` |
| PUT | `/posts/:id` | `Post` |

Lo que se cree o edite vive en memoria y se pierde al reiniciar el servidor. No
hay que modificar nada dentro de `mock-server/`.

## Qué hay que escribir

Cada archivo trae comentarios con lo que le corresponde. La numeración sigue las
preguntas del enunciado.

| Archivo | Pregunta |
|---|---|
| `src/components/PostBox.tsx` | P1, y después P3 y P5 |
| `src/services/threads.ts` | P2, P3 y P5 |
| `src/pages/Threads.tsx` | P2, y después P4 |
| `src/pages/Thread.tsx` | P3, y después P4 |
| `src/App.tsx` | P2 y P3 |
| `src/components/PostForm.tsx` | P4 |
| `src/index.css` | P6 |

`src/types/posts.ts` ya trae la interface `Post` con la forma en que responde el
servidor.

Las dependencias necesarias están instaladas: `axios` para hablar con el
servidor y `react-router-dom` si resuelve la navegación con React Router.
