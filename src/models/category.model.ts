import { Schema, Types, model } from "mongoose";

// Creating an interface
interface Category {
  title: string;
}

const categorySchema = new Schema<Category>(
  {
    title: {
      type: String,
      required: [true, "Title should not be empty!"],
    },
  },
  { timestamps: true }
);

export const Category = model<Category>("Category", categorySchema);
