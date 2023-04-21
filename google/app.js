const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("./passport");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const publicDir = path.join(__dirname, "./public");
app.use(express.static(publicDir));

const route_authen = require("./routes/authen");
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
app.listen(PORT, () => console.log(`Server on ${PORT} ⚡`));
