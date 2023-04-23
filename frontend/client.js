const express = require("express"); // Import the Express.js framework
const app = express(); // Create an Express app object
const path = require("path"); // Import the path module
const bodyParser = require("body-parser"); // Import the body-parser middleware
const fs = require("fs"); //
const routers = express.Router(); // Create a router using Express's Router class
app.use(routers);
const axios = require("axios");

routers.use(express.json()); // Use the express.json() middleware to parse incoming JSON data
routers.use(bodyParser.urlencoded({ extended: true })); // Use the body-parser middleware to parse incoming request bodies
app.use(express.static(path.join(__dirname, "html"))); // Use the express.static middleware to serve static files from the 'html' directory
app.use("/", express.static(path.join(__dirname, "/static")));

routers.get("/", (req, res) => {
  // Define a handler function for the '/' route
  console.log("Request at /index");
  console.log("Retrieve a home page");
  res.status(200).sendFile(path.join(__dirname, "/html/index.html"));
});

routers.get("/search", (req, res) => {
  // Define a handler function for the '/search' route
  console.log("Request at /search");
  console.log("Retrieve a search page");
  res.status(200).sendFile(path.join(__dirname, "/html/search.html"));

  // after entering search
  const { default: axios } = require('axios');

  axios.get("http://localhost:3000/expert").then((res) => {
      console.log(res.data)
      res.data.datas.forEach(expert => {
          console.log(expert.id)
          document.getElementsByID("list-expert").append(
              `<article class="column">
                <div class="rounded">
                <img src="${expert.pic_link}"  width="50px">
                </div>
                <h3>${expert.fname}</h3>
                <section>${expert.about}</section>
                <a href="experties_in_detail.html?id=${expert.id}">Learn More</a>
              </article>`
          )
      });
  })
});


routers.get("/How_to_Use", (req, res) => {
  // Define a handler function for the '/signin' route
  console.log("Request at /How_to_Use");
  console.log("Retrieve a how_to_use");
  res.status(200).sendFile(path.join(__dirname, "html", "How_to_Use.html"));
});

routers.get("/AboutUs", (req, res) => {
  // Define a handler function for the '/signin' route
  console.log("Request at /AboutUs");
  console.log("Retrieve a About Us");
  res.status(200).sendFile(path.join(__dirname, "html", "AboutUs.html"));
});

routers.get("/login", (req, res) => {
  // Define a handler function for the '/signin' route
  console.log("Request at /login");
  console.log("Retrieve a form");
  res.status(200).sendFile(path.join(__dirname, "html", "login.html"));
});

routers.post("/submit-login", async (req, res) => {
  // get username and pass word from HTML from

  // Send login request to backend
  const result = axios
    .post("http://localhost:3000/login-auth", req.body)
    .then((response) => {
      if (response.status === 200) {
        // const data = result.data;
        console.log("Hello admin!");
        res.redirect("/user_management");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user_management", (request, response) => {
  response.sendFile(path.resolve(__dirname, "html", "user_management.html"));
});

app.listen(3030, () => {
  // Start the server and listen on port 3030
  console.log("Server is litening on port 3030 ⚡");
});
