import { Request, Response } from "express";
import { Category } from "../models/category.model";
import { StatusCodes } from "http-status-codes";

class CategoryController {
  // create a category
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

  // get all categories
  getCategories = async (req: Request, res: Response) => {
    const categories = await Category.find({}).sort("-createdAt");

    if (categories?.length === 0) {
      throw new Error("Category list is empty!");
    }

    res
      .status(StatusCodes.OK)
      .json({ categories, msg: "All Categories have been fetched!" });
  };
}

export default new CategoryController();
