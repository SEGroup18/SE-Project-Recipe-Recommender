import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import IngredientRecommender from "./IngredientRecommender";
import { server } from "../utils";
import "@testing-library/jest-dom";
import NavBar from "./Navbar";
import { StateProvider } from "../StateProvider";
import { MemoryRouter } from "react-router-dom";

jest.mock("../utils", () => ({
  server: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe("IngredientRecommender", () => {
  const mockIngredients = ["Chicken", "Broccoli", "Garlic"];
  const mockRecipes = [
    {
      _id: "recipe1",
      name: "Garlic Chicken",
      description: "A tasty chicken recipe with garlic.",
      minutes: 30,
      tags: ["Dinner", "Chicken"],
      steps: ["Season chicken", "Cook in skillet"],
      ingredients: ["Chicken", "Garlic"],
    },
  ];

  beforeEach(() => {
    server.get.mockResolvedValue({ data: mockIngredients });
    server.post.mockResolvedValue({ data: mockRecipes });
    localStorage.setItem("user", JSON.stringify({ history: [] }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders the component with default UI elements", async () => {
    render(<IngredientRecommender />);

    expect(screen.getByText(/unsure what to create/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select ingredients/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /search recipes/i })
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(server.get).toHaveBeenCalledWith("/recipe/ingredients")
    );
  });

  test("renders 'Add to History' button for unsaved recipe", async () => {
    render(<IngredientRecommender />);
    fireEvent.click(screen.getByRole("button", { name: /search recipes/i }));
    await waitFor(() => screen.getByText("Garlic Chicken"));
    expect(screen.getByText("Add to History")).toBeInTheDocument();
  });

  test("renders 'Remove from History' button for saved recipe", async () => {
    localStorage.setItem("user", JSON.stringify({ history: ["recipe1"] }));
    render(<IngredientRecommender />);
    fireEvent.click(screen.getByRole("button", { name: /search recipes/i }));
    await waitFor(() => screen.getByText("Garlic Chicken"));
    expect(screen.getByText("Remove from History")).toBeInTheDocument();
  });

  test("clicking 'Add to History' button adds recipe to history", async () => {
    render(<IngredientRecommender />);
    fireEvent.click(screen.getByRole("button", { name: /search recipes/i }));
    await waitFor(() => screen.getByText("Garlic Chicken"));
    
    fireEvent.click(screen.getByText("Add to History"));
    
    await waitFor(() => {
      expect(server.post).toHaveBeenCalledWith('/recipe/history', expect.any(Object));
      expect(screen.getByText("Remove from History")).toBeInTheDocument();
    });
  });

  test("clicking 'Remove from History' button removes recipe from history", async () => {
    localStorage.setItem("user", JSON.stringify({ history: ["recipe1"] }));
    render(<IngredientRecommender />);
    fireEvent.click(screen.getByRole("button", { name: /search recipes/i }));
    await waitFor(() => screen.getByText("Garlic Chicken"));
    
    fireEvent.click(screen.getByText("Remove from History"));
    
    await waitFor(() => {
      expect(server.post).toHaveBeenCalledWith('/recipe/history', expect.any(Object));
      expect(screen.getByText("Add to History")).toBeInTheDocument();
    });
  });
});

const renderWithState = (state) => {
  return render(
    <StateProvider initialState={state}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </StateProvider>
  );
};

describe("NavBar Component", () => {
  test("renders Ingredient Search when token is present", () => {
    const stateWithToken = {
      token: "test-token",
    };

    renderWithState(stateWithToken);

    const ingredientSearchItem = screen.getByText("Ingredient Search");
    expect(ingredientSearchItem).toBeInTheDocument();
  });

  test("does not render Ingredient Search when token is absent", () => {
    const stateWithoutToken = {
      token: null,
    };

    renderWithState(stateWithoutToken);

    const ingredientSearchItem = screen.queryByText("Ingredient Search");
    expect(ingredientSearchItem).not.toBeInTheDocument();
  });
});
