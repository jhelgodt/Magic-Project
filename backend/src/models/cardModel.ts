import mongoose, { Schema, Document } from "mongoose";

export interface ICard extends Document {
  name: string;
  manaCost: string;
  type: string;
  rarity: string;
  text: string;
  power?: number;
  toughness?: number;
}

const cardSchema: Schema = new Schema({
  name: { type: String, required: true },
  manaCost: { type: String, required: true },
  type: { type: String, required: true },
  rarity: { type: String },
  text: { type: String, required: true },
  power: { type: Number },
  toughness: { type: Number },
});

export default mongoose.model<ICard>("Card", cardSchema);
