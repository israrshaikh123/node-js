const express = require("express");
const router = express.Router();
const {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} = require("../controllers/departmentController.js");
const isAuthenticated = require("../middlewares/isAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");

router.post("/", isAuthenticated, checkRole(["admin"]), addDepartment);
router.get("/", isAuthenticated, getAllDepartments);
router.get("/:id", isAuthenticated, getDepartmentById);
router.put("/:id", isAuthenticated, checkRole(["admin"]), updateDepartment);
router.delete("/:id", isAuthenticated, checkRole(["admin"]), deleteDepartment);

module.exports = router;