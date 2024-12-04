import { Request, Response } from "express";
import { Note } from "../models/note.model";
import { StatusCodes } from "http-status-codes";
import { Category } from "../models/category.model";

class NoteController {
  createNote = async (req: Request, res: Response) => {
    const { title, body } = req.body;

    if (!title || !body) {
      throw new Error("Title and Body must be provided.");
    }

    const newNote = await Note.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ note: newNote, msg: "Note has been created!" });
  };

  getNotes = async (req: Request, res: Response) => {
    const notes = await Note.find({}).sort("-createdAt").populate("categoryId");

    if (notes?.length === 0) {
      throw new Error("Note list is empty!");
    }

    res
      .status(StatusCodes.OK)
      .json({ notes, msg: "All Notes have been fetched!" });
  };

  getSingleNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const note = await Note.findById({ _id: id }).populate("categoryId");

    if (!note) {
      throw new Error("Requested note not found!");
    }

    res.status(StatusCodes.OK).json({ note, msg: "Success" });
  };

  updateNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!updatedNote) {
      throw new Error("Requested note not found!");
    }

    res
      .status(StatusCodes.OK)
      .json({ note: updatedNote, msg: "Note has been updated" });
  };

  deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete({ _id: id });

    if (!deletedNote) {
      throw new Error("Requested note not found!");
    }

    res
      .status(StatusCodes.OK)
      .json({ note: deletedNote, msg: "Note has been deleted" });
  };

  searchNotes = async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Query must be provided." });
    }

    const notes = await Note.find({
      $text: { $search: query as string }
    }).populate("categoryId");

    const categories = await Category.find({
      $text: { $search: query as string }
    });

    const categoryNotes = await Note.find({
      categoryId: { $in: categories.map((category) => category._id) }
    }).populate("categoryId");

    const allNotes = [...notes, ...categoryNotes];

    res
      .status(StatusCodes.OK)
      .json({ notes: allNotes, msg: "Search results have been fetched!" });
  };
}
export const noteController = new NoteController();
