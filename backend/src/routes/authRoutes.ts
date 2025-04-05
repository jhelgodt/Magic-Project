import express from "express";
import passport from "passport";

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production";
const frontendUrl = isProduction
  ? "https://jhelgodt.github.io/Magic-Project" // Production frontend URL
  : "http://localhost:4200/Magic-Project"; // Local frontend URL

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
    res.redirect(`${frontendUrl}`); //
  }
);
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err); // Log the error for debugging
      return res.status(500).json({ error: "Failed to log out" });
    }
    // Redirect to the frontend homepage
    res.redirect(`${frontendUrl}`);
  });
});

export default router;
