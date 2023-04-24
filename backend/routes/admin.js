const app = require("express").Router();
const moment = require("moment");
const { connection } = require("../db");

app.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    let sql = "SELECT * FROM admin_info ";

    if (query.filter) {
      let col = query.filter.split(",");
      col = col.map((c) => `${c} like '%${query.search}%'`).join(" or ");
      sql = sql + "where " + col;
    }

    const [rows] = await connection.promise().query(sql);
    res.status(200).json({ success: true, datas: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/", async (req, res, next) => {
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

app.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const sql = "SELECT * FROM admin_info where id = ? limit 1";
    const [rows] = await connection.promise().query(sql, [id]);
    if (rows.length > 0) {
      const updateAdmin = `UPDATE admin_info SET username = ?,fname = ?,lname = ?,address = ?,phone = ?,bdate = ? WHERE id = ?;`;
      await connection
        .promise()
        .query(updateAdmin, [
          body.username,
          body.firstName,
          body.lastName,
          body.address,
          body.phone,
          moment(body.BDAge).format("YYYY-MM-DD"),
          id,
        ]);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, message: "Not found admin." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM admin_info where id = ? limit 1";
    const [rows] = await connection.promise().query(sql, [id]);
    if (rows.length > 0) {
      const delete_admin = `DELETE FROM admin_info where id = ?`;
      const delete_login = `DELETE FROM login_info where email = ?`;
      await connection.promise().query(delete_admin, [id]);
      await connection.promise().query(delete_login, [rows[0].email]);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, message: "Not found admin." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = app;

// insert the people (admin) //
app.post("/add-admin", async (req, res, next) => {
  try {
    const body = req.body;
    const sql =
      "INSERT INTO admin_info (username, fname, lname, email) VALUES (?, ?, ?, ?)";
    const [result] = await connection
      .promise()
      .query(sql, [body.username, body.firstName, body.lastName, body.email]);
    const adminId = result.insertId;
    res
      .status(201)
      .json({ success: true, message: "Admin added successfully.", adminId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// update the people (admin) //
app.put("/update-admin/:id", async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const body = req.body;
    const sql =
      "UPDATE admin_info SET username = ?, fname = ?, lname = ?, email = ? WHERE id = ?";
    const [result] = await connection
      .promise()
      .query(sql, [
        body.username,
        body.firstName,
        body.lastName,
        body.email,
        adminId,
      ]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Admin updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// delete the people (admin) //
app.delete("/delete-admin/:id", async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const sql = "DELETE FROM admin_info WHERE id = ?";
    const [result] = await connection.promise().query(sql, [adminId]);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
