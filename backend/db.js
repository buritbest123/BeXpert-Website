// Importing the mysql2 module
const mysql = require("mysql2");

// Creating a connection object with the configuration properties
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Exporting the connection object for other modules to use
module.exports = {
  connection,
};
