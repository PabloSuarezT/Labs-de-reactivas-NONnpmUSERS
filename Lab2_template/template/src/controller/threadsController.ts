import { Request, Response } from "express";
import Thread from "../models/Thread";

/** implementación de los controladores para las rutas de hilos */
// P2: Función controladora para obtener todos los threads en formato JSON
export const getThreads = async (req: Request, res: Response): Promise<void> => {
    try {
        // Consultamos todos los threads almacenados en MongoDB
        const threads = await Thread.find({});
        
        // Devolvemos el arreglo de threads como JSON
        res.status(200).json(threads);
    } catch (error) {
        console.error('Error al obtener los threads:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener los datos' });
    }
};

// P4: Función controladora para crear un nuevo thread
export const createThread = async (req: Request, res: Response): Promise<void> => {
    try {
        const { autor, contenido } = req.body;

        // Validar que ambos campos vengan en la petición
        if (!autor || !contenido) {
            res.status(400).json({ error: 'Los campos autor y contenido son obligatorios' });
            return;
        }

        // Crear el nuevo hilo (Mongoose asigna createAt/updateAt automáticamente)
        const newThread = new Thread({
            autor,
            contenido
        });

        const savedThread = await newThread.save();

        // Devolver el objeto creado con status 201
        res.status(201).json(savedThread);
    } catch (error) {
        console.error('Error al crear el thread:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear el hilo' });
    }
};