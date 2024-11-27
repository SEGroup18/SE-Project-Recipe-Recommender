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
  Pagination,
} from "@mui/material";
import { server } from "../utils";

export const IngredientRecommender = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showIngredientsGrid, setShowIngredientsGrid] = useState(true); 
  const [selectedCategory, setSelectedCategory] = useState("");
  const itemsPerPage = 6;

  const categories = ["Dairy", "Meat", "Vegetables", "Fruits", "Spices"]; 

  const handleSearch = () => {
    server
      .post("/recipe/recipeByIngredient", {
        ingredients: selectedOptions.map((o) => o.title),
      })
      .then((data) => {
        setRecipes(data.data);
        setCurrentPage(1);
        setShowIngredientsGrid(false); 
      })
      .catch((err) => alert(err.response.data.error));
  };

  useEffect(() => {
    setOptions([
      { title: "Milk", category: "Dairy", imageUrl: "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2024/11/AdobeStock_354060824-1024x683.jpeg" },
      { title: "Cheese", category: "Dairy", imageUrl: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/healthiest-cheese-1296x728-swiss.jpg?w=1155&h=1528" },
      { title: "Butter", category: "Dairy", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7hz6vFjHDwej1GZhgPjnkX-lSHXAbGCv_g&s" },
      { title: "Yogurt", category: "Dairy", imageUrl: "https://www.happysimpleliving.com/wp-content/uploads/2024/02/homemade-greek-yogurt-featured.jpg" },
      { title: "Eggs", category: "Dairy", imageUrl: "https://www.simplyrecipes.com/thmb/zsQvDavpqD2PtIO-7W6nBWVHCe4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Hard-Boiled-Eggs-LEAD-03-42506773297f4a15920c46628d534d67.jpg"},
      { title: "Chicken", category: "Meat", imageUrl: "https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/1:1/w_2560%2Cc_limit/RoastChicken_RECIPE_080420_37993.jpg" },
      { title: "Beef", category: "Meat", imageUrl: "https://t3.ftcdn.net/jpg/06/90/51/98/360_F_690519885_jgpfFRbq3x1MxZLBePxyHpXeiWo9Oiow.jpg" },
      { title: "Pork", category: "Meat", imageUrl: "https://www.allrecipes.com/thmb/mQHYg_nV46dYhUD1Hx-vdGWarZk=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/14726-grilled-pork-tenderloin-beauty-3x4-f4efabb5032f464dae47fe4ee57690da.jpg" },
      { title: "Lamb", category: "Meat", imageUrl: "https://images.getrecipekit.com/v1615995124_RedRubbedBabyLambChopsPg101_xyzuwo.jpg?aspect_ratio=1:1&quality=90&"},
      { title: "Carrot", category: "Vegetables", imageUrl: "https://www.hhs1.com/hubfs/carrots%20on%20wood-1.jpg" },
      { title: "Broccoli", category: "Vegetables", imageUrl: "https://www.health.com/thmb/Rmc7904DESkPtLdsuVB49yGBZNo=/3950x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-Stocksy_txp48915e00jrw300_Medium_5965806-1b7dc08bfcbc4b748e5f1f27f67894a5.jpg" },
      { title: "Spinach", category: "Vegetables", imageUrl: "https://www.thespruceeats.com/thmb/Wpdr8OgU89mQDImdVsH96i_-dd4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-spinach-4783497-hero-07-4a4e988cb48b4973a258d1cc44909780.jpg" },
      { title: "Tomato", category: "Vegetables", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsdBhTMSiXhYaTInFGJ4kdEeujnWjfqo8WqA&s" },
      { title: "Cucumber", category: "Vegetables", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT19UUTLodCwKT1sEjgfdbWn8WLfiJ3D2d4Q&s" },
      { title: "Apple", category: "Fruits", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAu2mZ830SD2185RCt26uImF95C7pXFhwXMQ&s"},
      { title: "Banana", category: "Fruits", imageUrl:"https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920-1024x683.jpg"},
      { title: "Grapes", category: "Fruits",imageUrl:"https://hips.hearstapps.com/hmg-prod/images/766/grapes-main-1506688521.jpg?crop=0.848xw:1xh;center,top&resize=1200:*"},
      { title: "Orange", category: "Fruits",imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/640px-Oranges_-_whole-halved-segment.jpg" },
      { title: "Salt", category: "Spices", imageUrl: ""},
      { title: "Pepper", category: "Spices",imageUrl: "" },
      { title: "Cumin", category: "Spices", imageUrl: ""},
      { title: "Turmeric", category: "Spices", imageUrl: ""},
    ]);
  }, []);
 
  const filteredOptions = options.filter(option => option.category === selectedCategory); 
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  const user = useRef(JSON.parse(localStorage.getItem("user")));  
  const [savedRecipe, setSavedRecipe] = useState(JSON.parse(localStorage.getItem("savedRecipe")) || user.current.history);

  const handlePostRequest = (recipe) => {
    const isPresent = savedRecipe.some((rec) => rec.recipeId === recipe._id);
    let modifiedRecipe = [];
    
    if (isPresent) {
      modifiedRecipe = savedRecipe.filter((rec) => rec.recipeId !== recipe._id);
    }else{
      modifiedRecipe = [...savedRecipe, {recipeId: recipe._id, timestamp: new Date()}];      
    }
    console.log(modifiedRecipe);
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
      
      {/* Category Selection: Show categories like Dairy, Meat, etc. */}
      {showIngredientsGrid && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Select a Category:
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {categories.map((category, index) => (
              <Grid item key={index}>
                <Button 
                  variant="outlined" 
                  onClick={() => setSelectedCategory(category)}
                  sx={{ padding: "8px 16px", minWidth: "120px" }}
                >
                  {category}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Ingredients Grid: Show grid of ingredients based on selected category */}
      {showIngredientsGrid && selectedCategory && (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filteredOptions.map((ingredient, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Box sx={{ textAlign: "center" }}>
              <img 
                src={ingredient.imageUrl} 
                alt={ingredient.title} 
                style={{ width: "100%", height: "auto", marginBottom: "8px", borderRadius: "8px" }} 
              />

                <Typography>{ingredient.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Recipe Results displayed after search */}
      {!showIngredientsGrid && (
        <Grid container spacing={2}>
          {currentRecipes.map((recipe, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Recipe recipe={recipe} handlePostRequest={handlePostRequest} savedRecipe={savedRecipe}/>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
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

const Recipe = ({ recipe, handlePostRequest, savedRecipe }) => {
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
              {savedRecipe.some((rec) => rec.recipeId === recipe._id) ? "Remove from History" : "Add to History"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IngredientRecommender;