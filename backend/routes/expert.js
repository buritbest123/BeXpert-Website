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

app.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    let sql = "SELECT * FROM expert where id=? limit 1";

    const [rows] = await connection.promise().query(sql, [id]);
    res.status(200).json({ success: true, datas: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const sql = "SELECT * FROM expert where email = ? limit 1";
    const [user] = await connection.promise().query(sql, [body.email]);

    if (user.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    }
    let softskill = "Soft Skills: ";
    let businessarea = "Language Skills: ";
    let computerarea = "Computer Skills: ";
    let artarea = "Data Area: ";
    Object.keys(body).forEach((element) => {
      if (element.indexOf("soft-skill") > -1) {
        softskill += ["soft-skill2", "soft-skill3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
      if (element.indexOf("business-area") > -1) {
        businessarea += ["business-area2", "business-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
      if (element.indexOf("computer-area") > -1) {
        computerarea += ["computer-area2", "computer-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
      if (element.indexOf("art-area") > -1) {
        artarea += ["art-area2", "art-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
    });

    const insert = `INSERT INTO expert(fname,lname,about,edu_highschool,edu_uni,skills,license,email,linkedin,mobile_num,pic_link,bg_link) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    await connection
      .promise()
      .query(insert, [
        body.firstname,
        body.lastname,
        body.about,
        body.edu_highschool,
        body.edu_uni,
        softskill + ";" + businessarea + ";" + computerarea + ";" + artarea,
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
    const [user] = await connection
      .promise()
      .query("SELECT * FROM expert where email = ? limit 1", [body.email]);

    if (user.length > 0 && user[0].id != id) {
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    }
    let softskill = "Soft Skills: ";
    let businessarea = "Language Skills: ";
    let computerarea = "Computer Skills: ";
    let artarea = "Data Area: ";
    Object.keys(body).forEach((element) => {
      if (element.indexOf("soft-skill") > -1) {
        softskill += ["soft-skill2", "soft-skill3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
      if (element.indexOf("business-area") > -1) {
        businessarea += ["business-area2", "business-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
      if (element.indexOf("computer-area") > -1) {
        computerarea += ["computer-area2", "computer-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
      if (element.indexOf("art-area") > -1) {
        artarea += ["art-area2", "art-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
    });
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
          softskill + ";" + businessarea + ";" + computerarea + ";" + artarea,
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
