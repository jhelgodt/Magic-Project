import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cardRoutes from "./routes/cardRoutes";
import deckRoutes from "./routes/deckRoutes";
import authRoutes from "./routes/authRoutes";
import passport from "passport";
import "./config/passport"; // Import the Passport configuration
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

const allowedOrigins = ["http://localhost:4200", "https://jhelgodt.github.io"];

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // Use a secure secret in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Use your MongoDB connection string
      collectionName: "sessions", // Optional: specify the collection name for sessions
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day session timeout (in milliseconds)
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production (requires HTTPS)
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
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
app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user); // Returns the logged-in user's profile
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
