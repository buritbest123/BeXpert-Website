const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

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
const route_authen = require("./routes/authen");
const route_admin = require("./routes/admin");
const route_expert = require("./routes/expert");
app.use("/auth", route_authen);
app.use("/admin", route_admin);
app.use("/expert", route_expert);
app.listen(PORT, () => console.log(`Server on ${PORT} ⚡`));
