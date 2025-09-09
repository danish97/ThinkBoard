import express from "express"
import {GetAllNotes, updateNote, deleteNote, createNote, getNoteByID} from "../Controllers/notesController.js"

const router = express.Router();

router.get("/", GetAllNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.put("/:id",updateNote);
router.delete("/:id",deleteNote);
export default router