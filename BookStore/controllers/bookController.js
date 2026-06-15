const Book = require("../models/bookModel");

const bookController = {
  index: async (req, res) => {
    const books = await Book.find();
    res.render("index", { books: books });
  },

  addBookPage: (req, res) => {
    res.render("add-book");
  },

  addBook: async (req, res) => {
    const { title, author, category, price, quantity, description } = req.body;
    const image = req.file ? req.file.filename : "";

    const newBook = new Book({
      title,
      author,
      category,
      price,
      quantity,
      description,
      image,
    });
    await newBook.save();
    res.redirect("/");
  },

  editBookPage: async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render("edit-book", { book: book });
  },
  editBook: async (req, res) => {
    const { title, author, category, price, quantity, description } = req.body;
    const image = req.file ? req.file.filename : "";

    await Book.findByIdAndUpdate(req.params.id, {
      title,
      author,
      category,
      price,
      quantity,
      description,
      image,
    });
    res.redirect("/");
  },

  deleteBook: async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/");
  }
};

module.exports = bookController