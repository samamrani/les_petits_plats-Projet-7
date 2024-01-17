import { ControleurApi } from "./ControleurApi.js";

export class RecipeApi extends ControleurApi {
  constructor() {
    super("data/recipes.json");
  }

  async getRecipes() {
    return (await this.fetchData()).recipes;
  }

  async getRecipe(id) {
    const recipes = await this.getRecipes();
    return recipes.find((item) => item.id === id);
  }
}
