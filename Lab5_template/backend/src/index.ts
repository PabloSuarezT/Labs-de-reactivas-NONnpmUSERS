/////////////// P2 ///////////////
import dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { Post } from "./models/post.ts";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json()); // Procesa peticiones con cuerpo en formato JSON

// Logger de peticiones (basado en el ejemplo c06_Programming_a_server v2)
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// GET /api/threads: Obtener todos los threads creados en la página (aquellos con thread === null)
app.get("/api/threads", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const threads = await Post.find({ thread: null });
    res.json(threads);
  } catch (error) {
    next(error);
  }
});

// POST /api/threads: Crear un nuevo thread
app.post("/api/threads", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, author } = req.body;

    // Validación de campos obligatorios
    if (!content || typeof content !== "string" || content.trim() === "") {
      return res.status(400).json({ error: "El contenido es obligatorio." });
    }

    // Calcular id numérico correlativo para cumplir con la interfaz Post
    const lastPost = await Post.findOne().sort({ id: -1 });
    const nextId = lastPost && typeof lastPost.id === "number" ? lastPost.id + 1 : 1;

    const newThread = new Post({
      id: nextId,
      content: content.trim(),
      author: author && typeof author === "string" && author.trim() !== "" ? author.trim() : "Anónimo",
      thread: null,
      parent: null,
      likes: 0,
      dislikes: 0,
    });

    const savedThread = await newThread.save();
    return res.status(201).json(savedThread);
  } catch (error: any) {
    // Si falla la validación de Mongoose (autor prohibido, largo de caracteres, etc.)
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    return next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});