const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  minutes: {
    type: Number,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  steps: [
    {
      type: String,
      trim: true,
    },
  ],
  ingredients: [
    {
      type: String,
      trim: true,
    },
  ],
  nutrients: {
    calories: {
      type: Number,
    },
    protein: {
      type: Number,
    },
    fat: {
      type: Number,
    },
    sugar: {
      type: Number,
    },
    sodium: {
      type: Number,
    },
    iron: {
      type: Number,
    },
    vitamin_c: {
      type: Number,
    },
    cholesterol: {
      type: Number,
    },
    trans_fat: {
      type: Number,
    },
    calcium: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
