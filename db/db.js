const mysql = require("mysql2/promise");
require("dotenv").config()
let connection;

function getConnection() {
  if (!connection) {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
    });
    const connection = db.connect();
  }
  return connection;
}

// function test() {
//   console.log(process.env.DB_HOST,process.env.DB_USER);
// }

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  });



module.exports= pool;