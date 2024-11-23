	import React, { useRef, useEffect, useState } from "react";
	import {
	Box,
	Typography,
	Chip,
	List,
	ListItem,
	Grid,
	Button,
	} from "@mui/material";
	import { server } from "../utils";

	export const History = () => {

	const [recipes, setRecipes] = useState([]);
	const user = useRef(JSON.parse(localStorage.getItem("user")));
	const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || user.current.history)

	useEffect(() => { 
	const fetchRecipes = async () => {
		const fetchedRecipes = [];	
		for (const recipeId of savedRecipe) {
			try {
			const response = await server.get(`/recipe/${recipeId}`);
			fetchedRecipes.push(response.data);
			} catch (error) {
			console.error(`Error fetching recipe with id ${recipeId}:`, error);
			}
		}	
		setRecipes(fetchedRecipes);
		};
	
	fetchRecipes();	
	}, []);

	const handlePostRequest = (recipe) => {
		let modifiedRecipe = savedRecipe.filter(recipeId => recipeId !== recipe._id);
		server.post('/recipe/history', {history: modifiedRecipe, userId: user.current._id})
			.then(response => {
				console.log('Recipe saved successfully:', response.data); 
				localStorage.setItem("savedRecipe", JSON.stringify(modifiedRecipe));
				setSavedRecipe(modifiedRecipe);
				setRecipes(recipes.filter(r => r._id !== recipe._id));
			})
			.catch(error => {
				console.error('Error saving recipe:', error);
			}); 
	};

	return (
	<div>
	{recipes.map((recipe, index) => (
	<Grid item xs={12} sm={4} key={index}>              
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
					Remove from History
					</Button>
				</Box>
			</Grid>
			</Grid>
		</Box>
	</Grid>
	))}
	</div>
	);
	}