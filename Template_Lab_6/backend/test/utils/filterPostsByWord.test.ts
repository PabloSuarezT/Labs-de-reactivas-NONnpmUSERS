// --------------- P1 ---------------

import { test, describe } from "node:test";
import assert from "node:assert";
import { filterPostsByWord } from "../../src/utils/filterPostsByWord";
import { Post } from "../../src/models/posts";

// Helper: crea un Post "de mentira" solo con el contenido que nos importa
const makePost = (content: string): Post => ({
  content,
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: 0,
  dislikes: 0,
});

describe("filterPostsByWord", () => {
  describe("coincidencias de palabra", () => {
    test("es case insensitive", () => {
      const posts = [makePost("Palabra clave"), makePost("otra cosa")];
      const result = filterPostsByWord(posts, "PALABRA");
      assert.strictEqual(result.length, 1);
    });

    test("ignora la puntuación", () => {
      const posts = [makePost("Es Bakemon, no Pokemon")];
      const result = filterPostsByWord(posts, "bakemon");
      assert.strictEqual(result.length, 1);
    });

    test("solo coincide con palabras completas", () => {
      const posts = [makePost("me gusta el girasol")];
      const result = filterPostsByWord(posts, "sol");
      assert.strictEqual(result.length, 0);
    });
  });

  describe("casos vacíos", () => {
    test("posts vacío retorna vacío", () => {
      assert.deepStrictEqual(filterPostsByWord([], "hola"), []);
    });

    test("query vacío retorna vacío", () => {
      const posts = [makePost("cualquier cosa")];
      assert.deepStrictEqual(filterPostsByWord(posts, ""), []);
    });

    test("sin coincidencias retorna vacío", () => {
      const posts = [makePost("nada que ver")];
      assert.deepStrictEqual(filterPostsByWord(posts, "inexistente"), []);
    });
  });
});

// --------------- P1 (fin) --------------