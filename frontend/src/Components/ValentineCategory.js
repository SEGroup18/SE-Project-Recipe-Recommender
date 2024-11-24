import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';

export const ValentineCategory = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index); // Toggle the expanded state
  };

  const items = [
    {
      id: 1,
      name: "Heart-Shaped Ravioli",
      cookingTime: "45 mins",
      ingredients: "Pasta Dough, Ricotta, Parmesan, Egg, Spinach",
      recipe: [
        "Roll out the pasta dough and cut into heart shapes.",
        "Mix ricotta, Parmesan, and spinach for the filling.",
        "Place filling on half of the pasta hearts and seal them.",
        "Boil ravioli in salted water for 4-5 minutes.",
        "Serve with a creamy butter sauce."
      ]
    },
    {
      id: 2,
      name: "Chocolate-Covered Strawberries",
      cookingTime: "15 mins",
      ingredients: "Strawberries, Dark Chocolate, White Chocolate",
      recipe: [
        "Melt dark chocolate and dip each strawberry.",
        "Drizzle with melted white chocolate for decoration.",
        "Allow chocolate to harden at room temperature.",
        "Serve chilled and enjoy as a sweet treat."
      ]
    },
    {
      id: 3,
      name: "Rose Petal Salad",
      cookingTime: "10 mins",
      ingredients: "Mixed Greens, Rose Petals, Feta Cheese, Balsamic Dressing",
      recipe: [
        "Wash rose petals thoroughly and remove stems.",
        "Toss mixed greens with rose petals and crumbled feta.",
        "Drizzle with balsamic dressing.",
        "Serve fresh as a romantic starter."
      ]
    },
    {
      id: 4,
      name: "Lobster Tail with Garlic Butter",
      cookingTime: "30 mins",
      ingredients: "Lobster Tails, Butter, Garlic, Lemon, Parsley",
      recipe: [
        "Preheat the oven and cut the lobster tails.",
        "Melt butter with garlic and pour over lobster tails.",
        "Roast in the oven for 20-25 minutes.",
        "Garnish with lemon and parsley before serving."
      ]
    },
    {
      id: 5,
      name: "Red Velvet Cupcakes",
      cookingTime: "45 mins",
      ingredients: "Flour, Cocoa Powder, Red Food Coloring, Buttermilk, Cream Cheese Frosting",
      recipe: [
        "Mix dry ingredients and add red food coloring.",
        "Combine with buttermilk, eggs, and oil.",
        "Bake at 350°F for 18-20 minutes.",
        "Top with cream cheese frosting and garnish with a heart decoration."
      ]
    },
    {
      id: 6,
      name: "Valentine's Day Chocolate Cake",
      cookingTime: "50 mins",
      ingredients: "Flour, Cocoa Powder, Eggs, Butter, Dark Chocolate",
      recipe: [
        "Mix dry ingredients and melt the dark chocolate.",
        "Add eggs, butter, and melted chocolate to the mix.",
        "Pour batter into a greased pan and bake at 350°F for 30-35 minutes.",
        "Allow the cake to cool before frosting with chocolate ganache."
      ]
    },
    {
      id: 7,
      name: "Strawberry Mousse",
      cookingTime: "20 mins",
      ingredients: "Strawberries, Heavy Cream, Sugar, Gelatin",
      recipe: [
        "Puree fresh strawberries and sweeten with sugar.",
        "Whip heavy cream until soft peaks form.",
        "Combine strawberry puree with whipped cream.",
        "Add gelatin to the mixture and refrigerate until set.",
        "Serve chilled with fresh strawberries on top."
      ]
    }
  ];

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2.5rem", margin: "20px 0" }}>
        <FavoriteIcon style={{ fontSize: "2.5rem", color: "#e63946" }} />
        Valentine's Day Delights
        <FavoriteIcon style={{ fontSize: "2.5rem", color: "#e63946" }} />
      </h1>
      {items.map((item, index) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #ccc",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
            }}
            onClick={() => toggleExpand(index)}
          >
            <span>{item.name}</span>
            <ExpandMoreIcon
              style={{
                transform: expandedItem === index ? "rotate(180deg)" : "rotate(0)",
                transition: "transform 0.3s",
              }}
            />
          </div>
          {expandedItem === index && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                fontSize: "14px",
              }}
            >
              <div style={{ flex: 1, paddingRight: "10px" }}>
                <p>
                  <strong>Cooking Time:</strong> {item.cookingTime}
                </p>
                <p>
                  <strong>Ingredients:</strong> {item.ingredients}
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <p>
                  <strong>Recipe:</strong>
                  <ul>
                    {item.recipe.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
