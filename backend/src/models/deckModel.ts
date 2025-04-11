import mongoose, { Schema, Document } from "mongoose";

export interface IDeck extends Document {
  name: string;
  description: string;
  cards: any[]; // Ändrat från ObjectId[] till any[]
  user: mongoose.Types.ObjectId;
  isPublic: boolean;
}

const deckSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cards: [{ type: Schema.Types.Mixed }], // 💡 Sparar hela kortobjektet direkt
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPublic: { type: Boolean, default: false },
});

export default mongoose.model<IDeck>("Deck", deckSchema);
