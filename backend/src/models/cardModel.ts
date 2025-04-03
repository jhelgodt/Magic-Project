import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
  name: string;
  manaCost: string;
  type: string;
  rarity: string;
  text: string;
  power?: number;
  toughness?: number;
  imageUrl?: string; // Add imageUrl for card images
}

const cardSchema: Schema = new Schema({
  name: { type: String, required: true },
  manaCost: { type: String },
  type: { type: String },
  rarity: { type: String },
  text: { type: String },
  power: { type: Number },
  toughness: { type: Number },
  imageUrl: { type: String }, // Add imageUrl to the schema
});

export interface ScryfallCard {
  name: string;
  type_line: string;
  mana_cost: string;
  oracle_text: string;
  image_uris?: {
    normal: string;
  };
  power?: string; // Scryfall returns power as a string
  toughness?: string; // Scryfall returns toughness as a string
}

export default mongoose.model<ICard>("Card", cardSchema);
