// import { RecipeApi } from "../controleurApi/RecipeApi.js";
import { HeaderTemplate } from "../templates/Header.js";
class App {
  constructor() {
    this.recipes = [];
  }

  async init() {
    // const recipeApi = new RecipeApi();
    // this.recipes = await recipeApi.getRecipes();
    this.displayData();
  }

  displayData() {
    console.log("Affichage des données :", this.recipes);
    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();

    document.body.appendChild(headerElement);
  }
}

const app = new App();
app.init();
