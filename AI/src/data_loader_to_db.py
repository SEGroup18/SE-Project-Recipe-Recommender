import requests
import json
import pandas as pd
import time

def string_list_to_list(x):
    return x.strip('[]').replace('"', '').replace("'", '').split(',')

df = pd.read_csv("../../recipes.csv")

values = json.loads(df.to_json(orient="records"))

names = {}

for i, value in enumerate(values):
    name = value["name"]
    if name in names:
        names[name] += 1
        name += "-"+str(names[name])
    else:
        names[name] = 1
        name += "-1"
    
    print(i, end="\r", flush=True)
    nutrients = {
        "calories": value["Calories"],
        "protein": value["Protein"],
        "fat": value["Fat"],
        "sugar": value["Sugar"],
        "sodium": value["Sodium"],
        "iron": value["Iron"],
        "vitamin_c": value["Vitamin C"],
        "cholesterol": value["Cholesterol"],
        "trans_fat": value["Trans Fat"],
        "calcium": value["Calcium"],
    }
    new_val = {
        "name": name,
        "description": value["description"],
        "minutes": value["minutes"],
        "tags": value["tags"].split(","),
        "steps": value["steps"].split(", "),
        "ingredients": value["ingredients"].split(", "),
        "nutrients": nutrients, 
    }
    res = requests.post("http://localhost:5000/recipe/add", json=new_val)

    if res.status_code == 400 and not str(res.content).__contains__("E11000"):
        print(res.content)
        print(value)
    time.sleep(0.1)
    
        
