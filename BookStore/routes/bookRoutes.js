const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

module.exports = (upload) => {
  router.get("/", bookController.index);
  router.get("/add-book", bookController.addBookPage);
  router.post("/add-book", upload.single("image"), bookController.addBook);
  router.get("/edit-book/:id", bookController.editBookPage);
  router.post(
    "/edit-book/:id",
    upload.single("image"),
    bookController.editBook,
  );
  router.get("/delete-book/:id", bookController.deleteBook);

  return router;
};
