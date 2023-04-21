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
app.listen(PORT, () => console.log(`Server on ${PORT} ⚡`));
