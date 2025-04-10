import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/userModel"; // Importera din user-model

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("🔁 Google profile:", profile);

        const existingUser = await User.findOne({ googleId: profile.id });
        console.log("Checking for existing user...");
        if (existingUser) {
          console.log("✅ Found existing user:", existingUser);
          return done(null, existingUser);
        }

        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value || "",
        });

        console.log("🆕 Created new user:", newUser);
        return done(null, newUser);
      } catch (error) {
        console.error("❌ Error in Google strategy:", error);
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  console.log("🔍 serializeUser called with user:", user);
  done(null, user._id); // ✅ Save only _id in session
});

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

passport.deserializeUser(async (id: string, done) => {
  console.log("🔍 deserializeUser called with ID:", id);
  try {
    console.log("🔍 Attempting to find user in database with ID:", id);
    const user = await User.findById(id); // Retrieve the user by _id from the database
    if (!user) {
      console.warn("⚠️ No user found with ID:", id);
      return done(null, false); // No user found
    }
    console.log("✅ User found:", user);
    done(null, user); // Pass the full user object to the session
  } catch (error) {
    console.error("❌ Error in deserializeUser:", error);
    done(error, null);
  }
});
