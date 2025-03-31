import { Request, Response } from "express";
import Card from "../models/cardModel";

// GET all cards
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

// GET a card by ID
export const getCardById = async (req: Request, res: Response) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      res.status(404).json({ error: "Card not found" });
      return;
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
};

// POST – create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const newCard = await Card.create(req.body);
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ error: "Failed to create card" });
  }
};

// DELETE a card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard) {
      res.status(404).json({ error: "Card not found" });
      return;
    }
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete card" });
  }
};

// PUT – update a card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCard) {
      res.status(404).json({ error: "Card not found" });
      return;
    }
    res.json(updatedCard);
  } catch (err) {
    res.status(400).json({ error: "Failed to update card" });
  }
};
