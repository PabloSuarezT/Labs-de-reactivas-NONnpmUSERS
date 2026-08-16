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
