import mongoose, { Schema } from "mongoose";

export interface Post {
  content: string;
  author?: string;
  thread?: mongoose.Types.ObjectId;
  parent?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  dislikes: number;
}

const BANNED = ["huevito rey", "matías toro", "memes es mal ramo"];
function isNotBanned(v: string) {
  return !BANNED.includes(v.toLowerCase());
}

const postSchema = new mongoose.Schema<Post>(
  {
    content: { type: String, required: true, minlength: 1, maxlength: 300 },
    author: {
      type: String,
      validate: {
        validator: isNotBanned,
        message: (props) => `${props.value} is not allowed as a username!`,
      },
    },
    thread: { type: Schema.Types.ObjectId, ref: "Post", default: null },
    parent: { type: Schema.Types.ObjectId, ref: "Post", default: null },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

postSchema.set("toJSON", {
  transform: (
    _,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PostModel = mongoose.model<Post>("Post", postSchema);

export default PostModel;
