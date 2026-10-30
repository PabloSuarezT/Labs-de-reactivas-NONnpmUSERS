import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/", async (request, response) => {
  const { username, email, password } = request.body;

  if (!password || password.length < 3) {
    response.status(400).json({
      error: "password must be at least 3 characters long",
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, email, passwordHash });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

router.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

export default router;
