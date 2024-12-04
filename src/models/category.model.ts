import { Schema, Types, model } from "mongoose";

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

categorySchema.index({ title: "text" });

export const Category = model<Category>("Category", categorySchema);
