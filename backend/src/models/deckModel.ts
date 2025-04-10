import mongoose, { Schema, Document } from "mongoose";

export interface IDeck extends Document {
  name: string;
  description: string;
  cards: mongoose.Types.ObjectId[]; // Array of Card IDs
  user: mongoose.Types.ObjectId; // Nytt fält för att koppla till användare
  isPublic: boolean; // Nytt fält för att ange om decket är offentligt
}

const deckSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // om det inte redan finns
  isPublic: { type: Boolean, default: false }, // 👈 ny flagga
});

export default mongoose.model<IDeck>("Deck", deckSchema);
