import express from "express";
import {
  getAllBooks,
  createBook,
  deleteBook,
  updateBook,
  getBookById,
} from "../controllers/bookController";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

export default router;
