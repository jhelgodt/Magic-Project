import axios from "axios";
import { Request, Response } from "express";
import Card, { ScryfallCard } from "../models/cardModel";

export const test = async (req: Request, res: Response) => {
  try {
    console.log("Fetching cards from the database...");
    const cards = await Card.find();
    console.log("Cards fetched successfully:", cards);
    res.status(200).json(cards);
  } catch (err) {
    console.error("Error fetching cards:", err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};
// GET all cards
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};
// GET – Search for cards in the database
export const searchCards = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ error: "Search query is required" });
    return;
  }

  try {
    console.log("Search query received:", query);

    const cards = await Card.find({
      name: { $regex: query, $options: "i" },
    });

    console.log("Search results:", cards);
    res.status(200).json(cards);
  } catch (err) {
    console.error("Error during Card.find():", err);
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

export const addCardFromScryfall = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cardName } = req.body;

  if (!cardName) {
    res.status(400).json({ error: "Card name is required" });
    return;
  }

  try {
    const response = await axios.get(
      `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(
        cardName
      )}`
    );

    const scryfallCard = response.data as ScryfallCard;

    const existingCard = await Card.findOne({ name: scryfallCard.name });
    if (existingCard) {
      res.status(200).json(existingCard);
      return;
    }

    const newCard = await Card.create({
      name: scryfallCard.name,
      type: scryfallCard.type_line,
      manaCost: scryfallCard.mana_cost,
      text: scryfallCard.oracle_text,
      imageUrl: scryfallCard.image_uris?.normal,
    });

    res.status(201).json(newCard);
  } catch (err) {
    console.error("Failed to fetch or save card:", err);
    res.status(500).json({ error: "Failed to fetch or save card" });
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
