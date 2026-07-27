const express = require("express");
const app = express();
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todoRoutes");

mongoose
  .connect("mongodb://localhost:27017/todoapp")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", todoRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The Server is Running on Port ${PORT}`);
  console.log("http://localhost:8000");
});
