import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel"; // Din user-model

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  throw new Error("❌ Missing Google OAuth environment variables.");
}

console.log("✅ GOOGLE_CALLBACK_URL loaded:", GOOGLE_CALLBACK_URL);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("🔁 Received Google profile:", profile);

        const existingUser = await User.findOne({ googleId: profile.id });
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
        console.error("❌ Error in Google OAuth strategy:", error);
        return done(error, undefined);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  console.log("🔐 serializeUser:", user);
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  console.log("🔓 deserializeUser: looking for user with ID:", id);
  try {
    const user = await User.findById(id);
    if (!user) {
      console.warn("⚠️ No user found during deserializeUser.");
      return done(null, false);
    }
    console.log("✅ User deserialized:", user);
    done(null, user);
  } catch (error) {
    console.error("❌ Error in deserializeUser:", error);
    done(error, null);
  }
});
