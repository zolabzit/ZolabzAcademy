const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json({ type: "json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
 host: process.env.DB_HOST || "localhost",
 user: process.env.DB_USER || "root",
 password: process.env.DB_PASSWORD || "Saran@123",
 database: process.env.DB_NAME || "zolabz_academy",
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
 if (!name || !email || !phone) {
  return res.status(400).json({ error: "All properties are required." });
 }

 const sql = "INSERT INTO free_class_reg (name, email, phone) VALUES (?, ?, ?)";
 try {
  await db.query(sql, [name, email, phone]);
  res.json({ message: "Submission saved successfully." });
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Failed to save the submission." });
 }
});

app.post("/api/internship", upload.single("resume"), async (req, res) => {
 console.log("Request Body:", req.body);
 console.log("Request File:", req.file);

 const {
  fullName,
  email,
  phone,
  gender,
  university,
  studyArea,
  completionYear,
  coverLetter,
 } = req.body;

 if (
  !fullName ||
  !email ||
  !phone ||
  !gender ||
  !university ||
  !studyArea ||
  !completionYear ||
  !coverLetter
 ) {
  return res.status(400).json({ error: "All properties are required." });
 }

 const resumeBuffer = req.file ? req.file.buffer : "";

 const sql =
  "INSERT INTO internship_applications (full_name, email, phone, gender, university, study_area, completion_year, resume, cover_letter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

 try {
  await db.query(sql, [
   fullName,
   email,
   phone,
   gender,
   university,
   studyArea,
   completionYear,
   resumeBuffer,
   coverLetter,
  ]);
  res.json({ message: "Internship application submitted successfully." });
 } catch (err) {
  console.error(err);
  res
   .status(500)
   .json({ error: "Failed to submit the internship application." });
 }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
