// --------------- P2 ---------------

import { test, describe, beforeEach, before, after } from "node:test"; 
import assert from "node:assert";
import supertest from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import Post from "../../src/models/posts";

const api = supertest(app);

describe("Pruebas de Integración", () => {
  let thread1Id: string;
  let thread2Id: string;

  before(async () => {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab6-test";
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    await Post.deleteMany({});

    // 1. Crear threads sin forzar id numérico manual si el schema usa ObjectId
    const thread1 = new Post({
      content: "Primer Thread Principal",
      author: "Autor 1",
      thread: null,
      parent: null,
    });

    const thread2 = new Post({
      content: "Segundo Thread Principal",
      author: "Autor 2",
      thread: null,
      parent: null,
    });

    const savedThread1 = await thread1.save();
    const savedThread2 = await thread2.save();

    // Guardamos los IDs generados por Mongoose para usarlos en las consultas
    thread1Id = savedThread1.id || savedThread1._id.toString();
    thread2Id = savedThread2.id || savedThread2._id.toString();

    // 2. Sembrar comentarios asociando el id/ObjectId devuelto por el thread padre
    const comment1 = new Post({
      content: "Comentario 1 del Thread 1",
      author: "Anon",
      thread: savedThread1._id,
      parent: null,
    });

    const savedComment1 = await comment1.save();

    const comment2 = new Post({
      content: "Comentario 2 del Thread 1",
      author: "Anon",
      thread: savedThread1._id,
      parent: savedComment1._id,
    });

    const comment3 = new Post({
      content: "Comentario del Thread 2",
      author: "Anon",
      thread: savedThread2._id,
      parent: null,
    });

    await comment2.save();
    await comment3.save();
  });

  test("GET /api/threads devuelve la cantidad correcta de threads principales (solo 2)", async () => {
    const response = await api
      .get("/api/threads")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, 2);
  });

  test("GET /api/threads/:id devuelve el thread específico con todos sus comentarios", async () => {
    const response = await api
      .get(`/api/threads/${thread1Id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.thread.id, thread1Id);
    assert.strictEqual(response.body.comments.length, 2);
  });

  // 2. Cerrar la conexión al finalizar todos los tests
  after(async () => {
    await mongoose.connection.close();
  });
});

// --------------- P2 (fin) ---------------