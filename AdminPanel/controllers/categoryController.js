const Category = require("../models/Category.js");

const categoryController = {
  addCategory: (req, res) => {
    res.render("addCategory");
  },

  addCategorySubmit: async (req, res) => {
    const name = req.body.name;
    await Category.create({
      name: name,
    });
    req.flash("success" , "Category Added Successfully")
    res.redirect("/viewCategory");
  },

  viewCategory: async (req, res) => {
    const categories = await Category.find();
    res.render("viewCategory", { categories: categories });
  },

  editCategory: async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.render("editCategory" , { category : category});
  },

  editCategorySubmit: async (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const category = await Category.findByIdAndUpdate(id, {
      name: name,
    });
    req.flash("success" , "Category Updated Successfully")
    res.redirect("/viewCategory");
  },

  deleteCategory: async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findByIdAndDelete(categoryId);
    req.flash("success" , "Category Deleted Successfully")
    res.redirect("/viewCategory");
  },
};

module.exports = categoryController;
