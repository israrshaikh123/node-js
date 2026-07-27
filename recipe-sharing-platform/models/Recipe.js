const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      default: 'General',
    },
    cookingTime: {
      type: Number,
      default: 30,
    },
    image: {
      type: String,
      default: '/images/default-recipe.jpg',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
