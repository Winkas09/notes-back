import express from "express";
import favoritesController from "../controllers/favorites.controller";

const router = express.Router();

router
  .route("/")
  .post(favoritesController.createFavorite)
  .get(favoritesController.getFavorites);

  router
  .route("/toggle")
  .post(favoritesController.toggleFavorite);

export default router;
