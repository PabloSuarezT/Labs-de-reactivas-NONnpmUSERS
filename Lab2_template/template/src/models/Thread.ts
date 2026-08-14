import mongoose from "mongoose";

export interface IThread {

}

// P1: Defina aquí los campos author y content como obligatorios, y configure
// la creación automática de la fecha con timestamps o default: Date.now.
const threadSchema = new mongoose.Schema<IThread>({
});

const Thread = mongoose.model<IThread>("Thread", threadSchema);
export default Thread;