const app = require("express").Router();
const passport = require("../passport");

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/me", (req, res, next) => {
  if (req.user) {
    res.status(200).json({ status: true, datas: req.user });
  } else {
    res.redirect("/");
  }
});

module.exports = app;
