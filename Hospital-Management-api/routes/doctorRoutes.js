const express = require("express");
const router = express.Router();
const {
  addDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require("../controllers/doctorController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");
const upload = require("../config/multer.js");

router.post("/", isAuthenticated, checkRole(["admin"]), upload.single("profileImage"), addDoctor);
router.get("/", isAuthenticated, getAllDoctors);
router.get("/:id", isAuthenticated, getDoctorById);
router.put("/:id", isAuthenticated, checkRole(["admin"]), upload.single("profileImage"), updateDoctor);
router.delete("/:id", isAuthenticated, checkRole(["admin"]), deleteDoctor);

module.exports = router;