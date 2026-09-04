# Laboratorio 5 — Creando un servidor

Este repositorio contiene la solución desarrollada para el Laboratorio 5 del curso CC5003 (Aplicaciones Web Reactivas).

A continuación se detalla la correspondencia entre los archivos modificados o creados y cada pregunta del enunciado ($P_i$):

## Tabla de Cambios por Pregunta ($P_i$)

| Archivo | Pregunta ($P_i$) | Descripción del cambio |
| :--- | :--- | :--- |
| `backend/src/models/post.ts` | **P1** | Conexión de la aplicación a MongoDB (`mongoose.connect`), lectura de variables de entorno con `dotenv`, y schema inicial con validación de largo de comentario (1 a 300) y lista de autores prohibidos (*Huevito rey*, *Matías Toro*, *Memes es mal ramo*). |
| `backend/src/models/post.ts` | **P2** | Agregado de campo `id: Number` (único y obligatorio) para calzar con la estructura `interface Post` requerida por el frontend, configuración de `toJSON` para limpiar `_id` y `__v`, y exportación del modelo `Post`. |
| `backend/src/index.ts` | **P2** | Creación de los endpoints `GET /api/threads` (obtiene todos los posts con `thread === null`) y `POST /api/threads` (crea un nuevo thread con `id` correlativo y validaciones de datos). |
| `frontend/src/services/threads.ts` | **P2** | Reemplazo de la conexión anterior (`baseUrl = '/threads'`) por la nueva conexión hacia el backend (`baseUrl = '/api/threads'`). |
| `frontend/vite.config.ts` | **P2** | Configuración del servidor de desarrollo con proxy en `/api` redirigiendo hacia `http://localhost:3001`. |
| `backend/.env` | **P1** / **P2** | Definición de variables de entorno (`PORT`, `MONGODB_URI`, `MONGODB_DBNAME`). |
| `backend/package.json` | **P2** | Scripts de ejecución (`dev`, `build`, `start`) para ejecutar el servidor con `ts-node-dev`. |

---

## Detalle específico de cambios en `backend/src/models/post.ts`

Para facilitar la revisión entre lo que ya estaba implementado y lo que se agregó para completar la P1 y resolver la P2, el archivo cuenta con las siguientes marcas:

1. **Previamente existente en P1**:
   - Definición del arreglo `FORBIDDEN_AUTHORS` (*Huevito rey*, *Matías Toro*, *Memes es mal ramo*).
   - Validaciones de `content` (mínimo 1, máximo 300) y `author` con validador personalizado.
   - Campos `thread`, `parent`, `likes`, `dislikes` y `{ timestamps: true }`.

2. **Agregado con este cambio para P1**:
   - Conexión a MongoDB con `dotenv` y `mongoose.connect(url, { dbName })`.

3. **Agregado con este cambio para P2**:
   - Inclusión del campo `id: { type: Number, required: true, unique: true }` dentro del schema para garantizar que las publicaciones cumplan con `interface Post { id: number ... }`.
   - Método `postSchema.set("toJSON", ...)` para transformar la salida eliminando `_id` y `__v`.
   - Exportación de `Post` con `export const Post = mongoose.model("Post", postSchema)`.
