import express from "express";
import mongoose from "mongoose";
import path from "path";
import threadRoutes from "./routes/threadRoute";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/cc5003-lab-2")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Registering Routes
app.use("/", threadRoutes);

// --- FALTABA ESTO: Iniciar el servidor Express ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;