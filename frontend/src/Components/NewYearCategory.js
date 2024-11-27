import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CelebrationIcon from '@mui/icons-material/Celebration';

export const NewYearCategory = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index); // Toggle the expanded state
  };

  const items = [
    {
      id: 1,
      name: "Beef Wellington",
      cookingTime: "90 mins",
      ingredients: "Beef, Puff Pastry, Mushrooms",
      recipe: [
        "Sear the beef and let it rest.",
        "Sauté mushrooms with garlic and herbs.",
        "Wrap beef in mushrooms and puff pastry.",
        "Bake until golden and serve with a side of veggies."
      ]
    },
    {
      id: 2,
      name: "Lobster Bisque",
      cookingTime: "60 mins",
      ingredients: "Lobster, Cream, Onion, Carrot",
      recipe: [
        "Cook lobster and extract the meat.",
        "Sauté onion and carrot, add lobster stock.",
        "Simmer and blend for smoothness.",
        "Finish with cream and serve hot."
      ]
    },
    {
      id: 3,
      name: "Champagne Sorbet",
      cookingTime: "10 mins",
      ingredients: "Champagne, Sugar, Lemon",
      recipe: [
        "Combine champagne, sugar, and lemon juice.",
        "Freeze until it reaches a sorbet consistency.",
        "Serve as a refreshing palate cleanser."
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
        <CelebrationIcon style={{ fontSize: "2.5rem" }} />
        New Year Feast
        <CelebrationIcon style={{ fontSize: "2.5rem" }} />
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

export default NewYearCategory;
