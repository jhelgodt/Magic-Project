import express from "express";
import {
  getAllCards,
  getCardById,
  createCard,
  deleteCard,
  updateCard,
} from "../controllers/cardController";

const router = express.Router();

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", createCard);
router.delete("/:id", deleteCard);
router.put("/:id", updateCard);

export default router;
