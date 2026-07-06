const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const authMiddleware = require("../middlewares/auth.js");

router.get("/", authMiddleware, dashboardController.index);
router.get("/tables", authMiddleware, dashboardController.tables);
router.get("/forms", authMiddleware, dashboardController.forms);
router.get("/mailbox", authMiddleware, dashboardController.mailbox);

router.get("/signup", dashboardController.signup);
router.post("/signup", dashboardController.signupSubmit);

router.get("/login", dashboardController.login);
router.post("/login", dashboardController.loginSubmit);

router.get("/logout", dashboardController.logout);

module.exports = router;
