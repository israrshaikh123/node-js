const express = require("express");
const router = express.Router();
const {
  addPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription
} = require("../controllers/prescriptionController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");

router.post("/", isAuthenticated, checkRole(["doctor"]), addPrescription);
router.get("/", isAuthenticated, getAllPrescriptions);
router.get("/:id", isAuthenticated, getPrescriptionById);
router.put("/:id", isAuthenticated, checkRole(["doctor"]), updatePrescription);
router.delete("/:id", isAuthenticated, checkRole(["doctor", "admin"]), deletePrescription);

module.exports = router;