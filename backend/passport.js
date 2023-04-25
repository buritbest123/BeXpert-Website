// Import required packages
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

// Retrieve Google API client ID and secret from environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;

// Set up Google authentication strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/google/callback",
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
