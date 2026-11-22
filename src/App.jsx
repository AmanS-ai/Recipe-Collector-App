import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "recipe-collector-recipes";
const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snacks"];

const SAMPLE_RECIPES = [
  {
    id: "sample-1",
    name: "Lemon Ricotta Pancakes",
    category: "Breakfast",
    prepTime: 10,
    cookTime: 15,
    ingredients: ["1 cup ricotta", "1 cup all-purpose flour", "2 eggs", "1 lemon, zested", "2 tbsp sugar", "½ cup milk"],
    instructions: "Whisk the ricotta, eggs, milk, lemon zest, and sugar until smooth. Fold in the flour just until combined.\n\nCook small scoops in a buttered skillet over medium heat for 2–3 minutes per side. Serve warm with berries and maple syrup.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "sample-2",
    name: "Creamy Tomato Orzo",
    category: "Dinner",
    prepTime: 10,
    cookTime: 25,
    ingredients: ["1 cup orzo", "2 cups cherry tomatoes", "3 cups vegetable broth", "½ cup cream", "2 cloves garlic", "Fresh basil"],
    instructions: "Soften the garlic in olive oil, then add tomatoes and cook until they begin to burst. Stir in the orzo and broth.\n\nSimmer, stirring occasionally, until the orzo is tender. Finish with cream, torn basil, and plenty of black pepper.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "sample-3",
    name: "Honey Roasted Carrots",
    category: "Lunch",
    prepTime: 10,
    cookTime: 30,
    ingredients: ["1 lb carrots", "1 tbsp olive oil", "1 tbsp honey", "½ tsp cumin", "¼ cup Greek yogurt", "Fresh dill"],
    instructions: "Heat the oven to 425°F (220°C). Toss the carrots with olive oil, honey, cumin, salt, and pepper.\n\nRoast for 25–30 minutes, turning once, until caramelized and tender. Serve over yogurt with fresh dill.",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "sample-4",
    name: "Chocolate Berry Pots",
    category: "Dessert",
    prepTime: 15,
    cookTime: 5,
    ingredients: ["150 g dark chocolate", "1 cup heavy cream", "1 tbsp honey", "1 tsp vanilla", "Fresh raspberries"],
    instructions: "Warm half the cream until steaming, then pour it over chopped chocolate. Leave for one minute and stir until glossy.\n\nWhip the remaining cream with honey and vanilla to soft peaks. Fold together, spoon into glasses, and chill for at least 2 hours. Top with berries.",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85",
  },
];

function loadRecipes() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return SAMPLE_RECIPES;
    const recipes = JSON.parse(saved);
    if (!Array.isArray(recipes)) throw new Error("Saved recipes must be a list.");
    return recipes;
  } catch (error) {
    console.error("Could not load saved recipes:", error);
    return SAMPLE_RECIPES;
  }
}

function Icon({ name, size = 18 }) {
  const paths = {
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    fork: <><path d="M7 3v6M4 3v4a3 3 0 0 0 6 0V3M7 10v11M17 3v18M17 3c-2 2-3 5-3 8h3" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    edit: <><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16z" /></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6M5 7l1 14h12l1-14M9 7V4h6v3" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function RecipeImage({ recipe, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!recipe.image || failed) {
    return <div className={`recipe-image-placeholder ${className}`} aria-label="No recipe image"><Icon name="fork" size={30} /></div>;
  }
  return <img className={className} src={recipe.image} alt={recipe.name} onError={() => setFailed(true)} />;
}

function RecipeCard({ recipe, onView, onEdit, onDelete }) {
  return (
    <article className="recipe-card">
      <button className="card-image-button" type="button" onClick={() => onView(recipe)} aria-label={`View ${recipe.name}`}>
        <RecipeImage recipe={recipe} className="card-image" />
        <span className="category-badge">{recipe.category}</span>
      </button>
      <div className="card-content">
        <div className="card-heading">
          <button type="button" className="recipe-title-button" onClick={() => onView(recipe)}>{recipe.name}</button>
          <span className="time-label"><Icon name="clock" size={15} /> {recipe.prepTime + recipe.cookTime} min</span>
        </div>
        <div className="card-footer">
          <button type="button" className="text-link" onClick={() => onView(recipe)}>View recipe <Icon name="arrow" size={15} /></button>
          <div className="card-actions">
            <button type="button" className="icon-button" aria-label={`Edit ${recipe.name}`} onClick={() => onEdit(recipe)}><Icon name="edit" size={16} /></button>
            <button type="button" className="icon-button delete-action" aria-label={`Delete ${recipe.name}`} onClick={() => onDelete(recipe)}><Icon name="trash" size={16} /></button>
          </div>
        </div>
      </div>
    </article>
  );
}

function RecipeForm({ recipe, onSave, onClose }) {
  const [form, setForm] = useState(() => recipe ? {
    ...recipe,
    ingredients: recipe.ingredients.join("\n"),
  } : {
    name: "", ingredients: "", instructions: "", prepTime: "", cookTime: "", category: "Breakfast", image: "",
  });
  const [error, setError] = useState("");

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  function submit(event) {
    event.preventDefault();
    const ingredients = form.ingredients.split("\n").map((item) => item.trim()).filter(Boolean);
    if (!form.name.trim() || !ingredients.length || !form.instructions.trim()) {
      setError("Add a name, at least one ingredient, and the cooking instructions.");
      return;
    }
    if (!Number.isInteger(Number(form.prepTime)) || Number(form.prepTime) < 0 ||
      !Number.isInteger(Number(form.cookTime)) || Number(form.cookTime) < 0) {
      setError("Preparation and cooking times must be whole numbers of 0 or more.");
      return;
    }
    onSave({
      ...form,
      id: recipe?.id ?? crypto.randomUUID(),
      name: form.name.trim(),
      ingredients,
      instructions: form.instructions.trim(),
      prepTime: Number(form.prepTime),
      cookTime: Number(form.cookTime),
      image: form.image.trim(),
    });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="form-dialog" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="dialog-heading">
          <div>
            <span className="eyebrow">{recipe ? "MAKE IT YOUR OWN" : "ADD TO YOUR COLLECTION"}</span>
            <h2 id="form-title">{recipe ? "Edit recipe" : "A new favourite"}</h2>
          </div>
          <button className="icon-button close-button" type="button" onClick={onClose} aria-label="Close form"><Icon name="close" /></button>
        </div>
        <form className="recipe-form" onSubmit={submit}>
          <label className="field full-field">Recipe name
            <input name="name" value={form.name} onChange={update} placeholder="e.g. Sunday morning pancakes" maxLength={90} required autoFocus />
          </label>
          <div className="field-row">
            <label className="field">Category
              <select name="category" value={form.category} onChange={update}>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select>
            </label>
            <label className="field">Image URL <span className="optional">(optional)</span>
              <input name="image" type="url" value={form.image} onChange={update} placeholder="https://…" />
            </label>
          </div>
          <div className="field-row time-fields">
            <label className="field">Prep time <span className="optional">(min)</span>
              <input name="prepTime" type="number" min="0" step="1" value={form.prepTime} onChange={update} placeholder="10" required />
            </label>
            <label className="field">Cook time <span className="optional">(min)</span>
              <input name="cookTime" type="number" min="0" step="1" value={form.cookTime} onChange={update} placeholder="25" required />
            </label>
          </div>
          <label className="field full-field">Ingredients <span className="optional">(one per line)</span>
            <textarea name="ingredients" value={form.ingredients} onChange={update} placeholder={"2 cups flour\n1 cup milk\n2 eggs"} rows="4" required />
          </label>
          <label className="field full-field">Cooking instructions
            <textarea name="instructions" value={form.instructions} onChange={update} placeholder="Walk through the recipe, one step at a time…" rows="4" required />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">
            <button type="button" className="button button-quiet" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">{recipe ? "Save changes" : "Save recipe"} <Icon name="arrow" size={16} /></button>
          </div>
        </form>
      </section>
    </div>
  );
}

function RecipeDetails({ recipe, onClose, onEdit }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="details-dialog" role="dialog" aria-modal="true" aria-labelledby="details-title">
        <button className="icon-button details-close" type="button" onClick={onClose} aria-label="Close recipe"><Icon name="close" /></button>
        <RecipeImage recipe={recipe} className="details-image" />
        <div className="details-body">
          <span className="category-badge static-badge">{recipe.category}</span>
          <h2 id="details-title">{recipe.name}</h2>
          <div className="details-meta"><span><Icon name="clock" size={16} /> {recipe.prepTime} min prep</span><span><Icon name="fork" size={16} /> {recipe.cookTime} min cook</span></div>
          <div className="details-columns">
            <section><h3>Ingredients</h3><ul className="ingredient-list">{recipe.ingredients.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section>
            <section><h3>Method</h3><p className="instructions-text">{recipe.instructions}</p></section>
          </div>
          <div className="details-actions">
            <button type="button" className="button button-quiet" onClick={onClose}>Close</button>
            <button type="button" className="button button-primary" onClick={() => onEdit(recipe)}><Icon name="edit" size={16} /> Edit recipe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [recipes, setRecipes] = useState(loadRecipes);
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [category, setCategory] = useState("All recipes");
  const [formRecipe, setFormRecipe] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewRecipe, setViewRecipe] = useState(null);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      setStorageError(false);
    } catch (error) {
      console.error("Could not save recipes to local storage:", error);
      setStorageError(true);
    }
  }, [recipes]);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") {
        setFormOpen(false);
        setViewRecipe(null);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(search.trim().toLowerCase());
    return matchesSearch && (category === "All recipes" || recipe.category === category);
  });
  const categoryCounts = CATEGORIES.reduce((counts, item) => {
    counts[item] = recipes.filter((recipe) => recipe.category === item).length;
    return counts;
  }, {});

  function openNewRecipe() {
    setFormRecipe(null);
    setFormOpen(true);
  }

  function openEditRecipe(recipe) {
    setViewRecipe(null);
    setFormRecipe(recipe);
    setFormOpen(true);
  }

  function saveRecipe(recipe) {
    setRecipes((current) => current.some((item) => item.id === recipe.id)
      ? current.map((item) => item.id === recipe.id ? recipe : item)
      : [recipe, ...current]);
    setFormOpen(false);
    setFormRecipe(null);
  }

  function deleteRecipe(recipe) {
    if (window.confirm(`Delete "${recipe.name}" from your collection? This cannot be undone.`)) {
      setRecipes((current) => current.filter((item) => item.id !== recipe.id));
      if (viewRecipe?.id === recipe.id) setViewRecipe(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Recipe Collector home">
          <span className="brand-mark"><Icon name="book" size={21} /></span>
          <span>recipe<span className="brand-light">collector</span><small>YOUR KITCHEN, COLLECTED</small></span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#home">My collection</a>
          <a className="nav-link" href="#recipes">Browse recipes</a>
        </nav>
        <button className="button button-primary top-add" type="button" onClick={openNewRecipe}><Icon name="plus" size={17} /> Add recipe</button>
      </header>

      <main id="home">
        <section className="welcome-section">
          <div className="welcome-copy">
            <span className="eyebrow"><Icon name="spark" size={14} /> A LITTLE INSPIRATION FOR LATER</span>
            <h1>Good food is<br /><em>worth keeping.</em></h1>
            <p>A home for the recipes you love, the ones you’ll make again and again.</p>
            <button type="button" className="button button-primary welcome-button" onClick={openNewRecipe}>Add a recipe <Icon name="arrow" size={16} /></button>
          </div>
          <div className="welcome-art" aria-label="Freshly prepared meal" role="img">
            <div className="art-note"><span className="note-icon">✳</span><span>Made with love<small>and a little extra butter</small></span></div>
          </div>
          <div className="collection-count"><span className="count-number">{recipes.length}</span><span>recipes<br />collected</span><span className="count-divider" /><Icon name="book" size={22} /></div>
        </section>

        <section className="collection-section" id="recipes">
          <div className="section-heading">
            <div><span className="eyebrow">YOUR PERSONAL COOKBOOK</span><h2>Explore your collection<span className="period">.</span></h2></div>
            <span className="recipe-count">{recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} saved</span>
          </div>
          <div className="collection-tools">
            <div className="category-list" role="group" aria-label="Filter by category">
              {["All recipes", ...CATEGORIES].map((item) => (
                <button key={item} type="button" className={`category-filter${category === item ? " selected" : ""}`} onClick={() => setCategory(item)}>
                  {item}{item === "All recipes" ? <span>{recipes.length}</span> : categoryCounts[item] > 0 && <span>{categoryCounts[item]}</span>}
                </button>
              ))}
            </div>
            <label className="search-box"><Icon name="search" size={18} /><input ref={searchInputRef} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a recipe…" aria-label="Search recipes by name" /><kbd>⌘ K</kbd></label>
          </div>

          {storageError && <p className="storage-warning" role="status">Your recipes are available for this session, but could not be saved in this browser.</p>}

          {filteredRecipes.length > 0 ? (
            <div className="recipe-grid">
              {filteredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onView={setViewRecipe} onEdit={openEditRecipe} onDelete={deleteRecipe} />)}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><Icon name={search || category !== "All recipes" ? "search" : "book"} size={28} /></div>
              <h3>{recipes.length === 0 ? "Your cookbook is ready." : "Nothing on the menu just yet."}</h3>
              <p>{recipes.length === 0 ? "Save your first favourite and start building a collection worth coming back to." : "Try another search or category, or add a new recipe to your collection."}</p>
              {recipes.length === 0 && <button type="button" className="button button-primary" onClick={openNewRecipe}><Icon name="plus" size={16} /> Add your first recipe</button>}
              {recipes.length > 0 && (search || category !== "All recipes") && <button type="button" className="button button-quiet" onClick={() => { setSearch(""); setCategory("All recipes"); }}>Clear filters</button>}
            </div>
          )}
        </section>

        <footer className="page-footer"><span>Made for recipes worth remembering.</span><span>{recipes.length} lovingly collected</span></footer>
      </main>

      {formOpen && <RecipeForm key={formRecipe?.id ?? "new-recipe"} recipe={formRecipe} onSave={saveRecipe} onClose={() => setFormOpen(false)} />}
      {viewRecipe && <RecipeDetails recipe={viewRecipe} onClose={() => setViewRecipe(null)} onEdit={openEditRecipe} />}
    </div>
  );
}

export default App;
