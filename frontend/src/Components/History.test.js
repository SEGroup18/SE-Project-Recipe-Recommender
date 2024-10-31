import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { History } from "./History";
import { server } from "../utils";
import "@testing-library/jest-dom";
import { StateProvider } from "../StateProvider";
import { MemoryRouter } from "react-router-dom";

jest.mock("../utils", () => ({
  server: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

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
  {
    _id: "recipe2",
    name: "Broccoli Soup",
    description: "A healthy vegetable soup.",
    minutes: 45,
    tags: ["Lunch", "Vegetarian"],
    steps: ["Chop broccoli", "Simmer in broth"],
    ingredients: ["Broccoli", "Vegetable broth"],
  },
];

describe("History", () => {
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify({ history: ["recipe1", "recipe2"] }));
    server.get.mockResolvedValue({ data: mockRecipes[0] });
    server.post.mockResolvedValue({ data: { message: "History updated successfully" } });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders the component with saved recipes", async () => {
    render(<History />);
    await waitFor(() => {
      expect(screen.getByText("Garlic Chicken")).toBeInTheDocument();
      expect(screen.getByText("Broccoli Soup")).toBeInTheDocument();
    });
  });

  test("displays recipe details correctly", async () => {
    render(<History />);
    await waitFor(() => {
      expect(screen.getByText("Cooking Time: 30 minutes")).toBeInTheDocument();
      expect(screen.getByText("Chicken")).toBeInTheDocument();
      expect(screen.getByText("Garlic")).toBeInTheDocument();
    });
  });

  test("renders 'Remove from History' button for each recipe", async () => {
    render(<History />);
    await waitFor(() => {
      const removeButtons = screen.getAllByText("Remove from History");
      expect(removeButtons).toHaveLength(2);
    });
  });

  test("removes a recipe from history when 'Remove from History' is clicked", async () => {
    render(<History />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Remove from History")[0]);
    });
    expect(server.post).toHaveBeenCalledWith('/recipe/history', expect.any(Object));
    await waitFor(() => {
      expect(screen.queryByText("Garlic Chicken")).not.toBeInTheDocument();
    });
  });

  test("displays recipe tags", async () => {
    render(<History />);
    await waitFor(() => {
      expect(screen.getByText("Dinner")).toBeInTheDocument();
      expect(screen.getByText("Chicken")).toBeInTheDocument();
    });
  });

  test("displays recipe steps", async () => {
    render(<History />);
    await waitFor(() => {
      expect(screen.getByText("Season chicken")).toBeInTheDocument();
      expect(screen.getByText("Cook in skillet")).toBeInTheDocument();
    });
  });

  test("handles error when fetching recipes", async () => {
    server.get.mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<History />);
    await waitFor(() => {
      expect(screen.getByText("Error loading recipes")).toBeInTheDocument();
    });
  });

  test("updates localStorage when removing a recipe", async () => {
    render(<History />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Remove from History")[0]);
    });
    expect(JSON.parse(localStorage.getItem("user")).history).toEqual(["recipe2"]);
  });
});