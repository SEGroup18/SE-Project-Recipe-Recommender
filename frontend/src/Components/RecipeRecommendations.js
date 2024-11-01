import * as React from "react";
import { Typography, CardContent, Card, Box, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRef, useState, useEffect } from "react";
import "./ToggleSwitch.css";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";
import { server } from "../utils";

/**
 * RecipeRecommendations Component
 * Displays a list of recommended recipes and allows users to add them to their cart or save them to their history.
 */
const RecipeRecommendations = () => {
  // Access the global state to get recipe recommendations
  const [{ recommendations }, dispatch] = useStateValue();

  // State to manage the user's cart (selected recipes)
  const [cart, addItem] = useState([]);

  /**
   * Handles changes in the toggle switch for adding/removing recipes to/from the cart.
   * @param {Object} e - The event object.
   * @param {string} recipe_name - The name of the recipe being toggled.
   * @param {Array} ingredients - The list of ingredients for the recipe.
   */
  const handleChange = (e, recipe_name, ingredients) => {
    if (e.target.checked === true) {
      // Add the recipe to the cart if checked
      addItem((old_cart) => [...old_cart, { name: recipe_name, ingredients: ingredients }]);
    } else {
      // Remove the recipe from the cart if unchecked
      console.log("Remove");
      addItem((current) =>
        current.filter((element) => {
          return element.name !== recipe_name;
        })
      );
    }
  };

  // Navigation hook for redirecting users
  const navigate = useNavigate();

  // Fetch user details and saved recipe history from local storage
  const user = useRef(JSON.parse(localStorage.getItem("user")));
  const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || user.current.history);

  /**
   * Handles saving or removing a recipe from the user's history.
   * @param {Object} recipe - The recipe object to be saved or removed.
   */
  const handlePostRequest = (recipe) => {
    const isPresent = savedRecipe.includes(recipe._id); // Check if the recipe is already in history
    let modifiedRecipe = [];

    if (isPresent) {
      // Remove recipe from history if it's already present
      modifiedRecipe = savedRecipe.filter((id) => id !== recipe._id);
    } else {
      // Add recipe to history if it's not present
      modifiedRecipe = [...savedRecipe, recipe._id];
    }

    // Update history on the server and local storage
    server.post("/recipe/history", { history: modifiedRecipe, userId: user.current._id })
      .then((response) => {
        console.log("Recipe saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving recipe:", error);
      });

    localStorage.setItem("savedRecipe", JSON.stringify(modifiedRecipe)); // Update local storage
    setSavedRecipe(modifiedRecipe); // Update state with modified history
  };

  return (
    <Box>
      <Typography variant="h5">Here are our recommendations:</Typography>

      {/* Render list of recommended recipes */}
      {recommendations.map((key) => {
        return (
          <Accordion key={key._id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>{key.name.charAt(0).toUpperCase() + key.name.slice(1)}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {/* Toggle switch for adding/removing recipes to/from cart */}
              <input type="checkbox" onChange={(e) => handleChange(e, key.name, key.ingredients)} />

              {/* Button to save or remove recipe from history */}
              <Button onClick={() => handlePostRequest(key)}>
                {savedRecipe.includes(key._id) ? "Remove from History" : "Add to History"}
              </Button>

              {/* Display cooking time */}
              <Typography variant="body2">Cooking time: {key.minutes} mins</Typography>

              {/* Display ingredients */}
              <Typography variant="body2">Ingredients: {key.ingredients.join(", ")}</Typography>

              {/* Display steps */}
              <Typography variant="body2">Steps:</Typography>
              {key.steps.map((data, index) => (
                <Typography key={index} variant="body2">{data}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* Button to proceed with selected recipes in cart */}
      <Button variant="contained" color="primary" onClick={() => navigate("/cart")}>
        Proceed with Selected Recipes
      </Button>
    </Box>
  );
};

export default RecipeRecommendations;