import React, { useRef, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Autocomplete,
  Typography,
  Chip,
  List,
  ListItem,
  Button,
  Grid,
} from "@mui/material";
import { server } from "../utils";

export const IngredientRecommender = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleSearch = () => {
    server
      .post("/recipe/recipeByIngredient", {
        ingredients: selectedOptions.map((o) => o.title),
      })
      .then((data) => {
        setRecipes(data.data);
      })
      .catch((err) => alert(err.response.data.error));
  };

  useEffect(() => {
    server
      .get("/recipe/ingredients")
      .then((data) => {
        setOptions(
          data.data.map((r) => {
            return { title: r };
          })
        );
      })
      .catch((err) => alert(err.response.data.error));
  }, []);

  return (
    <Box sx={{ mt: 4, mx: 2 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Unsure what to create? Start by searching for ingredients, and discover
        all the delicious recipes you can make!
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option.title}
          value={selectedOptions}
          onChange={(event, newValue) => {
            setSelectedOptions(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Select Ingredients"
              placeholder="Search..."
              sx={{ minWidth: "500px" }}
            />
          )}
          renderOption={(props, option) => <li {...props}>{option.title}</li>}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ ml: 2 }}>
          Search Recipes
        </Button>
      </Box>
      <br />
      <Grid container spacing={2}>
        {recipes.map((recipe, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Recipe recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Recipe = ({ recipe }) => {

  const [savedRecipe, setSavedRecipe] = useState([]);
  const user = useRef(JSON.parse(localStorage.getItem("user")));

  useEffect(() => { 
    console.log(user.current.history);
    setSavedRecipe(user.current.history);
  }, []);

  const handlePostRequest = (recipe) => {
    const isPresent = savedRecipe.includes(recipe._id);
    console.log(savedRecipe, isPresent, recipe._id, user.current._id);
    let modifiedRecipe = [];
    
    if (isPresent) {
      modifiedRecipe = savedRecipe.filter(id => id !== recipe._id);
    }else{
      modifiedRecipe = [...savedRecipe, recipe._id];      
    }
    server.post('/recipe/history', {history: modifiedRecipe, userId: user.current._id})
        .then(response => {
          console.log('Recipe saved successfully:', response.data);
        })
        .catch(error => {
          console.error('Error saving recipe:', error);
        });  
    localStorage.setItem("savedRecipe", JSON.stringify(modifiedRecipe));
    setSavedRecipe(modifiedRecipe);
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: 2,
        marginBottom: 2,
        boxShadow: 2,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {recipe.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {recipe.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                color="primary"
                sx={{
                  margin: "2px",
                  bgcolor: "#e3f2fd",
                  borderColor: "#2196f3",
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ marginY: 1 }}>
        {recipe.description}
      </Typography>
      {recipe.minutes && (
        <Typography variant="body2" color="text.secondary">
          Cooking Time: {recipe.minutes} minutes
        </Typography>
      )}

      <Grid container spacing={2} sx={{ marginY: 1 }}>
        <Grid item xs={12} sm={8}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Steps:
          </Typography>
          <List dense sx={{ padding: 0 }}>
            {recipe.steps.map((step, index) => (
              <ListItem key={index} sx={{ padding: "4px 0" }}>
                <Typography variant="body2">{step}</Typography>
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Ingredients:
            </Typography>
            <List dense sx={{ padding: 0 }}>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index} sx={{ padding: "4px 0" }}>
                  <Typography variant="body2">{ingredient}</Typography>
                </ListItem>
              ))}
            </List>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                position: 'relative', 
                bottom: 1, 
                right: 1 
              }}
              onClick={() => handlePostRequest(recipe)}
            >
              {savedRecipe.includes(recipe._id) ? "Remove from History" : "Add to History"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IngredientRecommender;
