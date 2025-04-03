import express from "express";
import {
  getAllCards,
  getCardById,
  createCard,
  deleteCard,
  updateCard,
  addCardFromScryfall,
} from "../controllers/cardController";

const router = express.Router();

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", createCard);
router.post("/scryfall", addCardFromScryfall); // New route for adding a card from Scryfall
router.delete("/:id", deleteCard);
router.put("/:id", updateCard);

export default router;
