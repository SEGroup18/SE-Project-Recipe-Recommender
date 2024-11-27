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


const RecipeRecommendations = () => {
  const [{recommendations}, dispatch] = useStateValue();
  const [cart, addItem] = useState([]);
  const handleChange = (e, recipe_name, ingredients) => {
    if (e.target.checked === true) {
      addItem((old_cart) => [...old_cart, {name: recipe_name, ingredients:ingredients}]);
    } else {
      console.log("Remove");
      addItem((current) =>
        current.filter((element) => {
          return element !== recipe_name;
        })
      );
    }
  };

  const navigate = useNavigate();

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
    <React.Fragment>
      <Typography
        variant="h4"
        component="h5"
        style={{ margin: "20px", textAlign: "center" }}
      >
        Here are our recommendations:
      </Typography>
      {recommendations.map((key) => {
        return (
          <div
            key={key.name}
            style={{
              borderBottom: "2px solid",
              boxShadow: "0 -10px 10px -11px",
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div>
                  <Typography
                    variant="h5"
                    component="h5"
                    style={{ textAlign: "center", color: "#022950" }}
                  >
                    {key.name.charAt(0).toUpperCase() + key.name.slice(1)}
                  </Typography>
                </div>

                <div className="cart">
                  <div className="container">
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        className="checkbox"
                        name={key.name}
                        id={key.name}
                        onChange={(e) => handleChange(e, key.name, key.ingredients)}
                      />
                      {/* <label className="label" htmlFor={key.name}>
                        <span className="inner" />
                      </label> */}
                    </div>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mr: 2 }}
                  onClick={() => handlePostRequest(key)}
                >
                  {savedRecipe.some((recipe) => recipe.recipeId === key._id) ? "Remove from History" : "Add to History"}
                </Button>
                <Card className="card-style">
                  <div sx={{ display: "flex" }}>                  
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        float: "left",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Cooking time
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {key.minutes + " mins"}
                        </Typography>
                        <Typography component="div" variant="h6">
                          Ingredients
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {key.ingredients.join(", ")}
                        </Typography>
                      </CardContent>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6">
                          Recipe
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          {key.steps.map((data, index) => {
                            return <li key={index}>{data}</li>;
                          })}
                        </Typography>
                      </CardContent>
                    </Box>
                  </div>
                </Card>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
      {/* <Box
        textAlign="center"
        style={{
          paddingLeft: "10px",
          paddingRight: "215px",
          paddingTop: "40px",
        }}
      >
        <Button className="button-style" onClick={proceedToOrder}>
          Proceed
        </Button>
      </Box> */}
    </React.Fragment>
  );
};

export default RecipeRecommendations;
