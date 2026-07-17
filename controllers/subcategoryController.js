const Subcategory = require('../models/Subcategory.js');
const Category = require('../models/Category.js');

const subcategoryController = {
    addSubcategory: async (req, res) => {
        const categories = await Category.find();
        res.render("addSubcategory", { categories: categories });
    },

    addSubcategorySubmit: async (req, res) => {
        const { name, category } = req.body;
        await Subcategory.create({ name, category });
        req.flash("success", "Subcategory added successfully");
        res.redirect("/viewSubcategory");
    },

    viewSubcategory: async (req, res) => {
        const subcategories = await Subcategory.find().populate("category");
        res.render("viewSubcategory", { subcategories: subcategories });
    },

    editSubcategory: async (req, res) => {
        const subcategory = await Subcategory.findById(req.params.id);
        const categories = await Category.find();
        res.render("editSubcategory", { subcategory, categories });
    },

    editSubcategorySubmit: async (req, res) => {
        const { name, category } = req.body;
        await Subcategory.findByIdAndUpdate(req.params.id, { name, category });
        req.flash("success", "Subcategory updated successfully");
        res.redirect("/viewSubcategory");
    },

    deleteSubcategory: async (req, res) => {
        await Subcategory.findByIdAndDelete(req.params.id);
        req.flash("success", "Subcategory deleted successfully");
        res.redirect("/viewSubcategory");
    },
};

module.exports = subcategoryController;