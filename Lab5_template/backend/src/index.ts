/////////////// P2 ///////////////
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { Post } from "./models/post.ts";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// GET /api/threads: Obtener todos los threads (thread === null)
app.get("/api/threads", (_request, response) => {
  Post.find({ thread: null }).then((threads) => {
    response.json(threads);
  });
});

// POST /api/threads: Crear un nuevo thread
app.post("/api/threads", (request, response, next) => {
  const body = request.body;

  const newThread = new Post({
    id: Date.now(), // ID numérico único basado en timestamp
    content: body.content,
    author: body.author || "Anónimo",
    thread: null,
    parent: null,
  });

  newThread
    .save()
    .then((savedThread) => {
      response.status(201).json(savedThread);
    })
    .catch((error) => next(error)); // Mongoose valida el schema (P1) y pasa errores a P4
});


///////////////               P3                   ///////////////

// GET /api/threads/:id: Obtener el thread y todos sus comentarios
app.get("/api/threads/:id", (request, response, next) => {
  const threadId = Number(request.params.id);

  Post.findOne({ id: threadId, thread: null })
    .then((thread) => {
      if (!thread) {
        return response.status(404).json({ error: "thread no encontrado" });
      }

      Post.find({ thread: threadId })
        .sort({ id: 1 })
        .then((comments) => {
          response.json({ thread, comments });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

// POST /api/threads/:id: Agregar un comentario nuevo al thread
app.post("/api/threads/:id", (request, response, next) => {
  const threadId = Number(request.params.id);
  const body = request.body;

  Post.findOne({ id: threadId, thread: null })
    .then((thread) => {
      if (!thread) {
        return response.status(404).json({ error: "thread no encontrado" });
      }

      const newComment = new Post({
        id: Date.now(), // ID numérico único basado en timestamp
        content: body.content,
        author: body.author || "Anónimo",
        thread: threadId,
        parent: body.parent || null,
      });

      newComment
        .save()
        .then((savedComment) => {
          response.status(201).json(savedComment);
        })
        .catch((error) => next(error)); // Mongoose valida el schema (P1) y pasa errores a P4
    })
    .catch((error) => next(error));
});

////////////////////////////////////////////////////////////////////////////////////////////////// (Fin P3) 



app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});