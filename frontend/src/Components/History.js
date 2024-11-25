import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Chip,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { server } from "../utils";

export const History = () => {
  const [groupedRecipes, setGroupedRecipes] = useState([]);
  const user = useRef(JSON.parse(localStorage.getItem("user")));
  const [savedRecipe, setSavedRecipe] = useState(
    JSON.parse(localStorage.getItem("savedRecipe")) || user.current.history
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipeDetails = {};

      for (const { recipeId } of savedRecipe) {
		console.log(recipeDetails, recipeId);
        try {
          if (!recipeDetails[recipeId]) {
            const response = await server.get(`/recipe/${recipeId}`);
            recipeDetails[recipeId] = response.data;
          }
        } catch (error) {
          console.error(`Error fetching recipe with id ${recipeId}:`, error);
        }
      }

      const groupedByDate = savedRecipe.reduce((acc, { recipeId, timestamp }) => {
        const date = new Date(timestamp).toLocaleDateString();
        if (!acc[date]) acc[date] = { recipes: [], totalCalories: 0 };

        const recipe = recipeDetails[recipeId];
        if (recipe) {
          acc[date].recipes.push(recipe);

          const calories =
            recipe.nutrients?.calories
              ? parseInt(recipe.nutrients.calories)
              : 0;

          acc[date].totalCalories += calories;
        }
        return acc;
      }, {});

      setGroupedRecipes(
        Object.entries(groupedByDate).map(([date, data]) => ({
          date,
          recipes: data.recipes,
          totalCalories: data.totalCalories,
        }))
      );
    };

    fetchRecipes();
  }, [savedRecipe]);

  const handleRemoveFromHistory = (recipe) => {
    const modifiedRecipe = savedRecipe.filter(
      (r) => r.recipeId !== recipe._id
    );

    server
      .post("/recipe/history", { history: modifiedRecipe, userId: user.current._id })
      .then((response) => {
        console.log("Recipe removed successfully:", response.data);
        localStorage.setItem("savedRecipe", JSON.stringify(modifiedRecipe));
        setSavedRecipe(modifiedRecipe);

        setGroupedRecipes((prevGroupedRecipes) =>
          prevGroupedRecipes.map((group) => ({
            ...group,
            recipes: group.recipes.filter((r) => r._id !== recipe._id),
            totalCalories:
              group.totalCalories -
              (recipe.nutrients?.calories?.$numberInt
                ? parseInt(recipe.nutrients.calories.$numberInt)
                : 0),
          })).filter((group) => group.recipes.length > 0)
        );
      })
      .catch((error) => {
        console.error("Error removing recipe:", error);
      });
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Recipe History
      </Typography>

      {groupedRecipes.map(({ date, recipes, totalCalories }) => (
        <Accordion key={date}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {date} - Total Calories: {totalCalories}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {recipes.map((recipe, index) => (
                <React.Fragment key={recipe._id}>
                  <ListItem>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="h5">{recipe.name}</Typography>
                      <Typography variant="body1">{recipe.description}</Typography>
                      <Typography variant="body1">
                        Cooking Time: {recipe.minutes?.$numberInt || recipe.minutes} mins
                      </Typography>
                      <Typography variant="body1">Tags:</Typography>
                      <Grid container spacing={1}>
                        {recipe.tags.map((tag, index) => (
                          <Grid item key={index}>
                            <Chip label={tag} />
                          </Grid>
                        ))}
                      </Grid>
                      <Typography variant="body1" sx={{ marginTop: "8px" }}>
                        Ingredients:
                      </Typography>
                      <List>
                        {recipe.ingredients.map((ingredient, index) => (
                          <ListItem key={index}>
                            <Typography variant="body2">{ingredient}</Typography>
                          </ListItem>
                        ))}
                      </List>
                      <Typography variant="body1" sx={{ marginTop: "8px" }}>
                        Recipe Steps:
                      </Typography>
                      <List>
                        {recipe.steps.map((step, index) => (
                          <ListItem key={index}>
                            <Typography variant="body2">
                              Step {index + 1}: {step}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>

                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                          backgroundColor: "#1976d2",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#115293",
                          },
                          marginTop: "16px",
                        }}
                        onClick={() => handleRemoveFromHistory(recipe)}
                      >
                        Remove from History
                      </Button>
                    </Box>
                  </ListItem>

                  {index !== recipes.length - 1 && (
                    <Divider sx={{ marginY: "16px" }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};