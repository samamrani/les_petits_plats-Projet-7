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
    this.displayData();

    document.addEventListener("click", (event) => {
      const dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector(".dropdown__content");
        if (
          !dropdownContent.classList.contains("hidden") &&
          !dropdown.contains(event.target)
        ) {
          dropdownContent.classList.add("hidden");
          // Autres actions à effectuer lorsque la liste déroulante est fermée
        }
      });
    });
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

    // les données pour les filtres
    const filtersData = this.getItems();

    const filters = new FiltersTemplate(
      filtersData.ingredients,
      filtersData.appliances,
      filtersData.ustensils
    );
    main.appendChild(filters.getDOM());

    const recipes = new RecipesTemplate(this.recipes);
    main.appendChild(recipes.getDOM());

    body.appendChild(main);
  }

  getItems() {
    // stocker les ingrédients, appareils et ustensiles uniques
    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();
    const uniqueUstensils = new Set();

    // Parcourez toutes les recettes pour extraire ingrédients, appareils, ustensiles uniques
    this.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        uniqueIngredients.add(ingredient.ingredient);
      });

      if (recipe.appliance) {
        uniqueAppliances.add(recipe.appliance);
      }

      if (recipe.ustensils) {
        recipe.ustensils.forEach((ustensil) => {
          uniqueUstensils.add(ustensil);
        });
      }
    });

    // Convertissez les sets en tableaux
    const ingredientsArray = Array.from(uniqueIngredients);
    const appliancesArray = Array.from(uniqueAppliances);
    const ustensilsArray = Array.from(uniqueUstensils);

    // Retournez un objet contenant les données nécessaires
    return {
      ingredients: ingredientsArray,
      appliances: appliancesArray,
      ustensils: ustensilsArray,
    };
  }

  searchRecipes(searchInput) {
    const regex = new RegExp(searchInput, "i"); // 'i' indique une recherche insensible à la casse
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
