import express from "express";
import passport from "passport";

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production";

// Start Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Handle Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const frontendUrl = isProduction
      ? "https://jhelgodt.github.io/Magic-Project" // Production frontend URL
      : "http://localhost:4200/Magic-Project"; // Local frontend URL

    res.redirect(`${frontendUrl}`); //
  }
);

export default router;
