import { Api } from "./Api.js";

export class RecipeApi extends Api {
  constructor() {
    super("data/recipes.json");
  }

  async getRecipes() {
    return (await this.fetch()).recipes;
  }

  async getRecipe(id) {
    const recipes = await this.getRecipes();

    return recipes.find((item) => item.id === id);
  }
}
