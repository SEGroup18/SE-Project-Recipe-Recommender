const Recipe = require("../models/Recipe");
const User = require("../models/User");

exports.createRecipe = (req, res) => {
  const recipe = new Recipe(req.body);
  recipe.save((err, recipe) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    return res.send(recipe);
  });
};

exports.getAllRecipes = (req, res) => {
  Recipe.find()
    .limit(1000)
    .exec((err, recipes) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      res.send(recipes);
    });
};

exports.getIngredients = (req, res) => {
  Recipe.aggregate([
    { $unwind: "$ingredients" },
    { $group: { _id: null, allItems: { $addToSet: "$ingredients" } } },
    { $project: { _id: 0, allItems: 1 } },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    res.send(data[0]["allItems"]);
  });
};

exports.getRecipesByIngredient = (req, res) => {
  const { ingredients } = req.body;
  Recipe.find({ ingredients: { $all: ingredients } }).exec((err, recipes) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    res.send(recipes);
  });
};

exports.addHistory =  async (req, res) => {
  try {
    const { userId, history } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (history) {
      user.history = history;
      await user.save();
      await user.populate('history');

      return res.status(200).json({
        message: "Recipe saved successfully",
        success: true,
        data: user.history,
      });
    } else {
      await user.populate('history');

      return res.status(200).json({
        message: "List of saved recipes retrieved",
        success: true,
        data: user.history,
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
      success: false,
    });
  }
};

exports.getSomeRecipes = (req, res) => {
  Recipe.aggregate()
    .sample(50)
    .exec((err, recipes) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      res.send(recipes);
    });
};

exports.getRecipe = (req, res) => {
  const { recipeID } = req.params;
  Recipe.findOne({ _id: recipeID }).exec((err, recipe) => {
    if (err) {
      return res.status(400).send({ error: err });
    }
    if (!recipe) {
      return res.status(400).send({ error: "No recipe found" });
    }

    res.send(recipe);
  });
};

exports.updateRecipe = (req, res) => {
  const { recipeID } = req.params;
  Recipe.findOneAndUpdate({ _id: recipeID }, { ...req.body }).exec(
    (err, _result) => {
      if (err) {
        return res.status(400).send({ error: err });
      }

      res.send({ msg: "Updated successfully" });
    }
  );
};

exports.deleteRecipe = (req, res) => {
  const { recipeID } = req.params;
  Recipe.findOneAndDelete({ _id: recipeID }).exec((err, _result) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    res.send({ msg: "successfully deleted" });
  });
};
