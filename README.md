# SE-Project-Recipe-Recommender

[![DOI](https://zenodo.org/badge/879307617.svg)](https://doi.org/10.5281/zenodo.14010679)
![GitHub contributors](https://img.shields.io/github/contributors/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
![License](https://img.shields.io/github/license/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
![Code Size](https://img.shields.io/github/languages/code-size/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
![Issues](https://img.shields.io/github/issues/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
![Issues Closed](https://img.shields.io/github/issues-closed/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
![JS](https://img.shields.io/badge/Javascript--Green)
![Python](https://img.shields.io/badge/Python--Green)
![HTML](https://img.shields.io/badge/HTML--Green)
![CSS](https://img.shields.io/badge/CSS--Green)
![Repo Size](https://img.shields.io/github/repo-size/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
![GitHub forks](https://img.shields.io/github/forks/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender?style=social)
![GitHub language count](https://img.shields.io/github/languages/count/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender)
[![Tests](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/tests.yml/badge.svg)](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/tests.yml)
[![Syntax Check](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/syntax_checker.yml/badge.svg)](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/syntax_checker.yml)
[![Style Checker](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/style_checker.yml/badge.svg)](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/style_checker.yml)
[![Code formatter](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/code_formatter.yml/badge.svg)](https://github.com/SE-Fall-2024-Team-53/SE-Project-Recipe-Recommender/actions/workflows/code_formatter.yml)

## Demo

[![Watch the video](https://img.youtube.com/vi/0IJG0-tvfvI/maxresdefault.jpg)](https://youtu.be/0IJG0-tvfvI)

## Motivation

The **Recipe Recommendation System** was developed to simplify and enhance the cooking and meal planning experience for users by providing easy access to a variety of recipes based on personal preferences, dietary needs, and ingredient availability. Today’s busy lifestyles leave limited time for planning nutritious, enjoyable meals, and many people feel overwhelmed by the vast range of recipes available online. Our project aims to bridge this gap by offering personalized recipe recommendations that streamline the decision-making process and support healthier food choices.

By allowing users to select preferred categories, filter recipes by ingredients, and even refine searches based on nutritional needs, our platform makes it easy to discover dishes that suit any taste, occasion, or dietary restriction. Furthermore, by providing the option to place ingredient orders, we remove logistical barriers, making it more convenient to try new recipes. We hope this system will encourage more home cooking, inspire culinary exploration, and promote balanced eating.


## What is Recipe Recommendation System?

Recipe Recommendation System helps users to select their favorite food category and recommends recipes based on it. The users are then able to view the recipe and the ingredients required, and place an order for those ingredients.

This is the Home Page of the website.

![image](https://user-images.githubusercontent.com/23338660/194782226-17e5c173-b7ac-4f2a-816a-3ca7893ccd39.png)

## Tools and Technology Used

### Tools:

1. Mongo DB Atlas
2. Visual Studio Code
3. Github

### Technology:

1. Node.js
2. React.js
3. Mongo DB
4. Python3

## Installation

To get a local copy up and running, follow the instructions in the [Installation Guide](INSTALL.md)

## Directory Structure

    │   .dvcignore
    │   .gitignore
    │   Citation.cff
    │   CODE-OF-CONDUCT.md
    │   CONTRIBUTING.md
    │   INSTALL.md
    │   LICENSE.md
    │   package-lock.json
    │   package.json
    │   README.md
    │
    ├───.dvc
    │   │   .gitignore
    │   │   config
    │   │
    │   └───plots
    │           confusion.json
    │           confusion_normalized.json
    │           default.json
    │           linear.json
    │           scatter.json
    │           smooth.json
    │
    ├───.github
    │   └───workflows
    │           node-app.yml
    │
    ├───AI
    │   │   .gitignore
    │   │   data.dvc
    │   │   INSTALL.md
    │   │   requirements.txt
    │   │
    │   ├───notebooks
    │   │       collab_filtering.ipynb
    │   │       correlation.ipynb
    │   │       data_exploration.ipynb
    │   │       lightfm_sample.ipynb
    │   │       Tfid.ipynb
    │   │
    │   └───src
    │           data_loader_to_db.py
    │           inference.py
    │           service.py
    │
    ├───backend
    │   │   .env.sample
    │   │   .gitignore
    │   │   index.js
    │   │   package-lock.json
    │   │   package.json
    │   │
    │   ├───controllers
    │   │   │   order.js
    │   │   │   recipe.js
    │   │   │   recommend.js
    │   │   │
    │   │   └───auth
    │   │           index.js
    │   │           middlewares.js
    │   │
    │   ├───models
    │   │       Order.js
    │   │       Recipe.js
    │   │       Recommendation.js
    │   │       User.js
    │   │
    │   ├───routes
    │   │       auth.js
    │   │       order.js
    │   │       recipe.js
    │   │       recommend.js
    │   │
    │   └───utils
    │           transporter.js
    │
    ├───docs
    │       chatchannelproof.md
    │       LinuxKernelBestPractices.png
    │       proj1rubric.md
    │       proj1rubricComments.pdf
    │
    └───frontend
        │   .prettierignore
        │   .prettierrc.json
        │   package-lock.json
        │   package.json
        │
        ├───public
        │       index.html
        │
        └───src
            │   App.js
            │   index.css
            │   index.js
            │   reducer.js
            │   setupTests.js
            │   StateProvider.js
            │
            ├───Components
            │   │   AddressForm.js
            │   │   cards.css
            │   │   cards.scss
            │   │   DietPlan.js
            │   │   Home.js
            │   │   IngredientRecommender.js
            │   │   Navbar.js
            │   │   Order.js
            │   │   PaymentForm.js
            │   │   RecipeRecommendations.js
            │   │   Recipes.js
            │   │   Review.js
            │   │   SearchBar.js
            │   │   ToggleSwitch.css
            │   │
            │   ├───auth
            │   │       Base.js
            │   │       ChangePassword.js
            │   │       ForgotPassword.js
            │   │       index.js
            │   │
            │   └───LandingPage
            │           LandingPage.css
            │           LandingPage.js
            │           LandingPage.test.js
            │
            ├───imgs
            │       breakfast.jpg
            │       brownies.jpg
            │       burger.jpg
            │       butterchicken.jpg
            │       chinese.jpg
            │       chopsuey.jpg
            │       cookies.jpg
            │       curry.jpg
            │       MainImage.jpg
            │       Mexican.jpg
            │       mocktail.jpg
            │       pizza.jpg
            │       rice.jpg
            │       salad.jpg
            │       soup.jpg
            │       sushi.jpg
            │
            └───utils
                    index.js

## Contributing

We welcome contributions from everyone! If you'd like to contribute, please read the [Contributing Guidelines](CONTRIBUTING.md) for details on the code style, testing procedures, and submission process.

## Code of Conduct

This project adheres to a [Code of Conduct](CODE-OF-CONDUCT.md) to promote a welcoming environment for everyone. Please take a moment to review it.

## Application Guide

Refer to the application Guide for using the application [Application Guide](Application_Guide.md)

## License

Git homework is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.

---

Thank you for your interest in **SE-Project-Recipe-Recommender**! If you have any questions, feel free to reach out to the maintainers.

## Contact US

EMAIL: cse510se.project@gmail.com
