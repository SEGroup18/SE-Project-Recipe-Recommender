import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, ListItem, Button } from "@mui/material";
import { server } from "../utils";

/**
 * History Component
 * Displays the list of recipes that the user has saved in their history.
 */
export const History = () => {
  
  // Fetch user details and saved recipe history from local storage
  const user = useRef(JSON.parse(localStorage.getItem("user")));
  
  // State to manage saved recipes in user's history
  const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || user.current.history);
  
  // State to manage fetched recipes data to display in history
  const [recipes, setRecipes] = useState([]);

  /**
   * Fetch all saved recipes using their IDs when the component mounts.
   */
  useEffect(() => {
    const fetchRecipes = async () => {
      
      const fetchedRecipes = [];
      
      for (const recipeId of savedRecipe) {
        try {
          const response = await server.get(`/recipe/${recipeId}`);
          fetchedRecipes.push(response.data); // Add each fetched recipe data to the list
        } catch (error) {
          console.error(`Error fetching recipe with id ${recipeId}:`, error);
        }
      }

      setRecipes(fetchedRecipes); // Update state with fetched recipes data

    };

    fetchRecipes();
    
  }, [savedRecipe]);

  /**
   * Handle removing a recipe from the user's history.
   * @param {Object} recipe - The recipe object to be removed.
   */
  const handlePostRequest = (recipe) => {

    let modifiedRecipe = savedRecipe.filter(id => id !== recipe._id); // Remove the selected recipe

    server.post('/recipe/history', {history: modifiedRecipe, userId: user.current._id})
    .then(response => {
      
      console.log('Recipe removed successfully:', response.data);
      
      localStorage.setItem("savedRecipe", JSON.stringify(modifiedRecipe)); // Update local storage
      
      setSavedRecipe(modifiedRecipe); // Update state with modified history
      
      setRecipes(recipes.filter(r => r._id !== recipe._id)); // Remove from displayed list

    })
    .catch(error => console.error('Error removing recipe:', error));
    
  };

  return (
    <Box>
      
      {/* Render list of saved recipes */}
      {recipes.map((recipe) => (
        <ListItem key={recipe._id}>
          <Typography>{recipe.name}</Typography>

          {/* Button to remove a recipe from history */}
          <Button onClick={() => handlePostRequest(recipe)}>Remove from History</Button>
          
        </ListItem>
        
       ))}
       
     </Box>
   );
};

export default History;