import React from "react";

export const Seasonal = () => {
  // Data for seasonal categories
  const seasonalCategories = [
    {
      id: 1,
      name: "Pumpkin Specials",
      image: "pumpkin-specials.jpg", // Replace with actual image paths
      available: "October - November",
    },
    {
      id: 2,
      name: "Christmas Treats",
      image: "christmas-treats.jpg",
      available: "December",
    },
    {
      id: 3,
      name: "Winter Favorites",
      image: "winter-favorites.jpg",
      available: "December - February",
    },
    {
      id: 4,
      name: "Spring Salads",
      image: "spring-salads.jpg",
      available: "March - May",
    },
    {
      id: 5,
      name: "Summer Smoothies",
      image: "summer-smoothies.jpg",
      available: "June - August",
    },
    {
      id: 6,
      name: "BBQ Specials",
      image: "bbq-specials.jpg",
      available: "May - September",
    },
    {
      id: 7,
      name: "Halloween Treats",
      image: "halloween-treats.jpg",
      available: "October",
    },
    {
      id: 8,
      name: "Autumn Comforts",
      image: "autumn-comforts.jpg",
      available: "September - November",
    },
    {
      id: 9,
      name: "Valentine's Day Delights",
      image: "valentine-delights.jpg",
      available: "February",
    },
    {
      id: 10,
      name: "Easter Goodies",
      image: "easter-goodies.jpg",
      available: "April",
    },
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
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {seasonalCategories.map((category) => (
          <div
            key={category.id}
            style={{
              backgroundColor: "white",
              color: "#022950",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              overflow: "hidden",
              transition: "transform 0.3s",
            }}
          >
            <img
              src={`/images/${category.image}`} // Replace `/images/` with your actual image path
              alt={category.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
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


