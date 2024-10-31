import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import RecipeRecommendations from "./RecipeRecommendations";
import { server } from "../utils";
import "@testing-library/jest-dom";
import { StateProvider } from "../StateProvider";
import { MemoryRouter } from "react-router-dom";

jest.mock("../utils", () => ({
  server: {
    post: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockRecommendations = [
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

const mockState = {
  recommendations: mockRecommendations,
};

const renderWithState = (state = mockState) => {
  return render(
    <MemoryRouter>
      <StateProvider initialState={state}>
        <RecipeRecommendations />
      </StateProvider>
    </MemoryRouter>
  );
};

describe("RecipeRecommendations", () => {
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify({ history: [] }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders the component with recommendations", () => {
    renderWithState();
    expect(screen.getByText("Here are our recommendations:")).toBeInTheDocument();
    expect(screen.getByText("Garlic Chicken")).toBeInTheDocument();
  });

  test("renders 'Add to History' button for unsaved recipe", () => {
    renderWithState();
    expect(screen.getByText("Add to History")).toBeInTheDocument();
  });

  test("renders 'Remove from History' button for saved recipe", () => {
    localStorage.setItem("user", JSON.stringify({ history: ["recipe1"] }));
    renderWithState();
    expect(screen.getByText("Remove from History")).toBeInTheDocument();
  });

  test("clicking 'Add to History' button adds recipe to history", async () => {
    renderWithState();
    fireEvent.click(screen.getByText("Add to History"));
    
    await waitFor(() => {
      expect(server.post).toHaveBeenCalledWith('/recipe/history', expect.any(Object));
      expect(screen.getByText("Remove from History")).toBeInTheDocument();
    });
  });

  test("clicking 'Remove from History' button removes recipe from history", async () => {
    localStorage.setItem("user", JSON.stringify({ history: ["recipe1"] }));
    renderWithState();
    fireEvent.click(screen.getByText("Remove from History"));
    
    await waitFor(() => {
      expect(server.post).toHaveBeenCalledWith('/recipe/history', expect.any(Object));
      expect(screen.getByText("Add to History")).toBeInTheDocument();
    });
  });
});