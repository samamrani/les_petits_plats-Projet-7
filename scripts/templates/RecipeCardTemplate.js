export class RecipeCardTemplate {
  constructor(recipe) {
    this.recipe = recipe;
  }

  getDOM() {
    const recipe = document.createElement("div");
    recipe.classList = "recipe";
    const img = document.createElement("img");

    img.src = `assets/recettes/${this.recipe.image}`;
    img.alt = this.recipe.name;
    img.ariaLabel = this.recipe.name;

    const temps = document.createElement("div");
    temps.classList = "recipe__temps";
    temps.textContent = this.recipe.time + " mn";

    const card = document.createElement("div");
    card.classList = "recipe__card";

    const divRecette = document.createElement("div");

    const titleH3 = document.createElement("h3");
    titleH3.className = "recipe__title";
    titleH3.textContent = this.recipe.name;

    const recipeTitleH4 = document.createElement("h4");
    recipeTitleH4.className = "recipe__recipeTitle";
    recipeTitleH4.textContent = "RECETTE";

    const descriptionP = document.createElement("p");
    descriptionP.className = "recipe__description";
    descriptionP.textContent = this.recipe.description;

    divRecette.appendChild(titleH3);
    divRecette.appendChild(recipeTitleH4);
    divRecette.appendChild(descriptionP);

    const ingredientsH4 = document.createElement("h4");
    ingredientsH4.className = "recipe__recipeTitle";
    ingredientsH4.textContent = "INGREDIENTS";

    const ingredients = document.createElement("div");
    ingredients.classList = "recipe__ingredients";

    // Boucle sur chaque recette dans le fichier JSON
    this.recipe.ingredients.forEach((ingredientData) => {
      const ingredientDiv = document.createElement("div");
      ingredientDiv.id = "recipesContainer";
      ingredientDiv.classList = "recipe__container";

      const ingredientH4 = document.createElement("h4");
      ingredientH4.className = "recipe__section";
      ingredientH4.textContent = ingredientData.ingredient;

      const quantitySpan = document.createElement("span");
      quantitySpan.className = "recipe__span";
      quantitySpan.textContent = ingredientData.quantity + "  ";

      const unitSpan = document.createElement("span");
      unitSpan.className = "recipe__span";
      unitSpan.textContent = ingredientData.unit;

      ingredientDiv.appendChild(ingredientH4);

      ingredientDiv.appendChild(quantitySpan);
      ingredientDiv.appendChild(unitSpan);

      ingredients.appendChild(ingredientDiv);
    });

    card.appendChild(img);
    card.appendChild(divRecette);
    card.appendChild(ingredientsH4);
    card.appendChild(ingredients);

    recipe.appendChild(temps);
    recipe.appendChild(card);

    return recipe;
  }
}
