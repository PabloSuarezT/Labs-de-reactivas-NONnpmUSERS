import mongoose from "mongoose";

export interface UserData {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

// TODO (P1): campos, restricciones y transformación a JSON.
const userSchema = new mongoose.Schema<UserData>({});

const User = mongoose.model<UserData>("User", userSchema);

export default User;
