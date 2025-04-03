import express from "express";
import {
  getAllCards,
  getCardById,
  createCard,
  deleteCard,
  updateCard,
  addCardFromScryfall,
  searchCards,
  test,
} from "../controllers/cardController";

const router = express.Router();

router.get("/test", test);
router.get("/search", searchCards); // New route for searching cards
router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", createCard);
router.post("/scryfall", addCardFromScryfall); // New route for adding a card from Scryfall

router.delete("/:id", deleteCard);
router.put("/:id", updateCard);
// Route for testing

export default router;
