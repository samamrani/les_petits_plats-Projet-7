import { RecipeCard } from "../components/RecipeCard.js";

export class RecipesTemplate {
  constructor(recipes) {
    this.recipes = recipes;
  }

  getDOM() {
    const wrapper = document.createElement("section");
    wrapper.className = "recipes";

    this.recipes.forEach((recipe) => {
      const card = new RecipeCard(recipe);

      wrapper.appendChild(card.getDOM());
    });

    return wrapper;
  }
}
