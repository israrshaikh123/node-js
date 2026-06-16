const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/bookstore")
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"));
const bookRoutes = require("./routes/bookRoutes");
app.use("/", bookRoutes(upload));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost${PORT}`);
});