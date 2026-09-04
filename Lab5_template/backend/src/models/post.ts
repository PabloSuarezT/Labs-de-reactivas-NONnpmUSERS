///////////////////////    P1    ////////////////////////////////

import mongoose from "mongoose";

const FORBIDDEN_AUTHORS = ["Huevito rey", "Matías Toro", "Memes es mal ramo"];

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 1,   // Mínimo 1 caracter
    maxLength: 300, // Máximo 300 caracteres
  },
  author: {
    type: String,
    default: "Anónimo",
    validate: {
      // Verifica que el autor no esté en la lista de prohibidos.
      validator: function (value: string) {
        return !FORBIDDEN_AUTHORS.includes(value);
      },
      message: (props: { value: string }) => `${props.value} no es un nombre de autor permitido.`,
    },
  },
  thread: { type: Number, default: null },
  parent: { type: Number, default: null },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
}, { timestamps: true }); // timestamps crea automáticamente createdAt y updatedAt