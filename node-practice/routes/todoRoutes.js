const express = require("express");
const router = express.Router();

const indexController = require("../controllers/todoController");

router.get("/", indexController.index);

router.post("/add", indexController.addTask);

router.post("/delete/:id", indexController.deleteTask);

router.get("/edit/:id", indexController.getEdit);

router.post("/edit/:id", indexController.postEdit);

module.exports = router;