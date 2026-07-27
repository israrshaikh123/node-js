const Recipe = require('../models/Recipe');
const User = require('../models/User');

exports.listRecipes = async (req, res) => {
  const recipes = await Recipe.find()
    .populate('author', 'username role')
    .sort({ createdAt: -1 });

  res.render('recipeList', { recipes, user: req.user });
};

exports.myRecipes = async (req, res) => {
  const recipes = await Recipe.find({ author: req.user.id })
    .populate('author', 'username role')
    .sort({ createdAt: -1 });

  res.render('myRecipes', { recipes, user: req.user });
};

exports.newRecipeForm = (req, res) => {
  res.render('recipeForm', { recipe: null, user: req.user });
};

exports.createRecipe = async (req, res) => {
  const { title, ingredients, instructions, cuisine, cookingTime, image } = req.body;

  const recipe = await Recipe.create({
    title,
    ingredients: ingredients.split(',').map((i) => i.trim()),
    instructions,
    cuisine,
    cookingTime,
    image: image || undefined,
    author: req.user.id,
  });

  await User.findByIdAndUpdate(req.user.id, { $push: { recipes: recipe._id } });

  res.redirect('/recipes/mine');
};

exports.viewRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
    .populate('author', 'username role')

  if (!recipe) return res.status(404).render('error', { message: 'Recipe not found', user: req.user });

  res.render('recipeItem', { recipe, user: req.user });
};

exports.editRecipeForm = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).render('error', { message: 'Recipe not found', user: req.user });

  if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).render('error', { message: 'Not authorized to edit this recipe', user: req.user });
  }

  res.render('recipeForm', { recipe, user: req.user });
};


exports.updateRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).render('error', { message: 'Recipe not found', user: req.user });

  if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).render('error', { message: 'Not authorized to edit this recipe', user: req.user });
  }

  const { title, ingredients, instructions, cuisine, cookingTime, image } = req.body;

  recipe.title = title;
  recipe.ingredients = ingredients.split(',').map((i) => i.trim());
  recipe.instructions = instructions;
  recipe.cuisine = cuisine;
  recipe.cookingTime = cookingTime;
  if (image) recipe.image = image;

  await recipe.save();
  res.redirect(`/recipes/${recipe._id}`);
};


exports.deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.status(404).render('error', { message: 'Recipe not found', user: req.user });

  if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).render('error', { message: 'Not authorized to delete this recipe', user: req.user });
  }

  await recipe.deleteOne();
  await User.findByIdAndUpdate(recipe.author, { $pull: { recipes: recipe._id } });

  res.redirect('/recipes/mine');
};
