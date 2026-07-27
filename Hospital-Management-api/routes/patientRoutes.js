const express = require("express");
const router = express.Router();
const {
  registerPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require("../controllers/patientController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");

router.post("/", isAuthenticated, checkRole(["admin", "receptionist"]), registerPatient);
router.get("/", isAuthenticated, getAllPatients);
router.get("/:id", isAuthenticated, getPatientById);
router.put("/:id", isAuthenticated, checkRole(["admin", "receptionist"]), updatePatient);
router.delete("/:id", isAuthenticated, checkRole(["admin"]), deletePatient);

module.exports = router;