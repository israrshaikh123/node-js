const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");  

app.set("view engine", "ejs");
app.use(express.static("public")); 
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/", dashboardRoutes);

mongoose
  .connect("mongodb://localhost:27017/adminpanel")
  .then(() => {
    console.log("Mongo DB Connected successfully");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("http://localhost:8000");
});
