import { Router } from "express";
import { getThreads, createThread } from '../controller/threadsController';
import path from 'path';

const router = Router();

// P2: Obtener todos los threads
router.get('/data.json', getThreads);

// P4: Crear un nuevo thread
router.post('/new', createThread);

// P3: Servir la vista principal
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

export default router;