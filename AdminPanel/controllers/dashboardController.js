const User = require("../models/User.js");
const Category = require("../models/Category.js");
const Subcategory = require("../models/Subcategory.js");
const Extracategory = require("../models/ExtraCategory.js");
const Product = require("../models/Product.js");

const bcrypt = require("bcrypt");

const dashboardController = {
  index: async (req, res) => {
    const categoryCount = await Category.countDocuments();
    const subcategoryCount = await Subcategory.countDocuments();
    const extracategoryCount = await Extracategory.countDocuments();
    const productCount = await Product.countDocuments();

    res.render("dashboard", {
      categoryCount,
      subcategoryCount,
      extracategoryCount,
      productCount,
      activePage: "dashboard",
    });
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
    res.render("signup", { activePage: "signup" });
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

  logout: (req, res, next) => {
    req.logout((err) => {
      if (err) {
        next(err);
      }
      res.redirect("/login");
    });
  },
};
module.exports = dashboardController;
