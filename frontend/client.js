const express = require("express"); // Import the Express.js framework
const app = express(); // Create an Express app object
const path = require("path"); // Import the path module
const bodyParser = require("body-parser"); // Import the body-parser middleware
const fs = require("fs"); //
const routers = express.Router(); // Create a router using Express's Router class
app.use(routers);

const axios = require("axios"); // Import the axios library for making HTTP requests

routers.use(express.json()); // Use the express.json() middleware to parse incoming JSON data
routers.use(bodyParser.urlencoded({ extended: true })); // Use the body-parser middleware to parse incoming request bodies

app.use(express.static(path.join(__dirname, "html"))); // Use the express.static middleware to serve static files from the 'html' directory
app.use("/", express.static(path.join(__dirname, "/static"))); // Serve static files from the 'static' directory when a request is made to the root URL

routers.get("/", (req, res) => {
  // Define a handler function for the '/' route
  console.log("Request at /");
  console.log("Retrieve a login page");
  res.status(200).sendFile(path.join(__dirname, "/html/login.html")); // Send the login page as a response
});

routers.get("/index", (req, res) => {
  // Define a handler function for the '/index' route
  console.log("Request at /index");
  console.log("Retrieve a home page");
  res.status(200).sendFile(path.join(__dirname, "/html/index.html")); // Send the home page as a response
});

routers.get("/expert", (req, res) => {
  // Define a handler function for the '/expert' route
  console.log("Request at /expert");
  console.log("Retrieve a expert page");
  res.status(200).sendFile(path.join(__dirname, "/html/search.html")); // Send the expert search page as a response
});

routers.get("/How_to_Use", (req, res) => {
  // Define a handler function for the '/How_to_Use' route
  console.log("Request at /How_to_Use");
  console.log("Retrieve a how_to_use");
  res.status(200).sendFile(path.join(__dirname, "html", "How_to_Use.html")); // Send the 'How to Use' page as a response
});

routers.get("/AboutUs", (req, res) => {
  // Define a handler function for the '/AboutUs' route
  console.log("Request at /AboutUs");
  console.log("Retrieve a About Us");
  res.status(200).sendFile(path.join(__dirname, "html", "AboutUs.html")); // Send the 'About Us' page as a response
});

routers.get("/login", (req, res) => {
  // Define a handler function for the '/login' route
  console.log("Request at /login");
  console.log("Retrieve a form");
  res.status(200).sendFile(path.join(__dirname, "html", "login.html")); // Send the login form as a response
});

routers.post("/submit-login", async (req, res) => {
  // Define a handler function for the '/submit-login' route when a POST request is made
  // get username and password from HTML form

  // Send login request to backend
  const result = axios // Send an HTTP POST request to the backend server
    .post("http://localhost:3000/login-auth", req.body)
    .then((response) => {
      // If the response from the backend server is successful
      if (response.status === 200) {
        console.log("Hello admin!"); // Log a message to the console
        res.redirect("/index"); // Redirect to the index page
      }
    })
    .catch((err) => {
      console.log(err); // Log any errors that occur
    });
});

// Define a route handler for the '/user_management' route when a GET request is made
app.get("/user_management", (request, response) => {
  response.sendFile(path.resolve(__dirname, "html", "user_management.html"));
});

// Define a route handler for the '/experties_in_detail/:id' route when a GET request is made
app.get("/experties_in_detail/:id", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "html", "experties_in_detail.html")
  );
});

// Define a route handler for the '/product_management/:id' route when a GET request is made
app.get("/product_management/:id", (request, response) => {
  response.sendFile(
    path.resolve(__dirname, "html", "product_management_edit.html")
  );
});

// Define a route handler for the '/product_management' route when a GET request is made
app.get("/product_management", (request, response) => {
  response.sendFile(path.resolve(__dirname, "html", "product_management.html"));
});

// Start the server and listen on port 3030
app.listen(3030, () => {
  console.log("Server is litening on port 3030 ⚡"); // Log a message to the console
});
