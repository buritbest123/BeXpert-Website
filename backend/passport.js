// Import required packages
const passport = require("passport"); // Require the passport package
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy; // Require the Google OAuth2 strategy from the passport-google-oauth package

// Retrieve Google API client ID and secret from environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID; // Retrieve the Google API client ID from the environment variables
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET; // Retrieve the Google API client secret from the environment variables

// Set up Google authentication strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID, // Set the client ID for the Google API
      clientSecret: GOOGLE_CLIENT_SECRET, // Set the client secret for the Google API
      callbackURL: "http://127.0.0.1:3000/auth/google/callback", // Set the callback URL for the Google authentication process
      passReqToCallback: true, // Pass the request object to the callback function
    },
    (req, accessToken, refreshToken, profile, done) => {
      return done(null, profile); // Call the done function to indicate that the authentication process is complete
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  // Serialize the user object
  done(null, user); // Call the done function to indicate that the serialization process is complete
});

passport.deserializeUser((user, done) => {
  // Deserialize the user object
  done(null, user); // Call the done function to indicate that the deserialization process is complete
});

module.exports = passport; // Export the passport object
