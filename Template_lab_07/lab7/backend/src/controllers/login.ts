import express from "express";

const router = express.Router();

// TODO (P3): login con el JWT en una cookie httpOnly y el token CSRF en un header.
router.post("/", async (request, response) => {
  response.status(501).json({ error: "not implemented" });
});

// TODO (P4): usuario de la sesión actual (protegido con withUser).
router.get("/me", async (request, response) => {
  response.status(501).json({ error: "not implemented" });
});

// TODO (P4): cerrar sesión.
router.post("/logout", async (request, response) => {
  response.status(501).json({ error: "not implemented" });
});

export default router;
