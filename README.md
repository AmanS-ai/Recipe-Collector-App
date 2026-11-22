# Recipe Collector

Recipe Collector is a clean, responsive recipe library for keeping the dishes you love close at hand. Browse a small starter cookbook, add your own recipes, and find them later by name or category. Your collection is stored in your browser, so it remains there between visits without an account or server.

## Objectives

- Make it simple to collect and revisit favourite recipes.
- Keep each recipe's ingredients, method, category, timings, and optional photo together.
- Provide a responsive, approachable experience on desktop and mobile.
- Persist a personal collection locally in the browser.

## Features

- Dashboard with total recipe count and visually rich recipe cards.
- Four starter recipes on first launch.
- Add and edit recipes with required-field and time validation.
- Delete recipes with a confirmation prompt.
- View full ingredients and cooking instructions.
- Search by recipe name and filter by category.
- Focus recipe search with `Ctrl+K` (Windows/Linux) or `⌘K` (macOS).
- Browser LocalStorage persistence across reloads and browser restarts.
- Responsive layouts, empty states, keyboard-dismissable dialogs, and image fallbacks.

## Technologies

- React 18
- Vite 6
- JavaScript (ES modules)
- HTML5 and CSS3
- Browser LocalStorage

## Installation

Install [Node.js](https://nodejs.org/) (Node 18 or newer is recommended), then open a terminal in this project folder and install dependencies:

```bash
npm install
```

## Run the application

Start the local development server:

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). To create and preview a production build:

```bash
npm run build
npm run preview
```

Recipes are saved in LocalStorage under the `recipe-collector-recipes` key for the current browser and origin. Clearing browser site data removes that collection.

## Project structure

```text
RecipeCollector/
├── index.html          # Vite HTML entry point and page metadata
├── package.json        # Dependencies and development/build scripts
├── README.md           # Project documentation
└── src/
    ├── App.jsx         # Dashboard, reusable UI components, and recipe workflows
    ├── main.jsx        # React application entry point
    └── styles.css      # Theme, layout, responsive styles, and dialogs
```

## Screenshots

Screenshots can be added here after running the application:

| Dashboard | Recipe details |
| --- | --- |
| ![Dashboard screenshot placeholder](screenshots/dashboard.png) | ![Recipe details screenshot placeholder](screenshots/recipe-details.png) |

| Add or edit recipe |
| --- |
| ![Add recipe screenshot placeholder](screenshots/add-recipe.png) |
