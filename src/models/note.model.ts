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

noteSchema.index({ title: "text", body: "text" });

export const Note = model<Note>("Note", noteSchema);
