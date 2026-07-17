const express = require("express");
const router = express.Router();
const upload = require("../config/multer.js");

const dashboardController = require("../controllers/dashboardController");
const categoryController = require("../controllers/categoryController.js");
const subcategoryController = require("../controllers/subcategoryController.js");
const extracategoryController = require("../controllers/extracategoryController.js");
const productController = require("../controllers/productController.js");
const profileController = require("../controllers/profileController.js");
const passwordController = require("../controllers/passwordController.js");
const adminController = require('../controllers/adminController.js')

const isAuthenticated = require("../middlewares/setAuthenticated.js");
const checkRole = require("../middlewares/checkRole.js");
const passport = require("passport");

// Dashboard
router.get(
  "/",
  isAuthenticated,
  dashboardController.index,
);
router.get("/tables", isAuthenticated, dashboardController.tables);
router.get("/forms", isAuthenticated, dashboardController.forms);
router.get("/mailbox", isAuthenticated, dashboardController.mailbox);

// Auth
router.get("/signup", dashboardController.signup);
router.post("/signup", dashboardController.signupSubmit);
router.get("/login", dashboardController.login);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);
router.get("/logout", dashboardController.logout);

// Profile
router.get("/profile", isAuthenticated, profileController.viewProfile);
router.get(
  "/changePassword",
  isAuthenticated,
  profileController.changePassword,
);
router.post(
  "/changePassword",
  isAuthenticated,
  profileController.changePasswordSubmit,
);

// Forgot/Reset Password
router.get("/forgotPassword", passwordController.forgotPassword);
router.post("/forgotPassword", passwordController.forgotPasswordSubmit);
router.get("/verifyOtp", passwordController.verifyOtp);
router.post("/verifyOtp", passwordController.verifyOtpSubmit);
router.get("/resetPassword", passwordController.resetPassword);
router.post("/resetPassword", passwordController.resetPasswordSubmit);

// Category (superadmin, admin, manager)
router.get(
  "/viewCategory",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  categoryController.viewCategory,
);
router.get(
  "/addCategory",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  categoryController.addCategory,
);
router.post(
  "/addCategory",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  categoryController.addCategorySubmit,
);
router.get(
  "/editCategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  categoryController.editCategory,
);
router.post(
  "/editCategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  categoryController.editCategorySubmit,
);
router.get(
  "/deleteCategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  categoryController.deleteCategory,
);

// Subcategory (superadmin, admin)
router.get(
  "/addSubcategory",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  subcategoryController.addSubcategory,
);
router.post(
  "/addSubcategory",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  subcategoryController.addSubcategorySubmit,
);
router.get(
  "/viewSubcategory",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  subcategoryController.viewSubcategory,
);
router.get(
  "/editSubcategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  subcategoryController.editSubcategory,
);
router.post(
  "/editSubcategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  subcategoryController.editSubcategorySubmit,
);
router.get(
  "/deleteSubcategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  subcategoryController.deleteSubcategory,
);

// Extracategory (superadmin, admin)
router.get(
  "/addExtracategory",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  extracategoryController.addExtracategory,
);
router.post(
  "/addExtracategory",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  extracategoryController.addExtracategorySubmit,
);
router.get(
  "/viewExtracategory",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  extracategoryController.viewExtracategory,
);
router.get(
  "/editExtracategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  extracategoryController.editExtracategory,
);
router.post(
  "/editExtracategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  extracategoryController.editExtracategorySubmit,
);
router.get(
  "/deleteExtracategory/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin"]),
  extracategoryController.deleteExtracategory,
);

// Product (superadmin, admin, manager, employee)
router.get(
  "/addProduct",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  productController.addProduct,
);
router.post(
  "/addProduct",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  upload.single("image"),
  productController.addProductSubmit,
);
router.get(
  "/viewProduct",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager", "employee"]),
  productController.viewProduct,
);
router.get(
  "/editProduct/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  productController.editProduct,
);
router.post(
  "/editProduct/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  upload.single("image"),
  productController.editProductSubmit,
);
router.get(
  "/deleteProduct/:id",
  isAuthenticated,
  checkRole(["superadmin", "admin", "manager"]),
  productController.deleteProduct,
);

router.get(
  "/viewUsers",
  isAuthenticated,
  checkRole(["superadmin"]),
  adminController.viewUsers,
);
router.post(
  "/updateUserRole/:id",
  isAuthenticated,
  checkRole(["superadmin"]),
  adminController.updateUserRole,
);

module.exports = router;
