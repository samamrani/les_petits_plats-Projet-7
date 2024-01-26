import { HeaderTemplate } from "../templates/Header.js";
import { DropdownTemplate } from "../templates/Dropdown.js";
import { RecipeTemplate } from "../templates/RecipeTemplate.js";

class App {
  constructor() {
    this.recipes = [];
  }

  async init() {
    this.recipes = await fetch("./data/recipes.json").then((res) => res.json());
    this.displayData();
  }

  displayData() {
    const headerTemplate = new HeaderTemplate(this.recipes, (filterRecipes) => {
      this.displayRecipesFilter(filterRecipes);
    });
    const headerElement = headerTemplate.getDOM();

    document.body.appendChild(headerElement);

    const dropdownTemplate = new DropdownTemplate();
    const dropdownElement = dropdownTemplate.getDOM();

    document.body.appendChild(dropdownElement);

    this.recipes.forEach((recipeElements) => {
      const recipeTemplate = new RecipeTemplate(recipeElements);
      const recipeElement = recipeTemplate.getDOM();

      document.body.appendChild(recipeElement);
    });
  }

  displayRecipesFilter(recipesFilter) {
    const recipesFilterSection = document.getElementById(
      "filterRecipesSection"
    );

    // Efface le contenu
    recipesFilterSection.innerHTML = "";

    // recette filtrés et ajout à la section
    recipesFilter.forEach((recipeData) => {
      const recipeTemplate = new RecipeTemplate(recipeData);
      const recipeElements = recipeTemplate.getDOM();

      recipesFilterSection.appendChild(recipeElements);
    });
  }
}

const app = new App();
app.init();
