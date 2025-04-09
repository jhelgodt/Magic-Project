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
  done(null, user._id); // ✅ spara bara _id i session
});

interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

passport.deserializeUser((obj: User | null, done) => {
  done(null, obj);
});
