const express = require("express"); // Import the Express.js framework
const app = express(); // Create an Express app object
const path = require("path"); // Import the path module
const bodyParser = require("body-parser"); // Import the body-parser middleware

const routers = express.Router(); // Create a router using Express's Router class

app.use(express.json()); // Use the express.json() middleware to parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: false })); // Use the body-parser middleware to parse incoming request bodies
app.use(express.static(path.join(__dirname, "html"))); // Use the express.static middleware to serve static files from the 'html' directory

routers.get("/", (req, res) => {
  // Define a handler function for the '/' route
  console.log("Request at /index");
  console.log("Retrieve a home page");
  res.status(200).sendFile(path.join(__dirname, "html", "index.html"));
});

routers.get("/search", (req, res) => {
  // Define a handler function for the '/search' route
  console.log("Request at /search");
  console.log("Retrieve a search page");
  res.status(200).sendFile(path.join(__dirname, "html", "search.html"));
});

routers.get("/How_to_Use", (req, res) => {
  // Define a handler function for the '/signin' route
  console.log("Request at /How_to_Use");
  console.log("Retrieve a how_to_use");
  res.status(200).sendFile(path.join(__dirname, "html", "How_to_Use.html"));
});

routers.get("/AboutUs", (req, res) => {
  // Define a handler function for the '/signin' route
  console.log("Request at /How_to_Use");
  console.log("Retrieve a how_to_use");
  res.status(200).sendFile(path.join(__dirname, "html", "AboutUs.html"));
});

routers.get("/signin", (req, res) => {
  // Define a handler function for the '/signin' route
  console.log("Request at /signin");
  console.log("Retrieve a form");
  res.status(200).sendFile(path.join(__dirname, "html", "login.html"));
});

routers.post("/form-submit", (req, res) => {
  // Define a handler function for the '/form-submit' route
  const { email } = req.body; // Retrieve the email field from the request body using destructuring
  console.log(`Request at /form-submit`);
  console.log(`Form submitted by \n${email} at\n${Date.now()}`); // Log the form submission data to the console
  res.status(200).redirect("/member"); // Send a redirect response to the '/member' route
});

routers.get("/member", (req, res) => {
  // Define a handler function for the '/member' route
  console.log("Request at /member");
  res.status(200).sendFile(path.join(__dirname, "html", "success.html")); // Send an HTML file as the response
});

app.use("/", routers); // Mount the 'routers' router object on the app object to handle all routes starting with '/'
console.log("404: Invalid accessed");
app.all("*", (req, res) => {
  // Define a fallback route for handling any other routes
  res.status(404).sendFile(path.join(__dirname, "html", "error.html")); // Send an HTML file with a 404 error message
});

app.listen(3030, () => {
  // Start the server and listen on port 3030
  console.log("Server is litening on port 3030");
});
