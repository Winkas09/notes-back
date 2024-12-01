import { Schema, Types, model } from "mongoose";

interface Note {
  title: string;
  body: string;
  categoryId: Types.ObjectId;
}

const noteSchema = new Schema<Note>(
  {
    title: {
      type: String,
      required: [true, "Title should not be empty!"],
    },

    body: {
      type: String,
      required: [true, "Body should not be empty!"],
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

export const Note = model<Note>("Note", noteSchema);
