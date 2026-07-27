const express = require("express");
const router = express.Router();
const { register, login, logout, changePassword } = require("../controllers/authController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/change-password", isAuthenticated, changePassword);

module.exports = router;