import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you can save the user to your database
      // For now, we'll just return the profile
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
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
