const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "avn_d4_db",
});

db.connect((err) => {
  if (err) {
    console.error(
      "Error connecting to DB: ",
      err
    );
    return;
  }
  console.log("Connected to DB");
});

app.get("/", (req, res) => {
  let { exec } = req.query;

  if (!exec) {
    return res.status(400).json({
      error: "'exec' query param is required.",
    });
  }

  // Remove semicolons to prevent multiple queries
  exec = exec.replace(/;/g, "");

  // Check if the query contains only allowed read operations
  if (
    !/^\s*(SELECT|DESC|SHOW TABLES\b)/i.test(exec)
  ) {
    return res.status(400).json({
      error:
        "Invalid query. Allowed queries are (SELECT, DESC, SHOW TABLES)",
    });
  }

  db.query(exec, (err, result) => {
    if (err) {
      console.error("Error: ", err);
      res.status(500).json({
        error: err.message,
      });
      return;
    }
    res.json(result);
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
