import bcrypt from "bcrypt";
import crypto from "crypto";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import config from "../utils/config";
import { withUser } from "../utils/middleware";

const router = express.Router();

// TODO (P3): login con el JWT en una cookie httpOnly y el token CSRF en un header.
router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    response.status(401).json({ error: "invalid username or password" });
    return;
  }

  const userForToken = {
    username: user.username,
    csrf: crypto.randomUUID(),
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  response.setHeader("X-CSRF-Token", userForToken.csrf);
  response.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  response.status(200).send({ username: user.username });
});

// --- P4: usuario de la sesión actual (protegido con withUser). ---
router.get("/me", withUser, async (request, response) => {
  const user = await User.findById(request.userId);
  if (!user) {
    response.status(401).json({ error: "user not found" });
    return;
  }
  response.json(user);
});

// --- P4: cerrar sesión. ---
router.post("/logout", async (request, response) => {
  response.clearCookie("token");
  response.status(200).json({ message: "logged out" });
});

export default router;

