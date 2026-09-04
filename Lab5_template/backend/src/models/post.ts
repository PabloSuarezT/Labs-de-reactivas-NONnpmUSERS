/////////////// P1 ///////////////
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBNAME;

mongoose.set("strictQuery", false);

if (url) {
  const options = dbName ? { dbName } : {};
  mongoose
    .connect(url, options)
    .then(() => console.log("Conectado exitosamente a MongoDB"))
    .catch((error) => {
      console.log("Error al conectar a MongoDB:", error.message);
    });
} else {
  console.warn("ADVERTENCIA: MONGODB_URI no está definida en las variables de entorno.");
}

//////////// P1 ////////////
const FORBIDDEN_AUTHORS = ["Huevito rey", "Matías Toro", "Memes es mal ramo"];

const postSchema = new mongoose.Schema(
  {
    /////////////// P2 ///////////////
    // Agregado para complater P2: Campo id numérico para cumplir con la interfaz Post
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    /////////////// P1 ///////////////
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
  },
  { timestamps: true } // timestamps crea automáticamente createdAt y updatedAt
);

/////////////// P2 ///////////////
// Agregado por P2: Transformar a JSON para eliminar _id y __v y mantener la estructura interface Post
postSchema.set("toJSON", {
  transform: (
    _document,
    returnedObject: {
      _id?: mongoose.Types.ObjectId;
      __v?: number;
      [key: string]: unknown;
    }
  ) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Post = mongoose.model("Post", postSchema);
