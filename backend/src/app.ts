import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutter
app.use("/api/v1/books", bookRoutes);

// Test-rutt
app.get("/", (req, res) => {
  res.send("API är igång!");
});

// MongoDB-koppling
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
