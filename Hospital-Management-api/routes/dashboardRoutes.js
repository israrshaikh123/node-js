const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");

router.get("/", isAuthenticated, checkRole(["admin"]), getDashboardStats);

module.exports = router;