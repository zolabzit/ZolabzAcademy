const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();

const upload = multer({ dest: "uploads/" });

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
  resume,
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
  !resume ||
  !coverLetter
 ) {
  return res.status(400).json({ error: "All properties are required." });
 }

 //  const resumePath = req.file ? req.file.path : "test";
 const resumePath = req.file ? req.file.path : "";
 const sql =
  "INSERT INTO internship_applications (full_name, email, phone, gender, university, study_area, completion_year, resume_path, cover_letter) VALUES (?, ?, ?, ?, ?, ?, ?, uploads\\your_cv_file.pdf, ?)";

 try {
  await db.query(sql, [
   fullName,
   email,
   phone,
   gender,
   university,
   studyArea,
   completionYear,
   resumePath,
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
