import React from 'react';
import { render, screen} from '@testing-library/react';
import DietPlan from './DietPlan';
import { server } from '../utils';
import "@testing-library/jest-dom";
import NavBar from "./Navbar";
import { StateProvider } from "../StateProvider";
import { MemoryRouter } from "react-router-dom";

const mockMinMaxCalories = { minCalories: 1500, maxCalories: 3000 };
const mockRecipes = [
  {
    name: 'Recipe 1',
    description: 'Delicious recipe 1',
    tags: ['Healthy', 'Quick'],
    nutrients: { calories: 1600 },
    minutes: 30,
    steps: ['Step 1', 'Step 2'],
    ingredients: ['Ingredient 1', 'Ingredient 2'],
  },
  {
    name: 'Recipe 2',
    description: 'Delicious recipe 2',
    tags: ['Vegetarian'],
    nutrients: { calories: 1800 },
    minutes: 45,
    steps: ['Step 1', 'Step 2'],
    ingredients: ['Ingredient 1', 'Ingredient 2'],
  },
];

jest.mock("../utils", () => ({
  server: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

describe('DietPlan Component', () => {

  beforeEach(() => {
    server.get.mockResolvedValueOnce({ data: mockMinMaxCalories })
              .mockResolvedValueOnce({ data: mockRecipes });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the DietPlan component', async () => {
    render(<DietPlan />);
    expect(screen.getByText(/Wanna eat healthy/i)).toBeInTheDocument();
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

  test("renders Diet Plan when token is present", () => {
    const stateWithToken = {
      token: "test-token",
    };

    renderWithState(stateWithToken);

    const dietPlanItem = screen.getByText("Diet Plan");
    expect(dietPlanItem).toBeInTheDocument();
  });

  test("does not render Diet Plan when token is absent", () => {
    const stateWithoutToken = {
      token: null,
    };

    renderWithState(stateWithoutToken);

    const dietPlanItem = screen.queryByText("Diet Plan");
    expect(dietPlanItem).not.toBeInTheDocument();
  });

});
