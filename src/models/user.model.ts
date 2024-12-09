import { Schema, model } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  googleId?: string;
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = model<User>("User", userSchema);