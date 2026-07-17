const mongoose = require("mongoose");

const extracategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

const Extracategory = mongoose.model("Extracategory", extracategorySchema);
module.exports = Extracategory;
