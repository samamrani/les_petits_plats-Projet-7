import { RecipeCardTemplate } from "./RecipeCardTemplate.js";

export class RecipesTemplate {
  constructor(recipes) {
    this.recipes = recipes;
  }

  getDOM() {
    const recipeSection = document.createElement("section");
    recipeSection.className = "recipes";

    this.recipes.forEach((recipe) => {
      const card = new RecipeCardTemplate(recipe);

      recipeSection.appendChild(card.getDOM());
    });

    // const recipesSection = document.querySelector(".recipes");

    return recipeSection;
  }
}
