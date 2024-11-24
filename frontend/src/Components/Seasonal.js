import React from "react";
import nye from "../imgs/nye.png";
import winter from "../imgs/winter.png";
import val from "../imgs/val.png";
import ss from "../imgs/ss.png";
import easter from "../imgs/easter.png";
import bbq from "../imgs/bbq.png";
import smoothie from "../imgs/smoothie.png";
import autumn from "../imgs/autumn.png";
import haloween from "../imgs/haloween.png";
import pumpkin from "../imgs/pumpkin.png";
import christmas from "../imgs/christmas.png";

export const Seasonal = () => {
  // Data for seasonal categories
  const seasonalCategories = [
    { id: 1, name: "New Year Feast", image: nye, available: "January" },
    { id: 2, name: "Winter Favorites", image: winter, available: "December - February" },
    { id: 3, name: "Valentine's Day Delights", image: val, available: "February" },
    { id: 4, name: "Spring Salads", image: ss, available: "March - May" },
    { id: 5, name: "Easter Goodies", image: easter, available: "April" },
    { id: 6, name: "BBQ Specials", image: bbq, available: "May - September" },
    { id: 7, name: "Summer Smoothies", image: smoothie, available: "June - August" },
    { id: 8, name: "Autumn Comforts", image: autumn, available: "September - November" },
    { id: 9, name: "Halloween Treats", image: haloween, available: "October" },
    { id: 10, name: "Pumpkin Specials", image: pumpkin, available: "October - November" },
    { id: 11, name: "Christmas Treats", image: christmas, available: "December" },    
  ];

  return (
    <div
      style={{
        backgroundColor: "#022950",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Seasonal Bites</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
        Explore seasonal specials and treats for every time of year!
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 items per row
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {seasonalCategories.map((category, index) => (
          <div
            key={category.id}
            style={{
              backgroundColor: "white",
              color: "#022950",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              transition: "transform 0.3s",
              // Add specific width for each item if needed
              height: "350px",
              width: index < 9 ? "100%" : "100%", // Ensure last item is aligned correctly
            }}
          >
            <img
              src={category.image} // Replace `/images/` with your actual image path
              alt={category.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "10px" }}>
              <h2 style={{ fontSize: "1.5rem", margin: "10px 0" }}>
                {category.name}
              </h2>
              <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                {category.available}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
