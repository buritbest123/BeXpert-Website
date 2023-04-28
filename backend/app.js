// Import required dependencies
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

// Configure dotenv
dotenv.config();

// Import Passport authentication module
const passport = require("./passport");

// Define PORT and create Express app instance
const PORT = process.env.PORT || 3000;
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse request bodies as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Enable sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the public directory
const publicDir = path.join(__dirname, "./public");
app.use(express.static(publicDir));

// Import routes
const route_authen = require("./routes/authen");
const route_admin = require("./routes/admin");
const route_expert = require("./routes/expert");

// Serve the index.html file at the root path
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle authentication errors
app.get("/error", (req, res, next) => {
  res.status(403).json({ status: false, message: "Authentication error" });
});

// Serve the profile.html file on successful login
app.get("/success", (req, res, next) => {
  if (req.user) {
    res.sendFile(path.join(publicDir, "/profile.html"));
  } else {
    res.redirect("/");
  }
});

// Mount routes
app.use("/auth", route_authen);
app.use("/admin", route_admin);
app.use("/expert", route_expert);

const mysql = require("mysql2");

// Create a database connection using the provided environment variables
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Connect to the database and log the name of the database
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected DB: " + process.env.MYSQL_DATABASE);
});

// Handle login requests
app.post("/login-auth", (request, response) => {
  // Get the email and password from the request body
  const { email, password } = request.body;

  // Log the email to the console
  console.log(email);

  // Query the database for the user with the given email
  db.query(
    `SELECT * FROM login_info Where email LIKE '%${email}%'`,
    (error, results, fields) => {
      console.log(results);
      if (error) {
        // If there is an error, log it and return an error message to the client
        console.log(error);
        response
          .status(500)
          .json({ Message: "An error occurred while fetching user data." });
      } else if (results.length === 0) {
        // If no users were found, return a "user not found" message to the client
        response.status(404).json({ Message: "User does not exist." });
      } else if (password === results[0].psw) {
        // If the password matches, set the loggedIn flag in the user's session
        request.session.loggedIn = true;
        console.log(request.session.loggedIn); // Add this line to check if the flag is being set correctly
        // Set the user email in the session and save it
        request.session.user = email;
        request.session.save(); // Add this line to save the session

        // Set the Access-Control-Allow-Origin header to allow requests from the client
        response.header("Access-Control-Allow-Origin", "http://localhost:3000");

        // Return a success message to the client
        response.status(200).json({ Message: "Welcome Admin!" });
      } else {
        // If the password doesn't match, return an error message to the client
        response.status(500).json({ Message: "Incorrect password." });
      }
    }
  );
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is listening on ${PORT} ⚡`));
