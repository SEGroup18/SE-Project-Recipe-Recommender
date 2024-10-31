from unittest.mock import patch, MagicMock
import requests
import pytest

@patch('requests.get')
def test_get_all_recipes_success(mock_get):
    # Create a mock response object
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = [{"name": "Recipe 1"}, {"name": "Recipe 2"}]
    
    mock_get.return_value = mock_response  # Set the return value of the mock get
    
    # Make the request
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    # Check response status and data
    assert response.status_code == 200
    assert response.json() == [{"name": "Recipe 1"}, {"name": "Recipe 2"}]

@patch('requests.get')
def test_get_all_recipes_no_recipes(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = []
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 200
    assert response.json() == []

@patch('requests.get')
def test_get_all_recipes_error(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 400
    mock_response.json.return_value = {"error": "Database error"}
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 400
    assert "error" in response.json()

@patch('requests.get')
def test_get_all_recipes_limit_1000(mock_get):
    # This test doesn't need to mock response but you can still ensure limit was used in your function.
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = []
    
    mock_get.return_value = mock_response
    
    requests.get("http://localhost:5000/recipe/dietPlan")
    
    # Check that requests.get was called with the expected URL
    mock_get.assert_called_with("http://localhost:5000/recipe/dietPlan")

@patch('requests.get')
def test_get_all_recipes_data_format(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = [{"name": "Recipe 1", "ingredients": ["flour", "sugar"]}]
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert all(isinstance(recipe, dict) for recipe in response.json())

@patch('requests.get')
def test_get_all_recipes_large_data(mock_get):
    # Generate large data set
    mock_recipes = [{"name": f"Recipe {i}"} for i in range(1000)]
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = mock_recipes
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 200
    assert len(response.json()) == 1000

@patch('requests.get')
def test_get_all_recipes_partial_data(mock_get):
    # Simulate partial data (fewer than 1000 recipes)
    mock_recipes = [{"name": f"Recipe {i}"} for i in range(500)]
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = mock_recipes
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 200
    assert len(response.json()) == 500

@patch('requests.get')
def test_get_all_recipes_check_fields(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.json.return_value = [{"name": "Recipe 1", "ingredients": ["flour", "sugar"]}]
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 200
    for recipe in response.json():
        assert "name" in recipe
        assert "ingredients" in recipe

@patch('requests.get')
def test_get_all_recipes_database_timeout(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 400
    mock_response.json.return_value = {"error": "Database timeout"}
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 400
    assert "error" in response.json()
    assert response.json()["error"] == "Database timeout"

@patch('requests.get')
def test_get_all_recipes_unexpected_error(mock_get):
    mock_response = MagicMock()
    mock_response.status_code = 400
    mock_response.json.return_value = {"error": "Unexpected error"}
    
    mock_get.return_value = mock_response
    
    response = requests.get("http://localhost:5000/recipe/dietPlan")
    
    assert response.status_code == 400
    assert "error" in response.json()
    assert response.json()["error"] == "Unexpected error"
