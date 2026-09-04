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

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});