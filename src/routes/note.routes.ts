import express from "express";
import { noteController } from "../controllers/note.controllers";

const router = express.Router();

router.route("/").post(noteController.createNote).get(noteController.getNotes);

router
  .route("/:id")
  .get(noteController.getSingleNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);

export default router;
