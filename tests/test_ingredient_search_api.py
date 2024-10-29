import requests
import json

def test_search_recipe_api():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
            "Garlic",
            "Broccoli"
        ]})

    assert results.status_code == 200

def test_recipe_exists():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
            "Garlic",
            "Broccoli"
        ]}).text
    data = json.loads(results)

    assert len(data) > 0

def test_recipe_properties():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
            "Garlic",
            "Broccoli"
        ]}).text
    data = json.loads(results)[0]
    
    assert "name" in data
    assert "description" in data
    assert "minutes" in data
    assert "tags" in data
    assert "steps" in data
    assert "ingredients" in data
    assert "nutrients" in data


def test_distinct_recipe():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
            "Garlic",
            "Broccoli"
        ]}).text
    data = json.loads(results)

    names = []
    for d in data:
        names.append(d["name"])
    
    assert len(set(names)) == len(names) 

def test_invalid_search():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
            "dummy"
        ]}).text
    data = json.loads(results)

    assert len(data) == 0

def test_empty_search():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        ]}).text
    data = json.loads(results)

    assert len(data) == 0

def test_validate_id():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)

    assert len(data) == 1
    assert data[0]["_id"] == "671eb5df8ed539cab0ecab33"

def test_validate_name():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)

    assert len(data) == 1
    assert data[0]["name"] == "Chicken Korma-1"

def test_validate_description():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)

    assert len(data) == 1
    assert data[0]["description"] == "A delicious dish made with Pasta and other ingredients."

def test_validate_minutes():
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)

    assert len(data) == 1
    assert data[0]["minutes"] == 53

def test_validate_tags():
    tags = [
            "General",
            "Recipe",
            "Low Fat"
        ]
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)[0]

    for tag in tags:
        assert tag in data["tags"]


def test_validate_steps():
    steps = [
            "Prepare the Salt.",
            "Prepare the Salt.",
            "Prepare the Shrimp.",
            "Prepare the Beef.",
            "Prepare the Salt."
        ]
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)[0]

    for step in steps:
        assert step in data["steps"]

def test_validate_ingredients():
    ingredients = [
            "Carrots",
            "Cocoa powder",
            "Salt",
            "Shrimp",
            "Pepper",
            "Beef"
        ]
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)[0]

    for ingredient in ingredients:
        assert ingredient in data["ingredients"]

def test_validate_ingredients():
    ingredients = [
            "Carrots",
            "Cocoa powder",
            "Salt",
            "Shrimp",
            "Pepper",
            "Beef"
        ]
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)[0]

    for ingredient in ingredients:
        assert ingredient in data["ingredients"]


def test_validate_nutrients():
    nutrients = {
            "calories": 559,
            "protein": 28,
            "fat": 12,
            "sugar": 10,
            "sodium": 176,
            "iron": 1.34,
            "vitamin_c": 70,
            "cholesterol": 235,
            "trans_fat": 8.57,
            "calcium": 966
        }
    results = requests.post("http://localhost:5000/recipe/recipeByIngredient", json={
        "ingredients": [
        "Cocoa powder",
        "Pepper",
        "Carrots",
        "Beef"
        ]}).text
    data = json.loads(results)[0]

    for nutrient in nutrients.keys():
        assert nutrient in data["nutrients"]
        assert nutrients[nutrient] == data["nutrients"][nutrient]

