const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const isAuthenticated = require("../middlewares/setAuthenticated.js");
const passport = require("passport");

router.get("/", isAuthenticated, dashboardController.index);
router.get("/tables", isAuthenticated, dashboardController.tables);
router.get("/forms", isAuthenticated, dashboardController.forms);
router.get("/mailbox", isAuthenticated, dashboardController.mailbox);

router.get("/signup", dashboardController.signup);
router.post("/signup", dashboardController.signupSubmit);

router.get("/login", dashboardController.login);
router.post("/login", passport.authenticate("local", {
    successRedirect : "/",
    failureRedirect : "/login"
}));

router.get("/logout", dashboardController.logout);

module.exports = router;
