const express = require("express");
const router = express.Router();
const {
  uploadReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport
} = require("../controllers/medicalReportController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");
const upload = require("../config/multer.js");

router.post("/", isAuthenticated, checkRole(["admin", "doctor", "receptionist"]), upload.single("reportFile"), uploadReport);
router.get("/", isAuthenticated, getAllReports);
router.get("/:id", isAuthenticated, getReportById);
router.put("/:id", isAuthenticated, checkRole(["admin", "doctor", "receptionist"]), upload.single("reportFile"), updateReport);
router.delete("/:id", isAuthenticated, checkRole(["admin"]), deleteReport);

module.exports = router;