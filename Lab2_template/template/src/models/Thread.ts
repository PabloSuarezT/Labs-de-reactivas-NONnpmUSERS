import mongoose from "mongoose";

export interface IThread {
    autor: String;
    contenido: String;
    createAt?: Date;
    updateAt?: Date;

}

// P1: Defina aquí los campos author y content como obligatorios, y configure
// la creación automática de la fecha con timestamps o default: Date.now.
const threadSchema = new mongoose.Schema<IThread>({
    autor: {
        type: String,
        required: [true, 'El campo autor es obligatorio'],
        trim: true,
    }
});

const Thread = mongoose.model<IThread>("Thread", threadSchema);
export default Thread;