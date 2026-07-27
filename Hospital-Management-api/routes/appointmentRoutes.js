const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  assignDoctor
} = require("../controllers/appointmentController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");

router.post("/", isAuthenticated, checkRole(["admin", "receptionist"]), bookAppointment);
router.get("/", isAuthenticated, getAllAppointments);
router.get("/:id", isAuthenticated, getAppointmentById);
router.put("/:id", isAuthenticated, checkRole(["admin", "receptionist"]), updateAppointment);
router.delete("/:id", isAuthenticated, checkRole(["admin", "receptionist"]), cancelAppointment);
router.put("/:id/assign-doctor", isAuthenticated, checkRole(["admin", "receptionist"]), assignDoctor);

module.exports = router;