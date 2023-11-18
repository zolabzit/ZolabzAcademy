const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(bodyParser.json({ type: "json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "Saran@123",
 database: "zolabz_academy",
});

app.use(
 cors({
  origin: "*",
  methods: ["POST", "GET"],
  credentials: true,
 })
);

db.connect((err) => {
 if (err) {
  console.error("MySQL connection error: " + err);
  return;
 }
 console.log("Connected to MySQL");
});

app.post("/api/freereg", async (req, res) => {
 const { name, email, phone } = req.body;
 if (!name && !email && !phone) {
  return res.status(400).json({ error: "All properties are required." });
 }
 console.log(req.body);
 const sql = "INSERT INTO free_class_reg (name, email, phone) VALUES (?, ?, ?)";
 try {
  await db.query(sql, [name, email, phone]);
  res.json({ message: "Submission saved successfully." });
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Failed to save the submission." });
 }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
