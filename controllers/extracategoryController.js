const Extracategory = require('../models/ExtraCategory.js');
const Subcategory = require('../models/Subcategory.js');

const extracategoryController = {
    addExtracategory: async (req, res) => {
        const subcategories = await Subcategory.find().populate("category");
        res.render("addExtracategory", { subcategories });
    },

    addExtracategorySubmit: async (req, res) => {
        const { name, subcategory } = req.body;
        await Extracategory.create({ name, subcategory });
        req.flash("success", "Extracategory added successfully");
        res.redirect("/viewExtracategory");
    },

    viewExtracategory: async (req, res) => {
        const extracategories = await Extracategory.find().populate({
            path: "subcategory",
            populate: { path: "category" }
        });
        res.render("viewExtracategory", { extracategories });
    },

    editExtracategory: async (req, res) => {
        const extracategory = await Extracategory.findById(req.params.id);
        const subcategories = await Subcategory.find().populate("category");
        res.render("editExtracategory", { extracategory, subcategories });
    },

    editExtracategorySubmit: async (req, res) => {
        const { name, subcategory } = req.body;
        await Extracategory.findByIdAndUpdate(req.params.id, { name, subcategory });
        req.flash("success", "Extracategory updated successfully");
        res.redirect("/viewExtracategory");
    },

    deleteExtracategory: async (req, res) => {
        await Extracategory.findByIdAndDelete(req.params.id);
        req.flash("success", "Extracategory deleted successfully");
        res.redirect("/viewExtracategory");
    },
};

module.exports = extracategoryController;