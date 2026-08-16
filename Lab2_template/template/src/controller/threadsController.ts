import { Request, Response } from "express";
import Thread from "../models/Thread";

/** implementación de los controladores para las rutas de hilos */

export const getThreads = async (req: Request, res: Response): Promise<void> => {
    try {
        const threads = await Thread.find({}).sort({ createdAt: -1 });
        res.json(threads);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los threads" });
    }
};

export const createThread = async (req: Request, res: Response): Promise<void> => {
    try {
        const { autor, author, contenido, content } = req.body;
        const threadAuthor = autor || author;
        const threadContent = contenido || content;

        if (!threadAuthor || !threadContent) {
            res.status(400).json({ error: "Autor y contenido son obligatorios" });
            return;
        }

        const newThread = await Thread.create({
            autor: threadAuthor,
            contenido: threadContent,
        });

        res.status(201).json(newThread);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el thread" });
    }
};
