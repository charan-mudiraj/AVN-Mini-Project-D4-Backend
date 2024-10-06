const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "avnD4@1234",
  database: "avn_d4_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to DB: ", err);
    return;
  }
  console.log("Connected to DB");
});

app.get("/ds", (req, res) => {
  db.query("SELECT * FROM ds_students", (err, result) => {
    if (err) {
      console.error("Error: ", err);
      res.status(500).json({ error: "DB Error" });
      return;
    }
    res.json(result);
  });
});

app.get("/all", (req, res) => {
  db.query("SELECT * FROM all_2021_batch_students", (err, result) => {
    if (err) {
      console.error("Error: ", err);
      res.status(500).json({ error: "DB Error" });
      return;
    }
    res.json(result);
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
