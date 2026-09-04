import mongoose from "mongoose";

// Lista de autores no permitidos
const FORBIDDEN_AUTHORS = ["Huevito rey", "Matías Toro", "Memes es mal ramo"];

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 1,   // Restricción: mínimo 1 caracter
    maxLength: 300, // Restricción: máximo 300 caracteres
  },
  author: {
    type: String,
    default: "Anónimo",
    validate: {
      // Validador personalizado: verifica que el nombre no esté en la lista negra
      validator: function (value: string) {
        return !FORBIDDEN_AUTHORS.includes(value);
      },
      message: (props) => `${props.value} no es un nombre de autor permitido.`,
    },
  },
  thread: { type: Number, default: null },
  parent: { type: Number, default: null },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
}, { timestamps: true }); // timestamps crea automáticamente createdAt y updatedAt