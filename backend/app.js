const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("./passport");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const publicDir = path.join(__dirname, "./public");
app.use(express.static(publicDir));

const route_authen = require("./routes/authen");
const route_admin = require("./routes/admin");
const route_expert = require("./routes/expert");
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/error", (req, res, next) => {
  res.status(403).json({ status: false, message: "Authentication error" });
});
app.get("/success", (req, res, next) => {
  if (req.user) {
    res.sendFile(path.join(publicDir, "/profile.html"));
  } else {
    res.redirect("/");
  }
});
app.use("/auth", route_authen);
app.use("/admin", route_admin);
app.use("/expert", route_expert);

const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

//DB on connect
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected DB: " + process.env.MYSQL_DATABASE);
});

app.post("/login-auth", (request, response) => {
  const { email, password } = request.body;

  console.log(email);
  db.query(
    `SELECT * FROM LOGIN_INFO Where email LIKE '%${email}%'`,
    (error, results, fields) => {
      console.log(results);
      if (error) {
        console.log(error);
        response
          .status(500)
          .json({ Message: "An error occurred while fetching user data." });
      } else if (results.length === 0) {
        response.status(404).json({ Message: "User does not exist." });
      } else if (password === results[0].psw) {
        request.session.loggedIn = true;
        console.log(request.session.loggedIn); // add this line to check if the flag is being set correctly
        request.session.user = email;
        request.session.save(); // Add this line to save the session
        response.header("Access-Control-Allow-Origin", "http://localhost:3000");
        response.status(200).json({ Message: "Welcome!" });
      } else {
        response.status(500).json({ Message: "Incorrect password." });
      }
    }
  );
});

app.listen(PORT, () => console.log(`Server on ${PORT} ⚡`));
