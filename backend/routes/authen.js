const app = require("express").Router();
const moment = require("moment");
const { connection } = require("../db");
const isLogin = require("../isLogin");
const passport = require("../passport");

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3030/index",
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

      req.session.user = user[0];
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

    if (user.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    }
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
    const insert_login = `INSERT INTO login_info(email,psw) VALUES(?,?)`;
    await connection.promise().query(insert_login, [body.email, body.password]);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/profile", isLogin, async (req, res, next) => {
  try {
    res.status(200).json({ success: true, datas: req.session.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/logout", isLogin, async (req, res, next) => {
  try {
    delete req.session.user;
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = app;
