import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  Grid,
  Slider,
  Pagination,
} from "@mui/material";
import { server } from "../utils";

export const DietPlan = () => {
    const [staticMinCalories, setStaticMinCalories] = useState(null);
    const [staticMaxCalories, setStaticMaxCalories] = useState(null);
    const [minCalories, setMinCalories] = useState(null);
    const [maxCalories, setMaxCalories] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);

    useEffect(() => {
        server.get("/recipe/minMaxCalories").then((data) => {
            setStaticMinCalories(data.data.minCalories);
            setMinCalories(data.data.minCalories);
            setStaticMaxCalories(data.data.maxCalories);
            setMaxCalories(data.data.maxCalories);
        });
    }, []);

    useEffect(() => {
        server
        .get("/recipe/dietPlan")
        .then((data) => {
            setRecipes(data.data);
        })
        .catch((err) => alert(err.response.data.error));
    }, [minCalories, maxCalories]);

    useEffect(() => {
        const filteredRecipes = recipes.filter(
        (recipe) =>
            recipe.nutrients.calories >= minCalories && recipe.nutrients.calories <= maxCalories
        );

        const sortedRecipies = filteredRecipes.sort((a, b) => a.nutrients.calories - b.nutrients.calories);
        setFilteredRecipes(sortedRecipies);
    }, [minCalories, maxCalories, recipes]);

    const handleSliderChange = (event, newValue) => {
        setMinCalories(newValue[0]);
        setMaxCalories(newValue[1]);
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    return (
        <Box sx={{ mt: 4, mx: 2 }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            Wanna eat healthy? Adjust the calorie range below and get the delicious recipes you can cook!
        </Typography>

        <Box alignItems="center" sx={{ width: "100%", mb: 4 }}>
            <Typography gutterBottom>Caloric Range: {minCalories} - {maxCalories}</Typography>
            <Slider
            value={[minCalories, maxCalories]}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={staticMinCalories}
            max={staticMaxCalories}
            step={10}
            />
        </Box>

        <br />

        <Grid container spacing={2}>
            {currentRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Recipe recipe={recipe} />
            </Grid>
            ))}
        </Grid>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            variant="outlined"
            shape="rounded"
            />
        </Box>
        </Box>
    );
};

const Recipe = ({ recipe }) => {
    return (
        <Box
        sx={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: 2,
            marginBottom: 2,
            boxShadow: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxSizing: 'border-box',
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
            </Box>
            </Grid>
        </Grid>

        <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Nutrients:
            </Typography>
            <List dense sx={{ display: "flex", flexWrap: "wrap", padding: 0 }}>
            {Object.entries(recipe.nutrients).map(([key, value]) => (
                <ListItem key={key} sx={{ padding: "4px 0", width: "33%" }}>
                <Typography variant="body2">
                    {key} : {value}
                </Typography>
                </ListItem>
            ))}
            </List>
        </Box>
        </Box>
    );
};

export default DietPlan;
