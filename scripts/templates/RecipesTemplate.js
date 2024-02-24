import { RecipeCard } from "../components/RecipeCard.js";

export class RecipesTemplate {
  constructor(recipes) {
    this.recipes = recipes;
  }

  getDOM() {
    const recipeSection = document.createElement("section");
    recipeSection.className = "recipes";

    this.recipes.forEach((recipe) => {
      const card = new RecipeCard(recipe);

      recipeSection.appendChild(card.getDOM());
    });

    return recipeSection;
  }
}
