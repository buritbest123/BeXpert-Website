const app = require("express").Router();
const { connection } = require("../db");

// Route to get all experts, with an optional filter by name or specialty
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

// Route to get a single expert by their ID
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
    // Check if email already exists in the database  
    const sql = "SELECT * FROM expert where email = ? limit 1";
    const [user] = await connection.promise().query(sql, [body.email]);

    // If email already exists, return error message
    if (user.length > 0) {
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    }
    // Initialize strings for various skill areas
    let softskill = "Soft Skills: ";
    let businessarea = "Language Skills: ";
    let computerarea = "Computer Skills: ";
    let dataarea = "Data Area: ";
    // Loop through the request body to extract skills data
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
        dataarea += ["art-area2", "art-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
  });

    // This section of the code defines a route for handling a POST request to insert a new expert into the database.
    const insert = `INSERT INTO expert(fname,lname,about,edu_highschool,edu_uni,skills,license,email,linkedin,mobile_num,pic_link,bg_link) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`;
    // This SQL query string specifies the columns to insert data into and the values to insert.
    await connection
      .promise()
      .query(insert, [
        body.firstname,
        body.lastname,
        body.about,
        body.edu_highschool,
        body.edu_uni,
        softskill + ";" + businessarea + ";" + computerarea + ";" + dataarea,
        body.license,
        body.email,
        body.linkedin,
        body.mobile_num,
        body.pic_link,
        body.bg_link,
      ]);
    // The await keyword ensures that the query is completed before proceeding to the next line of code. Once the query has been successfully executed, the function sends a success message to the client.
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// This code block is defining an endpoint for updating an expert's information in the database.
app.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    // This block of code is defining the endpoint for updating an expert.
    // It is a PUT request and expects an id parameter to identify which expert to update.
    // The body variable contains the updated information for the expert.
    const [user] = await connection
      .promise()
      .query("SELECT * FROM expert where email = ? limit 1", [body.email]);

    if (user.length > 0 && user[0].id != id) {
      return res
        .status(403)
        .json({ success: false, message: "Email is already in use." });
    }
    // This block of code is checking if the email provided in the body already exists in the database.
    // If it does and it belongs to a different expert, the function returns an error.
    let softskill = "Soft Skills: ";
    let businessarea = "Language Skills: ";
    let computerarea = "Computer Skills: ";
    let dataarea = "Data Area: ";
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
        dataarea += ["art-area2", "art-area3"].includes(element)
          ? "," + body[element]
          : body[element];
      }
    });

    // This block of code is constructing the skills field in the database based on the user's updated information.
    // It loops through all of the keys in the body object and if the key is one of the
    // "soft-skill", "business-area", "computer-area", or "art-area" fields, it adds the corresponding skill to the skills field.
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
          softskill + ";" + businessarea + ";" + computerarea + ";" + dataarea,
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

// The route is set up to expect an id parameter in the URL, which corresponds to the ID of the expert to be deleted.
app.delete("/:id", async (req, res, next) => {
  // The route handler is asynchronous (async) and uses a try...catch block to handle any errors that might occur during the database query or deletion process.
  try {
    // The first database query selects the expert with the given ID (SELECT * FROM expert where id = ? limit 1). The query result is stored in the rows array.
    const id = req.params.id;
    const sql = "SELECT * FROM expert where id = ? limit 1";
    const [rows] = await connection.promise().query(sql, [id]);
    if (rows.length > 0) {
      // If the rows array has at least one element (rows.length > 0), it means an expert with the given ID was found in the database. In that case, a second query is executed to delete the expert from the database
      const delete_expert = `DELETE FROM expert where id = ?`;
      await connection.promise().query(delete_expert, [id]);
      res.status(200).json({ success: true });
    } else {
      // If the rows array is empty, it means no expert was found with the given ID, and the route handler returns a 403 status code and an error message.
      res.status(403).json({ success: false, message: "Not found expert." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = app;
