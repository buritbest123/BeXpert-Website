// Import required packages and modules
const app = require("express").Router();
const moment = require("moment");
const { connection } = require("../db");
const isLogin = require("../isLogin");
const passport = require("../passport");

// Route for initiating Google authentication process
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Route for handling Google authentication callback
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3030/index",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Route for getting logged-in user's details
app.get("/me", (req, res, next) => {
  if (req.user) {
    res.status(200).json({ status: true, datas: req.user });
  } else {
    res.redirect("/"); // Redirect to home page if user is not logged in
  }
});

// Route for handling user login
app.post("/login", async (req, res, next) => {
  try {
    const body = req.body;
    const sql = "SELECT * FROM login_info where email = ? and psw = ? limit 1";
    const [rows] = await connection
      .promise()
      .query(sql, [body.email, body.password]);
    if (rows.length > 0) {
      const sql =
        "SELECT username,fname,lname,email,phone,Address,bdate,role FROM admin_info where email = ? limit 1";
      const [user] = await connection.promise().query(sql, [body.email]);

      req.session.user = user[0]; // Set session data for the logged-in user
      res.status(200).json({ success: true, message: "login success" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Email or password is wrong." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const body = req.body;
    const sql = "SELECT * FROM admin_info where email = ? limit 1";
    const [user] = await connection.promise().query(sql, [body.email]);

    // Check if email already exists
    if (user.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    }
    // Insert new admin data into the database
    const insert = `INSERT INTO admin_info(username,fname,lname,email,phone,address,bdate,psw,role) VALUES(?,?,?,?,?,?,?,?,?)`;
    await connection
      .promise()
      .query(insert, [
        body.username,
        body.firstName,
        body.lastName,
        body.email,
        body.phone,
        body.address,
        moment(body.BDAge).format("YYYY-MM-DD"),
        body.password,
        "Admin",
      ]);

    // Insert login information into the database
    const insert_login = `INSERT INTO login_info(email,psw) VALUES(?,?)`;
    await connection.promise().query(insert_login, [body.email, body.password]);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/profile", isLogin, async (req, res, next) => {
  try {
    // Get the current user's profile data
    res.status(200).json({ success: true, datas: req.session.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/logout", isLogin, async (req, res, next) => {
  try {
    // Remove user session to logout
    delete req.session.user;
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = app;
