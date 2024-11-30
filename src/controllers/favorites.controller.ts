import { Request, Response } from "express";
import { Favorite } from "../models/favorites.model";
import { StatusCodes } from "http-status-codes";

class FavoritesController {
  createFavorite = async (req: Request, res: Response) => {
    const { noteId } = req.body;

    if (!noteId) {
      throw new Error("Note ID must be provided.");
    }

    const newFavorite = await Favorite.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ favorite: newFavorite, msg: "Favorite has been created!" });
  };

  getFavorites = async (req: Request, res: Response) => {
    const favorites = await Favorite.find({}).sort("-createdAt");

    if (favorites?.length === 0) {
      throw new Error("Favorite list is empty!");
    }

    res
      .status(StatusCodes.OK)
      .json({ favorites, msg: "All Favorites have been fetched!" });
  };
}

export default new FavoritesController();
