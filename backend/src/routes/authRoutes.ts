import express from "express";
import passport from "passport";

const router = express.Router();

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
    res.redirect("/"); // Redirect after successful login
  }
);

export default router;
