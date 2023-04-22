const app = require("express").Router();
const { connection } = require("../db");

app.get("/", async (req, res, next) => {
  try {
    const query = req.query;
    let sql = "SELECT * FROM expert ";

    if (query.filter) {
      let col = query.filter.split(",");
      col = col
        .map(
          (c) =>
            `${c === "name" ? "CONCAT(fname, lname)" : c} like '%${
              query.search
            }%'`
        )
        .join(" or ");

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
    const insert = `INSERT INTO expert(fname,lname,about,edu_highschool,edu_uni,skills,license,email,linkedin,mobile_num,pic_link,bg_link) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    await connection
      .promise()
      .query(insert, [
        body.firstname,
        body.lastname,
        body.about,
        body.edu_highschool,
        body.edu_uni,
        body.skills,
        body.license,
        body.email,
        body.linkedin,
        body.mobile_num,
        body.pic_link,
        body.bg_link,
      ]);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const sql = "SELECT * FROM expert where id = ? limit 1";
    const [rows] = await connection.promise().query(sql, [id]);
    if (rows.length > 0) {
      const updateExpert = `UPDATE expert SET fname = ?, lname = ?, about = ?, edu_highschool = ?, edu_uni = ?, skills = ?, license = ?, email = ?, linkedin = ?, mobile_num = ?, pic_link = ?, bg_link = ? WHERE id = ?;`;
      await connection
        .promise()
        .query(updateExpert, [
          body.firstname,
          body.lastname,
          body.about,
          body.edu_highschool,
          body.edu_uni,
          body.skills,
          body.license,
          body.email,
          body.linkedin,
          body.mobile_num,
          body.pic_link,
          body.bg_link,
          id,
        ]);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, message: "Not found expert." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM expert where id = ? limit 1";
    const [rows] = await connection.promise().query(sql, [id]);
    if (rows.length > 0) {
      const delete_expert = `DELETE FROM expert where id = ?`;
      await connection.promise().query(delete_expert, [id]);
      res.status(200).json({ success: true });
    } else {
      res.status(403).json({ success: false, message: "Not found expert." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = app;
