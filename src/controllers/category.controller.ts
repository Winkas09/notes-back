import { Request, Response } from "express";
import { Category } from "../models/category.model";
import { StatusCodes } from "http-status-codes";
import { Note } from "../models/note.model";

class CategoryController {
  createCategory = async (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) {
      throw new Error("Title must be provided.");
    }

    const newCategory = await Category.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ category: newCategory, msg: "Category has been created!" });
  };

  getCategories = async (req: Request, res: Response) => {
    const categories = await Category.find({}).sort("-createdAt");

    if (categories?.length === 0) {
      throw new Error("Category list is empty!");
    }

    res
      .status(StatusCodes.OK)
      .json({ categories, msg: "All Categories have been fetched!" });
  };

  getNotesByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const notes = await Note.find({ categoryId:category }).sort("-createdAt");

    res
      .status(StatusCodes.OK)
      .json({ notes, msg: "All Notes have been fetched!" });

  }

  deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete({ _id: id });

    if (!deletedCategory) {
      throw new Error("Requested category not found!");
    }

    await Note.updateMany({ categoryId: id }, { $unset: { categoryId: "" } });

    res
      .status(StatusCodes.OK)
      .json({ category: deletedCategory, msg: "Category has been deleted" });
}
  
  }

export default new CategoryController();
