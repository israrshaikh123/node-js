require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
require("./config/passport");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  expressSession({
    secret: "SecretKeyIsrar",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

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

console.log("EMAIL:", process.env.EMAIL_USER);