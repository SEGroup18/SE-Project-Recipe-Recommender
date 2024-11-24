import { render, screen, fireEvent } from '@testing-library/react';
import Winter from './Winter';
import '@testing-library/jest-dom';

describe('Winter Component', () => {
  beforeEach(() => {
    render(<Winter />);
  });

  test('renders Winter Favorites header with icons', () => {
    const header = screen.getByText(/Winter Favorites/i);
    expect(header).toBeInTheDocument();
    // expect(screen.getByRole('img')).toBeInTheDocument(); // Verifies if the icons are rendered
  });

  test('displays all 10 recipe items', () => {
    const recipeItems = screen.getAllByText(/(Soup|Chocolate|Mac|Mushrooms|Chicken|Lentil|Casserole|Beef|Potatoes|Onion)/); // Check for a few unique words in each item
    expect(recipeItems.length).toBe(10);
  });

  test('toggles expanded recipe on click', () => {
    const firstItem = screen.getByText(/Creamy Tomato Basil Soup/i);
    fireEvent.click(firstItem);
    expect(screen.getByText(/Cooking Time:/)).toBeInTheDocument();
    fireEvent.click(firstItem);
    expect(screen.queryByText(/Cooking Time:/)).not.toBeInTheDocument();
  });

//   test('expansion icon rotates when clicked', () => {
//     const icon = screen.getByRole('img');
//     const initialTransform = icon.style.transform;
//     fireEvent.click(screen.getByText(/Creamy Tomato Basil Soup/i));
//     expect(icon.style.transform).not.toBe(initialTransform); // Check if the icon rotates
//   });

  test('shows ingredients and recipe when expanded', () => {
    const firstItem = screen.getByText(/Creamy Tomato Basil Soup/i);
    fireEvent.click(firstItem);
    expect(screen.getByText(/Ingredients:/)).toBeInTheDocument();
    expect(screen.getByText(/Sauté garlic and onions until fragrant./)).toBeInTheDocument();
  });

  test('hides ingredients and recipe when collapsed', () => {
    const firstItem = screen.getByText(/Creamy Tomato Basil Soup/i);
    fireEvent.click(firstItem); // Expand
    fireEvent.click(firstItem); // Collapse
    expect(screen.queryByText(/Ingredients:/)).not.toBeInTheDocument();
  });

  test('displays the correct number of steps in the recipe', () => {
    const firstItem = screen.getByText(/Creamy Tomato Basil Soup/i);
    fireEvent.click(firstItem);
    const steps = screen.getAllByRole('listitem');
    expect(steps.length).toBe(5);
  });

  test('does not show recipe when no item is expanded', () => {
    const items = screen.queryAllByText(/Recipe:/);
    expect(items.length).toBe(0);
  });

  test('should not expand the same item twice', () => {
    const firstItem = screen.getByText(/Creamy Tomato Basil Soup/i);
    fireEvent.click(firstItem); // Expand
    fireEvent.click(firstItem); // Collapse
    fireEvent.click(firstItem); // Expand again
    expect(screen.queryByText(/Cooking Time:/)).toBeInTheDocument();
  });

//   test('expansion icon rotation resets after collapsing', () => {
//     const firstItem = screen.getByText(/Creamy Tomato Basil Soup/i);
//     const icon = screen.getByRole('img');
//     const initialRotation = icon.style.transform;
//     fireEvent.click(firstItem);
//     fireEvent.click(firstItem); // Collapse back
//     expect(icon.style.transform).toBe(initialRotation); // Icon should rotate back to original position
//   });

  test('renders multiple items with correct names', () => {
    const itemNames = [
      'Creamy Tomato Basil Soup',
      'Hot Chocolate with Marshmallows',
      'Mac and Corn Cheese',
      'Buttery Sautéed Mushrooms with Fresh Herbs',
      'Creamy Chicken Alfredo Pasta',
      'Hearty Lentil Soup',
      'Cheesy Broccoli Casserole',
      'Savory Beef Stew',
      'Baked Sweet Potatoes with Cinnamon Butter',
      'Classic French Onion Soup',
    ];
    
    itemNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
