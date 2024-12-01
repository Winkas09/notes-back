import express from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories)
  .delete(categoryController.deleteCategory);

router
  .route("/:category")
  .get(categoryController.getNotesByCategory)

export default router;
