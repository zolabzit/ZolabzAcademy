const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
 cors({
  origin: "*",
  methods: ["POST", "GET"],
  credentials: true,
 })
);
app.use("/api/freereg", router);
const dbConfig = {
 host: "localhost",
 user: "root",
 password: "Saran@123",
 database: "zolabz_academy",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
 if (err) {
  console.error("MySQL connection error: " + err);
  return;
 }
 console.log("Connected to database");
});

//api for free class registration

router.post("/", (req, res) => {
 const { name, email, phone } = req.body;
 console.log(req.body);

 const sql = "INSERT INTO free_class_reg (name, email, phone) VALUES (?, ?, ?)";
 console.log("Sql query", sql);
 //   const sql =
 //    "INSERT INTO free_class_reg (name, email, phone) VALUES (saranya, saranya@mail.com, 9876543210)";
 db.query(sql, [name, email, phone], (err) => {
  if (err) {
   console.error("errrrrrorrrrrrrr mesggggggggg", err);
   console.log("******************errrrrrorr", req.body);
   res.status(500).json({ error: "Failed to save the submission." });
  } else {
   res.json({ message: "Submission saved successfully." });
  }
 });
});

//  db.query(sql, ["saranya", "saranya@gmail.com", "9876543210"], (err) => {
//   if (err) {
//    console.error(err);
//    res.status(500).json({ error: "Failed to save the submission." });
//   } else {
//    res.json({ message: "Submission saved successfully." });
//   }
//  });
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
