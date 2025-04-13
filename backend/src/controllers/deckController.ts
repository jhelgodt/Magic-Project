import { Request, Response, RequestHandler } from "express";
import Deck from "../models/deckModel";
import { IUser } from "../models/userModel";

// 👇 Utökar Express-typerna så TypeScript vet att req.user existerar
declare global {
  namespace Express {
    interface User extends IUser {}
    interface Request {
      user?: IUser;
    }
  }
}

export const getPublicDecks: RequestHandler = async (req, res) => {
  try {
    const publicDecks = await Deck.find({ isPublic: true });
    res.json(publicDecks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch public decks" });
  }
};

// 🔁 Lägg till ett kort i en deck (nu sparar vi hela kortobjektet istället för bara ID)
export const addCardToDeck: RequestHandler = async (req, res) => {
  try {
    const { card } = req.body;
    const deck = await Deck.findByIdAndUpdate(
      req.params.id,
      { $push: { cards: card } },
      { new: true }
    );

    if (!deck) {
      res.status(404).json({ error: "Deck not found" });
      return;
    }

    res.json(deck);
  } catch (err) {
    res.status(400).json({ error: "Failed to add card to deck" });
  }
};

export const getAllDecks: RequestHandler = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const decks = await Deck.find({ user: req.user._id });
    res.json(decks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your decks" });
  }
};

export const getDeckById: RequestHandler = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      res.status(404).json({ error: "Deck not found" });
      return;
    }

    res.json(deck);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch deck" });
  }
};

export const createDeck: RequestHandler = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const newDeck = await Deck.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(newDeck);
  } catch (err) {
    res.status(400).json({ error: "Failed to create deck" });
  }
};

export const deleteDeck: RequestHandler = async (req, res) => {
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

export const updateDeck: RequestHandler = async (req, res) => {
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
export const bulkAddCardsToDeck: RequestHandler = async (req, res) => {
  try {
    const { cards } = req.body;

    if (!Array.isArray(cards) || cards.length === 0) {
      res.status(400).json({ error: "No cards provided" });
      return;
    }

    const deck = await Deck.findByIdAndUpdate(
      req.params.id,
      { $push: { cards: { $each: cards } } }, // ⬅️ lägg till flera kort med $each
      { new: true }
    );

    if (!deck) {
      res.status(404).json({ error: "Deck not found" });
      return;
    }

    res.json(deck);
  } catch (err) {
    console.error("Failed to bulk add cards:", err);
    res.status(400).json({ error: "Failed to add cards to deck" });
  }
};
