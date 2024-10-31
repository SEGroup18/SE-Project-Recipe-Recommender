from unittest.mock import patch
import ast
import requests

mock_response_text = "{'minCalories': 100, 'maxCalories': 800}"

@patch('requests.get')
def test_get_minmax(mock_get):
    mock_get.return_value.status_code = 200
    results = requests.get("http://localhost:5000/recipe/minMaxCalories")
    assert results.status_code == 200

@patch('requests.get')
def test_min_max_exists(mock_get):
    mock_get.return_value.text = mock_response_text
    results = requests.get("http://localhost:5000/recipe/minMaxCalories").text
    minMax = ast.literal_eval(results)
    assert isinstance(minMax, dict)
    assert len(minMax) > 0

@patch('requests.get')
def test_min_max_accuracy(mock_get):
    mock_get.return_value.text = mock_response_text
    results = requests.get("http://localhost:5000/recipe/minMaxCalories").text
    minMax = ast.literal_eval(results)
    assert minMax.get('minCalories') <= minMax.get('maxCalories')

@patch('requests.get')
def test_min_range(mock_get):
    mock_get.return_value.text = mock_response_text
    results = requests.get("http://localhost:5000/recipe/minMaxCalories").text
    minMax = ast.literal_eval(results)
    assert minMax.get('minCalories') > float('-inf')

@patch('requests.get')
def test_max_range(mock_get):
    mock_get.return_value.text = mock_response_text
    results = requests.get("http://localhost:5000/recipe/minMaxCalories").text
    minMax = ast.literal_eval(results)
    assert minMax.get('maxCalories') < float('inf')

@patch('requests.get')
def test_min_data_type(mock_get):
    mock_get.return_value.text = mock_response_text
    results = requests.get("http://localhost:5000/recipe/minMaxCalories").text
    minMax = ast.literal_eval(results)
    assert isinstance(minMax.get('minCalories'), (int, float))

@patch('requests.get')
def test_max_data_type(mock_get):
    mock_get.return_value.text = mock_response_text
    results = requests.get("http://localhost:5000/recipe/minMaxCalories").text
    minMax = ast.literal_eval(results)
    assert isinstance(minMax.get('maxCalories'), (int, float))

@patch('requests.get')
def test_non_negative_calories(mock_get):
    mock_get.return_value.text = mock_response_text
    results = requests.get("http://localhost:5000/recipe/minMaxCalories").text
    minMax = ast.literal_eval(results)
    assert minMax.get('minCalories') >= 0
    assert minMax.get('maxCalories') >= 0
