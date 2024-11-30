import { Schema, Types, model } from "mongoose";

// Creating an interface
interface Favorite {
  noteId: Types.ObjectId;
}

const favoriteSchema = new Schema<Favorite>(
  {
    noteId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export const Favorite = model<Favorite>("Favorite", favoriteSchema);
