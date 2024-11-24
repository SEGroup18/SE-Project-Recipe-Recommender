import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AcUnitIcon from '@mui/icons-material/AcUnit';

export const Winter = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index); // Toggle the expanded state
  };

  const items = [
    {
      id: 1,
      name: "Creamy Tomato Basil Soup",
      cookingTime: "30 mins",
      ingredients: "Tomatoes, Basil, Cream, Garlic, Onions",
      recipe: [
        "Sauté garlic and onions until fragrant.",
        "Add chopped tomatoes and basil leaves.",
        "Simmer for 20 minutes and blend until smooth.",
        "Stir in cream and season with salt and pepper.",
        "Serve hot with a drizzle of olive oil.",
      ],
    },
    {
      id: 2,
      name: "Hot Chocolate with Marshmallows",
      cookingTime: "15 mins",
      ingredients: "Milk, Cocoa Powder, Sugar, Chocolate Chips, Marshmallows",
      recipe: [
        "Heat milk in a saucepan over medium heat.",
        "Whisk in cocoa powder and sugar until dissolved.",
        "Add chocolate chips and stir until melted.",
        "Pour into mugs and top with marshmallows.",
        "Optionally sprinkle with cinnamon or cocoa powder.",
      ],
    },
    {
      id: 3,
      name: "Mac and Corn Cheese",
      cookingTime: "40 mins",
      ingredients: "Macaroni, Sweet Corn, Cheddar Cheese, Milk, Butter",
      recipe: [
        "Cook macaroni according to package instructions.",
        "Melt butter in a saucepan and stir in flour.",
        "Gradually whisk in milk to make a roux.",
        "Add grated cheese and stir until melted.",
        "Mix macaroni and corn into the cheese sauce.",
      ],
    },
    {
      id: 4,
      name: "Buttery Sautéed Mushrooms with Fresh Herbs",
      cookingTime: "20 mins",
      ingredients: "Mushrooms, Butter, Garlic, Thyme, Parsley",
      recipe: [
        "Melt butter in a skillet over medium heat.",
        "Add garlic and sauté until golden.",
        "Add mushrooms and cook until golden brown.",
        "Season with salt, pepper, and fresh thyme.",
        "Garnish with chopped parsley before serving.",
      ],
    },
    {
      id: 5,
      name: "Creamy Chicken Alfredo Pasta",
      cookingTime: "35 mins",
      ingredients: "Fettuccine, Chicken Breast, Cream, Parmesan, Garlic",
      recipe: [
        "Cook fettuccine in salted water until al dente.",
        "Sear chicken breast until golden and slice into strips.",
        "Sauté garlic in butter and stir in cream.",
        "Add grated Parmesan and stir until smooth.",
        "Mix pasta and chicken into the Alfredo sauce.",
      ],
    },
    {
      id: 6,
      name: "Hearty Lentil Soup",
      cookingTime: "45 mins",
      ingredients: "Lentils, Carrots, Celery, Tomatoes, Vegetable Broth",
      recipe: [
        "Sauté onions, carrots, and celery until softened.",
        "Add lentils, diced tomatoes, and vegetable broth.",
        "Simmer for 30 minutes until lentils are tender.",
        "Season with salt, pepper, and a pinch of cumin.",
        "Serve with fresh parsley and crusty bread.",
      ],
    },
    {
      id: 7,
      name: "Cheesy Broccoli Casserole",
      cookingTime: "50 mins",
      ingredients: "Broccoli, Cheddar Cheese, Cream of Mushroom Soup, Breadcrumbs",
      recipe: [
        "Blanch broccoli in boiling water for 5 minutes.",
        "Mix broccoli with cream of mushroom soup and cheese.",
        "Transfer to a baking dish and top with breadcrumbs.",
        "Bake at 375°F (190°C) for 25-30 minutes.",
        "Serve hot as a side or main dish.",
      ],
    },
    {
      id: 8,
      name: "Savory Beef Stew",
      cookingTime: "1 hr 30 mins",
      ingredients: "Beef Chunks, Potatoes, Carrots, Onion, Red Wine, Broth",
      recipe: [
        "Brown beef chunks in a pot and set aside.",
        "Sauté onions, carrots, and potatoes in the same pot.",
        "Deglaze with red wine and add beef back to the pot.",
        "Pour in broth and simmer for 1 hour.",
        "Serve with crusty bread or over mashed potatoes.",
      ],
    },
    {
      id: 9,
      name: "Baked Sweet Potatoes with Cinnamon Butter",
      cookingTime: "1 hr",
      ingredients: "Sweet Potatoes, Butter, Cinnamon, Brown Sugar",
      recipe: [
        "Wash and pierce sweet potatoes with a fork.",
        "Bake at 400°F (200°C) for 45-50 minutes.",
        "Mix softened butter with cinnamon and brown sugar.",
        "Slice potatoes open and top with the cinnamon butter.",
        "Serve warm as a side dish or dessert.",
      ],
    },
    {
      id: 10,
      name: "Classic French Onion Soup",
      cookingTime: "50 mins",
      ingredients: "Onions, Beef Broth, Butter, Gruyère Cheese, Baguette",
      recipe: [
        "Caramelize onions in butter over low heat.",
        "Add beef broth and simmer for 20 minutes.",
        "Ladle soup into oven-safe bowls and top with a baguette slice.",
        "Sprinkle with Gruyère cheese and broil until golden.",
        "Serve hot with additional baguette slices.",
      ],
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        fontFamily:  "Georgia, serif",
      }}
    >
       <h1 style={{ textAlign: "center", fontSize: "2.5rem", margin: "20px 0" }}>
       <AcUnitIcon style={{ fontSize: "2.5rem" }} />
        Winter Favorites 
        <AcUnitIcon style={{ fontSize: "2.5rem" }} />
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
                fontSize: "34px",
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

export default Winter;
