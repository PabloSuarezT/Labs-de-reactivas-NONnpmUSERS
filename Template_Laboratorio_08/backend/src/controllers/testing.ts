/* creamos testing.ts como ENDPOINT para el reinicio de la DB como parte de la p3 */

import express from "express";
import PostModel from "../models/posts";
import User from "../models/user";

const router = express.Router();

router.post("/reset", async (request, response) => {
    await PostModel.deleteMany({});
    await User.deleteMany({});

    response.status(200).json({ message: "Database reset" });
});

export default router;


/* Se utiliza y adapta el código 'testing.ts' del ejemplo c09:

import express from "express";
import { Note } from "../models/notes.ts";
import { User } from "../models/users.ts";

const router = express.Router();

router.post("/reset", async (request, response) => {
    await Note.deleteMany({});
    await User.deleteMany({});

    response.status(204).end();
});

export default router;
*/