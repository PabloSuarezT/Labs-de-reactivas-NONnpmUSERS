import mongoose from "mongoose";

export interface IThread {
    autor: String;
    contenido: String;
    createAt?: Date;
    updateAt?: Date;

}

// P1: Defina aquí los campos author y content como obligatorios, y configure
// la creación automática de la fecha con timestamps o default: Date.now.
const threadSchema = new mongoose.Schema<IThread>(
    {
        autor: {
            type: String,
            required: [true, 'El campo autor es obligatorio'],
            trim: true,
        },
        contenido: {
            type: String,
            required: [true, 'El campo contenido es obligatorio'],
            trim: true,
        }
    },
    {
        // Mongoose maneja la fecha en el servidor automáticamente.
        // Mapeamos los nombres a createAt / updateAt para que coincidan con IThread
        timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' }
    }
);

const Thread = mongoose.model<IThread>("Thread", threadSchema);
export default Thread;