const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;