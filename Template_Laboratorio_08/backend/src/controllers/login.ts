import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";
import config from "../utils/config";
import { withUser } from "../utils/middleware";

const router = express.Router();

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!user || !passwordCorrect) {
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
  response.status(200).json({ username: user.username });
});

router.get("/me", withUser, async (request, response) => {
  const user = await User.findById(request.userId);
  if (!user) {
    response.status(404).json({ error: "user not found" });
    return;
  }
  response.json(user);
});

router.post("/logout", (request, response) => {
  response.clearCookie("token");
  response.status(200).json({ message: "Logged out successfully" });
});

export default router;
