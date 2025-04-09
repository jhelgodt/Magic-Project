import mongoose, { Schema, Document } from "mongoose";

export interface IDeck extends Document {
  name: string;
  description: string;
  cards: mongoose.Types.ObjectId[]; // Array of Card IDs
  user: mongoose.Types.ObjectId; // Nytt fält för att koppla till användare
}

const deckSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Nytt fält
});

export default mongoose.model<IDeck>("Deck", deckSchema);
