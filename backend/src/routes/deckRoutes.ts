import express from "express";
import {
  getAllDecks,
  getDeckById,
  createDeck,
  deleteDeck,
  updateDeck,
  addCardToDeck,
  getPublicDecks,
} from "../controllers/deckController";

const router = express.Router();

router.get("/public", getPublicDecks); // 👈 detta är tillgängligt utan inloggning
router.get("/", getAllDecks);
router.get("/:id", getDeckById);
router.post("/", createDeck);
router.delete("/:id", deleteDeck);
router.put("/:id", updateDeck);
router.put("/:id/add-card", addCardToDeck);

export default router;
