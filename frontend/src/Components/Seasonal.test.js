import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Seasonal } from "./Seasonal";
import React from "react";

describe("Seasonal Component", () => {
  // Test case 1: Renders Seasonal Bites header
  test("renders Seasonal Bites header", () => {
    render(
      <Router>
        <Seasonal />
      </Router>
    );
    const header = screen.getByText(/Seasonal Bites/i);
    expect(header).toBeInTheDocument();
  });

  // Test case 2: Renders the paragraph text
  test("renders the introductory paragraph", () => {
    render(
      <Router>
        <Seasonal />
      </Router>
    );
    const paragraph = screen.getByText(
      /Explore seasonal specials and treats for every time of year!/i
    );
    expect(paragraph).toBeInTheDocument();
  });

  // Test case 3: Displays 11 categories
  test("displays 11 categories", () => {
    render(
      <Router>
        <Seasonal />
      </Router>
    );
    const categories = screen.getAllByRole("img");
    expect(categories).toHaveLength(11);
  });

  // Test case 4: Correct category name is displayed
  test("displays correct category name", () => {
    render(
      <Router>
        <Seasonal />
      </Router>
    );
    const categoryName = screen.getByText(/New Year Feast/i);
    expect(categoryName).toBeInTheDocument();
  });

  // Test case 5: Correct category availability text
  test("displays correct category availability text", () => {
    render(
      <Router>
        <Seasonal />
      </Router>
    );
    const categoryAvailability = screen.getByText(/January/i);
    expect(categoryAvailability).toBeInTheDocument();
  });

//   test('hover triggers scaling effect on category card', () => {
//     // Find the category card element by its name, for example, "New Year Feast"
//     const categoryCard = screen.getByText(/New Year Feast/i).closest("div");
  
//     // Check initial state (before hover)
//     expect(categoryCard).not.toHaveStyle('transform: scale(1.15)'); // Ensure it doesn't scale initially
  
//     // Trigger mouse enter (hover)
//     fireEvent.mouseEnter(categoryCard);
  
//     // Check if the style has changed to scale up
//     expect(categoryCard).toHaveStyle('transform: scale(1.15)');
  
//     // Trigger mouse leave (remove hover)
//     fireEvent.mouseLeave(categoryCard);
  
//     // Check if the style has reverted back to normal
//     expect(categoryCard).toHaveStyle('transform: scale(1)');
//   });
  
  
  
  // Test case 7: Category card click navigates to the correct path
//   test("clicking category card navigates to correct path", () => {
//     const navigate = jest.fn();
//     render(
//       <Router>
//         <Seasonal />
//       </Router>
//     );

//     const categoryCard = screen.getByText(/New Year Feast/i).closest("div");
//     fireEvent.click(categoryCard);
//     expect(navigate).toHaveBeenCalledWith("/newYearCategory");
//   });

  // Test case 8: Category images are displayed correctly
  test("displays category images", () => {
    render(
      <Router>
        <Seasonal />
      </Router>
    );
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  // Test case 9: Category "Winter Favorites" is visible with correct details
  test("displays Winter Favorites category with correct details", () => {
    render(
      <Router>
        <Seasonal />
      </Router>
    );
    const categoryName = screen.getByText(/Winter Favorites/i);
    const categoryAvailability = screen.getByText(/December - February/i);
    expect(categoryName).toBeInTheDocument();
    expect(categoryAvailability).toBeInTheDocument();
  });

  // Test case 10: Checking if the grid layout is correct (3 items per row)
//   test("grid layout is correct with 3 items per row", () => {
//     render(
//       <Router>
//         <Seasonal />
//       </Router>
//     );
//     const grid = screen.getByRole("grid");
//     expect(grid).toHaveStyle("grid-template-columns: repeat(3, 1fr)");
//   });
});
