import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";

const router = express.Router();

// TODO (P2): crear un usuario guardando el hash de la contraseña.
router.post("/", async (request, response) => {
  const { username, email, password } = request.body;

  if (typeof password !== "string" || password.length < 3) {
    response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, email, passwordHash });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// TODO (P2): listar los usuarios.
router.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

export default router;
