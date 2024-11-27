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
import { jsPDF } from "jspdf";

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

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    text: jest.fn(),
  }));
});

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
    localStorage.setItem(
      "user",
      JSON.stringify({ history: ["recipe1", "recipe2"] })
    );
    server.get.mockResolvedValue({ data: mockRecipes[0] });
    server.post.mockResolvedValue({
      data: { message: "History updated successfully" },
    });
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

  test("renders 'Download PDF' button for each recipe", async () => {
    render(<History />);
    await waitFor(() => {
      const downloadButtons = screen.getAllByText("Download PDF");
      expect(downloadButtons).toHaveLength(2);
    });
  });

  test("calls jsPDF and generates a PDF when 'Download PDF' is clicked", async () => {
    render(<History />);
    await waitFor(() => {
      const downloadButton = screen.getAllByText("Download PDF")[0];
      fireEvent.click(downloadButton);
    });

    const mockPdf = jsPDF.mock.instances[0];
    expect(mockPdf.text).toHaveBeenCalledWith("Garlic Chicken", 10, 10);
    expect(mockPdf.text).toHaveBeenCalledWith(
      "Description: A tasty chicken recipe with garlic.",
      10,
      20
    );
    expect(mockPdf.text).toHaveBeenCalledWith("Cooking Time: 30 minutes", 10, 30);
    expect(mockPdf.save).toHaveBeenCalledWith("Garlic_Chicken.pdf");
  });

  test("handles errors gracefully when PDF generation fails", async () => {
    jsPDF.mockImplementationOnce(() => {
      throw new Error("PDF generation failed");
    });

    render(<History />);
    await waitFor(() => {
      const downloadButton = screen.getAllByText("Download PDF")[0];
      fireEvent.click(downloadButton);
    });

    expect(screen.getByText("Error generating PDF")).toBeInTheDocument();
  });
});
