const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const dashboardController = {
  index: (req, res) => {
    res.render("dashboard", { activePage: "dashboard" });
  },
  tables: (req, res) => {
    res.render("tables", { activePage: "tables" });
  },
  forms: (req, res) => {
    res.render("forms", { activePage: "forms" });
  },
  login: (req, res) => {
    res.render("login", { activePage: "login" });
  },
  mailbox: (req, res) => {
    res.render("mailbox", { activePage: "mailbox" });
  },

  signup: (req, res) => {
    res.render("signup");
  },

  signupSubmit: async (req, res) => {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await User.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
    res.redirect("/");
  },

  loginSubmit: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      res.send("User Not Found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      console.log(isMatch);

      if (isMatch === true) {
        res.cookie("userId", user._id);
        res.redirect("/");
      } else {
        res.send("Invalaid Password");
      }
    }
  },

  logout: (req, res) => {
    res.clearCookie("userId");
    res.redirect("/login");
  },
};
module.exports = dashboardController;
