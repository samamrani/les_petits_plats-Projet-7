import { HeaderTemplate } from "../templates/Header.js";
import { DropdownTemplate } from "../templates/Dropdown.js";
import { RecetteTemplate } from "../templates/RecetteTemplate.js";
import { RecipeApi } from "../api/RecipeApi.js";
class App {
  constructor() {
    this.recipeApi = new RecipeApi();
  }

  async init() {
    this.displayData();
  }

  async displayData() {
    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();

    document.body.appendChild(headerElement);

    const dropdownTemplate = new DropdownTemplate();
    const dropdownElement = dropdownTemplate.getDOM();

    document.body.appendChild(dropdownElement);

    const recipesData = await this.recipeApi.getRecipes();

    recipesData.forEach((recipeData) => {
      const recetteTemplate = new RecetteTemplate(recipeData);
      const recetteElement = recetteTemplate.getDOM();

      document.body.appendChild(recetteElement);
    });
  }
}

const app = new App();
app.init();
