import { Request, Response } from "express";
import { Note } from "../models/note.model";
import { StatusCodes } from "http-status-codes";

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
    const notes = await Note.find({}).sort("-createdAt");

    if (notes?.length === 0) {
      throw new Error("Note list is empty!");
    }

    res
      .status(StatusCodes.OK)
      .json({ notes, msg: "All Notes have been fetched!" });
  };

  getSingleNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const note = await Note.findById({ _id: id });

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
}

export const noteController = new NoteController();
