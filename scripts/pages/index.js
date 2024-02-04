import { HeaderTemplate } from "../templates/Header.js";
import { DropdownTemplate } from "../templates/Dropdown.js";
import { RecipeTemplate } from "../templates/RecipeTemplate.js";

class App {
  constructor() {
    this.recipes = [];
    this.ingredient = [];
    this.appliance = [];
    this.ustensiles = [];
    this.dropdownTemplate = null;
  }

  async init() {
    this.recipes = await fetch("./data/recipes.json").then((res) => res.json());

    // Récupérer les ingrédients, appareils et ustensiles
    this.ingredients = this.getItems("ingredient");
    this.appliances = this.getItems("appareils");
    this.ustensiles = this.getItems("ustensils");

    console.log("Ustensiles:", this.ustensiles);

    this.displayData();
  }

  displayData() {
    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();

    document.body.appendChild(headerElement);

    const dropdownTemplate = new DropdownTemplate(
      this.ingredients,
      this.appliances,
      this.ustensiles
    );
    const dropdownElement = dropdownTemplate.getDOM();
    document.body.appendChild(dropdownElement);

    this.recipes.forEach((recipeElements) => {
      const recipeTemplate = new RecipeTemplate(recipeElements);
      const recipeElement = recipeTemplate.getDOM();

      document.body.appendChild(recipeElement);
    });
  }

  getItems(key) {
    const uniqueItems = new Set();

    this.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((item) => {
        if (item[key]) {
          uniqueItems.add(item[key]);
        }
      });

      if (key === "appareils" && recipe.appliance) {
        uniqueItems.add(recipe.appliance);
      }

      if (key === "ustensils" && recipe.ustensils) {
        recipe.ustensils.forEach((ustensil) => {
          uniqueItems.add(ustensil);
        });
      }
    });

    return Array.from(uniqueItems);
  }
}

const app = new App();
app.init();
