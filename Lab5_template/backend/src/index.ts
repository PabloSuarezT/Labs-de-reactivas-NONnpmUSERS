////////////////////////////////////  P2  ///////////////////////////////////////////


// Idea de solución P2 no completa.


import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json()); // Procesa peticiones con cuerpo en formato JSON

// Estructura de datos en memoria para la P2
interface Item {
  id: number;
  name: string;
  status: string;
}

let items: Item[] = [
  { id: 1, name: "Elemento inicial 1", status: "activo" },
  { id: 2, name: "Elemento inicial 2", status: "pendiente" }
];

// P2 - Endpoint GET: Consultar los elementos
app.get('/api/items', (_req, res) => {
  res.json(items);
});

// P2 - Endpoint POST: Crear un nuevo elemento con validación
app.post('/api/items', (req, res) => {
  const { name, status } = req.body;

  // Validación de campos obligatorios (Respuesta HTTP 400 Bad Request)
  if (!name || !status) {
    return res.status(400).json({ error: "El nombre y el estado son obligatorios" });
  }

  const newItem: Item = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name,
    status
  };

  items.push(newItem);
  return res.status(201).json(newItem); // HTTP 201 Created
});

// P2 - Endpoint DELETE: Eliminar un recurso por ID
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  items = items.filter(item => item.id !== id);
  return res.status(204).end(); // HTTP 204 No Content
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});