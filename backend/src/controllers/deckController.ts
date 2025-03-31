import { Request, Response } from "express";
import Deck from "../models/deckModel";

// GET all decks
export const getAllDecks = async (req: Request, res: Response) => {
  try {
    const decks = await Deck.find().populate("cards"); // Populate card details
    res.json(decks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch decks" });
  }
};

// GET a deck by ID
export const getDeckById = async (req: Request, res: Response) => {
  try {
    const deck = await Deck.findById(req.params.id).populate("cards");
    if (!deck) {
      res.status(404).json({ error: "Deck not found" });
      return;
    }
    res.json(deck);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch deck" });
  }
};

// POST – create a new deck
export const createDeck = async (req: Request, res: Response) => {
  try {
    const newDeck = await Deck.create(req.body);
    res.status(201).json(newDeck);
  } catch (err) {
    res.status(400).json({ error: "Failed to create deck" });
  }
};

// DELETE a deck
export const deleteDeck = async (req: Request, res: Response) => {
  try {
    const deletedDeck = await Deck.findByIdAndDelete(req.params.id);
    if (!deletedDeck) {
      res.status(404).json({ error: "Deck not found" });
      return;
    }
    res.json({ message: "Deck deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete deck" });
  }
};

// PUT – update a deck
export const updateDeck = async (req: Request, res: Response) => {
  try {
    const updatedDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDeck) {
      res.status(404).json({ error: "Deck not found" });
      return;
    }
    res.json(updatedDeck);
  } catch (err) {
    res.status(400).json({ error: "Failed to update deck" });
  }
};
