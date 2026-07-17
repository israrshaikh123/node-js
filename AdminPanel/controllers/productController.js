const Product = require("../models/Product.js");
const Extracategory = require("../models/ExtraCategory.js");

const productController = {
  addProduct: async (req, res) => {
    const extracategories = await Extracategory.find();
    res.render("addProduct", { extracategories });
  },

  addProductSubmit: async (req, res) => {
    const { name, price, extracategory } = req.body;
    const image = req.file ? req.file.filename : null;
    await Product.create({ name, price, extracategory, image });
    req.flash("success", "Product added successfully");
    res.redirect("/viewProduct");
  },

  viewProduct: async (req, res) => {
    const products = await Product.find().populate({
      path: "extracategory",
      populate: { path: "subcategory", populate: { path: "category" } },
    });
    res.render("viewProduct", { products });
  },

  editProduct: async (req, res) => {
    const product = await Product.findById(req.params.id);
    const extracategories = await Extracategory.find();
    res.render("editProduct", { product, extracategories });
  },

  editProductSubmit: async (req, res) => {
    const { name, price, extracategory } = req.body;
    const updateData = { name, price, extracategory };
    if (req.file) updateData.image = req.file.filename;
    await Product.findByIdAndUpdate(req.params.id, updateData);
    req.flash("success", "Product updated successfully");
    res.redirect("/viewProduct");
  },

  deleteProduct: async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted successfully");
    res.redirect("/viewProduct");
  },
};

module.exports = productController;
