import requests
import ast

check_ingredients = ["Pasta", "Chicken", "Broccoli", "Onions", "Garlic", "Basil", "Shrimp", "Croutons", 
               "Cumin", "Balsamic vinegar", "Ginger", "Beef", "Soy sauce", "Thyme", "Caesar dressing",
               "Tomatoes", "Carrots", "Lettuce", "Tortillas", "Sugar", "Lemon", "Butter", "Rosemary",
               "Cocoa powder", "Rice", "Pepper", "Spinach", "Vegetable broth", "Chili powder", "Salt",
               "Cheese", "Flour", "Coconut milk", "Parmesan cheese", "Eggs", "Bell peppers", "Pork",
               "Olive oil", "Cilantro"]

def test_get_ingredients():
    results = requests.get("http://localhost:5000/recipe/ingredients")
    assert results.status_code == 200

def test_ingredients_exists():
    results = requests.get("http://localhost:5000/recipe/ingredients").text
    ingredients = ast.literal_eval(results)
    assert type(ingredients) == list
    assert len(ingredients) > 0

def test_distinct_ingredients():
    results = requests.get("http://localhost:5000/recipe/ingredients").text
    ingredients = ast.literal_eval(results)
    assert len(set(ingredients)) == len(ingredients)

def test_specific_ingridients():
    results = requests.get("http://localhost:5000/recipe/ingredients").text
    ingredients = ast.literal_eval(results)
    for i in check_ingredients:
        assert i in ingredients