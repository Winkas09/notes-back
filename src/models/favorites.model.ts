import { Schema, Types, model } from "mongoose";

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
