import express from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router
  .route("/")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

export default router;
