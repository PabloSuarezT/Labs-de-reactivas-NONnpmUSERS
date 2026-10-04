import express from "express";
import PostModel from "../models/posts";

const router = express.Router();

router.get("/threads", async (request, response) => {
  const threads = await PostModel.find({ thread: null });
  response.json(threads);
});

router.get("/threads/:id", async (request, response) => {
  const id = request.params.id;
  const [thread, comments] = await Promise.all([
    PostModel.findById(id),
    PostModel.find({ thread: id }),
  ]);

  if (!thread) {
    response.status(404).end();
    return;
  }
  if (thread.thread !== null) {
    response.status(400).json({ error: "Not a thread" });
    return;
  }
  response.json({ thread, comments });
});

// TODO (P5): el autor depende de la sesión.
router.post("/threads", async (request, response) => {
  const { content, author } = request.body;

  const post = new PostModel({
    content,
    author,
    thread: null,
  });

  const savedPost = await post.save();
  response.status(201).json(savedPost);
});

// TODO (P5): el autor depende de la sesión.
router.post("/threads/:id", async (request, response) => {
  const { content, author, parent } = request.body;

  const post = new PostModel({
    content,
    author,
    thread: request.params.id,
    parent: parent || null,
  });

  const savedPost = await post.save();
  response.status(201).json(savedPost);
});

router.put("/posts/:id", async (request, response) => {
  const updatedPost = await PostModel.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true }
  );

  if (!updatedPost) {
    response.status(404).end();
    return;
  }
  response.json(updatedPost);
});

export default router;
