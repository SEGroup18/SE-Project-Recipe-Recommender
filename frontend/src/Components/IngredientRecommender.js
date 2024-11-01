import React, { useRef, useEffect, useState } from "react";
import { Box, Autocomplete, Button, Grid, Pagination } from "@mui/material";
import { server } from "../utils";

/**
 * IngredientRecommender Component
 * This component allows users to search for recipes based on selected ingredients.
 * It also lets users save or remove recipes from their history.
 */
export const IngredientRecommender = () => {
  // State to manage available ingredient options
  const [options, setOptions] = useState([]);

  // State to manage selected ingredients by the user
  const [selectedOptions, setSelectedOptions] = useState([]);

  // State to hold the fetched recipes based on selected ingredients
  const [recipes, setRecipes] = useState([]);

  // State to handle pagination of recipes
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of recipes displayed per page

  // Fetch available ingredients when the component mounts
  useEffect(() => {
    server.get("/recipe/ingredients")
      .then((data) => {
        setOptions(data.data.map((r) => ({ title: r })));
      })
      .catch((err) => alert(err.response.data.error));
  }, []);

  // Handle search request based on selected ingredients
  const handleSearch = () => {
    server.post("/recipe/recipeByIngredient", {
      ingredients: selectedOptions.map((o) => o.title),
    })
    .then((data) => {
      setRecipes(data.data);
      setCurrentPage(1); // Reset to first page on new search
    })
    .catch((err) => alert(err.response.data.error));
  };

  // Pagination logic to slice recipes for current page display
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  // Calculate total pages for pagination
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  // Fetch user details and saved recipe history from local storage
  const user = useRef(JSON.parse(localStorage.getItem("user")));
  const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || user.current.history);

  /**
   * Handle saving or removing a recipe from the user's history.
   * @param {Object} recipe - The recipe object to be saved or removed.
   */
  const handlePostRequest = (recipe) => {
    const isPresent = savedRecipe.includes(recipe._id); // Check if the recipe is already saved in history
    let modifiedRecipe = [];

    if (isPresent) {
      // Remove recipe from history if it's already present
      modifiedRecipe = savedRecipe.filter(id => id !== recipe._id);
    } else {
      // Add recipe to history if it's not present
      modifiedRecipe = [...savedRecipe, recipe._id];
    }

    // Update history on the server and local storage
    server.post('/recipe/history', { history: modifiedRecipe, userId: user.current._id })
      .then(response => {
        console.log('Recipe saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving recipe:', error);
      });

    localStorage.setItem("savedRecipe", JSON.stringify(modifiedRecipe)); // Update local storage
    setSavedRecipe(modifiedRecipe); // Update state with modified history
  };

  return (
    <div>
      {/* Render search input and button */}
      <Autocomplete 
        options={options} 
        value={selectedOptions}
        onChange={(event, newValue) => setSelectedOptions(newValue)}
        renderInput={(params) => <TextField {...params} label="Search Ingredients" />}
      />
      <Button onClick={handleSearch}>Search Recipes</Button>

      {/* Render paginated list of recipes */}
      <Grid container spacing={2}>
        {currentRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Recipe 
              recipe={recipe}
              handlePostRequest={handlePostRequest}
              savedRecipe={savedRecipe}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination controls */}
      <Pagination 
        count={totalPages} 
        page={currentPage} 
        onChange={(event, value) => setCurrentPage(value)} 
        variant="outlined" 
        shape="rounded"
      />
    </div>
  );
};

/**
 * Recipe Component
 * Displays individual recipe details and allows users to save or remove it from their history.
 * @param {Object} props - The props for the component.
 */
const Recipe = ({ recipe, handlePostRequest, savedRecipe }) => {
  return (
    <Card>
      <Typography variant="h6">{recipe.name}</Typography>
      
      {/* Display tags associated with the recipe */}
      {recipe.tags.map((tag) => (
        <Chip key={tag} label={tag} />
      ))}

      {/* Display cooking time if available */}
      {recipe.minutes && (
        <Typography>Cooking Time: {recipe.minutes} minutes</Typography>
      )}

      {/* Display steps and ingredients */}
      <Typography>Steps:</Typography>
      {recipe.steps.map((step, index) => (
        <Typography key={index}>{step}</Typography>
      ))}

      <Typography>Ingredients:</Typography>
      {recipe.ingredients.map((ingredient, index) => (
        <Typography key={index}>{ingredient}</Typography>
      ))}

      {/* Button to add or remove recipe from history */}
      <Button onClick={() => handlePostRequest(recipe)}>
        {savedRecipe.includes(recipe._id) ? "Remove from History" : "Add to History"}
      </Button>
    </Card>
  );
};

export default IngredientRecommender;