const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getSomeRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getIngredients,
  getRecipesByIngredient,
  // getHistory,
  // addHistory
} = require("../controllers/recipe");
const router = express.Router();

router.post("/add", createRecipe);
router.get("/all", getAllRecipes);
router.post("/recipeByIngredient", getRecipesByIngredient);
// router.get("/history", getHistory);
// router.post("/history", addHistory);
router.get("/ingredients", getIngredients);
router.get("/some", getSomeRecipes);
router.get("/:recipeID", getRecipe);
router.patch("/:recipeID", updateRecipe);
router.delete("/:recipeID", deleteRecipe);

module.exports = router;
