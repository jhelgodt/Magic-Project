import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cardRoutes from "./routes/cardRoutes";
import deckRoutes from "./routes/deckRoutes";

const app = express();

const allowedOrigins = ["http://localhost:4200", "https://jhelgodt.github.io"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/v1/cards", cardRoutes); // Add card routes
app.use("/api/v1/decks", deckRoutes); // Add deck routes

// Test route
app.get("/", (req, res) => {
  res.send("API is running!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
