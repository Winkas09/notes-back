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

    res
      .status(StatusCodes.OK)
      .json({ favorites, msg: "All Favorites have been fetched!" });
  };

  toggleFavorite = async (req: Request, res: Response) => {
    const { noteId } = req.body;

    if (!noteId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Note ID must be provided." });
    }

    const existingFavorite = await Favorite.findOne({ noteId });

    if (existingFavorite) {
      await Favorite.deleteOne({ noteId });
      return res.status(StatusCodes.OK).json({ msg: "Favorite has been removed!" });
    } else {
      const newFavorite = await Favorite.create({ noteId });
      return res.status(StatusCodes.CREATED).json({ favorite: newFavorite, msg: "Favorite has been added!" });
    }
  };
}

export default new FavoritesController();