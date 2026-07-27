const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { protect } = require('../middleware/auth');

router.get('/', protect, recipeController.listRecipes);

router.get('/mine', protect, recipeController.myRecipes);
router.get('/new', protect, recipeController.newRecipeForm);
router.post('/', protect, recipeController.createRecipe);

router.get('/:id', protect, recipeController.viewRecipe);
router.get('/:id/edit', protect, recipeController.editRecipeForm);
router.put('/:id', protect, recipeController.updateRecipe);
router.delete('/:id', protect, recipeController.deleteRecipe);

module.exports = router;
