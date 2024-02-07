import { HeaderTemplate } from "../templates/Header.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";

class App {
  constructor() {
    this.recipes = [];
    this.ingredient = [];
    this.appliance = [];
    this.ustensiles = [];
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
    const body = document.querySelector("body");

    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();

    body.appendChild(headerElement);

    // gestionnaire d'événements pour la saisie dans la barre de recherche
    const inputElement = document.querySelector(".header__input");
    inputElement.addEventListener("input", (event) => {
      const inputValue = event.target.value;
      this.searchRecipes(inputValue);
    });

    const main = document.createElement("main");

    const filters = new FiltersTemplate(
      this.ingredients,
      this.appliances,
      this.ustensiles
    );
    main.appendChild(filters.getDOM());

    const recipes = new RecipesTemplate(this.recipes);
    main.appendChild(recipes.getDOM());

    body.appendChild(main);
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

  searchRecipes(query) {
    const regex = new RegExp(query, "i"); // 'i' indique une recherche insensible à la casse
    const filteredRecipes = this.recipes.filter((recipe) =>
      regex.test(recipe.name)
    );
    // Mettre à jour l'interface utilisateur avec les résultats de la recherche
    const recipesTemplate = new RecipesTemplate(filteredRecipes);
    const recipesSection = document.querySelector(".recipes");
    recipesSection.innerHTML = ""; // Effacer le contenu précédent
    recipesSection.appendChild(recipesTemplate.getDOM());
  }
}

const app = new App();
app.init();
