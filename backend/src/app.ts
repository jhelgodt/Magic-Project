import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./config/passport"; // Import Passport strategy

import cardRoutes from "./routes/cardRoutes";
import deckRoutes from "./routes/deckRoutes";
import authRoutes from "./routes/authRoutes";

// Extend session object
declare module "express-session" {
  interface Session {
    passport?: { user?: string };
  }
}

const app = express();
const allowedOrigins = ["http://localhost:4200", "https://jhelgodt.github.io"];

// ✅ Middleware: JSON parsing
app.use(express.json());
app.set("trust proxy", 1); // Trust the first proxy

// ✅ Session config (must come before passport.session)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);

// ✅ Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// ✅ Logging middleware (for debugging sessions)
let count = 0;
const showLogs = (req: Request, res: Response, next: NextFunction) => {
  count++;
  console.log(`count: ${count}`);
  console.log("req.session.passport:", req.session.passport);
  console.log("req.user:", req.user);
  next();
};
app.use(showLogs);

// ✅ CORS config
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

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/decks", deckRoutes);

// ✅ Test routes
app.get("/", (req, res) => {
  res.send("API is running!");
});

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.get("/me", (req, res) => {
  console.log("🔎 Session user:", req.user);
  res.json(req.user || { message: "Not logged in" });
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
