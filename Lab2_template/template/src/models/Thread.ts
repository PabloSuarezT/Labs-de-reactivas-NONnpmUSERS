import mongoose, { Schema } from "mongoose";

export interface IThread {
    autor: string;
    contenido: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// P1: Defina aquí los campos autor y contenido como obligatorios, y configure
// la creación automática de la fecha con timestamps.
const threadSchema = new Schema<IThread>(
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
        },
    },
    {
        timestamps: true,
    }
);

export const Thread = mongoose.model<IThread>("Thread", threadSchema);
export default Thread;