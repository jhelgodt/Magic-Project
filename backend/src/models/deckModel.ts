import mongoose, { Schema, Document } from "mongoose";

export interface IDeck extends Document {
  name: string;
  description: string;
  cards: mongoose.Types.ObjectId[]; // Array of Card IDs
}

const deckSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }], // Reference to Card model
});

export default mongoose.model<IDeck>("Deck", deckSchema);
