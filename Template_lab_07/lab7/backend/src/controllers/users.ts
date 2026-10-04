import express from "express";

const router = express.Router();

// TODO (P2): crear un usuario guardando el hash de la contraseña.
router.post("/", async (request, response) => {
  response.status(501).json({ error: "not implemented" });
});

// TODO (P2): listar los usuarios.
router.get("/", async (request, response) => {
  response.status(501).json({ error: "not implemented" });
});

export default router;
