import express from "express";
import {
  getAllDecks,
  getDeckById,
  createDeck,
  deleteDeck,
  updateDeck,
} from "../controllers/deckController";

const router = express.Router();

router.get("/", getAllDecks);
router.get("/:id", getDeckById);
router.post("/", createDeck);
router.delete("/:id", deleteDeck);
router.put("/:id", updateDeck);

export default router;
