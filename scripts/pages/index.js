import { HeaderTemplate } from "../templates/HeaderTemplate.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";

class App {
  constructor() {}

  async init() {
    // Récupérer les recettes depuis le fichier JSON
    this.recipes = await fetch("./data/recipes.json").then((res) => res.json());

    // Afficher les données sur la page
    this.displayData();

    /* 
    gestionnaire d'événements  pourla fermeture des dropdowns en dehors
  */
    document.addEventListener("click", (event) => {
      const dropdowns = document.querySelectorAll(".dropdown");
      dropdowns.forEach((dropdown) => {
        const dropdownContent = dropdown.querySelector(".dropdown__content");
        if (
          !dropdownContent.classList.contains("hidden") &&
          !dropdown.contains(event.target)
        ) {
          dropdownContent.classList.add("hidden");
        }
      });
    });
  }

  displayData() {
    // ajout de l'en-tête à la page
    const body = document.querySelector("body");

    // Création de l'en-tête à partir du template
    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();

    body.appendChild(headerElement);

    // gestionnaire d'événements pour la saisie dans la barre de recherche
    const inputElement = document.querySelector(".header__input");
    inputElement.addEventListener("input", (event) => {
      event.stopPropagation();

      const inputValue = event.target.value;
      this.searchRecipes(inputValue);
    });

    // création et de l'ajout filtres et les recettes
    const main = document.createElement("main");

    // les données pour les filtres
    const filtersData = this.getItems();

    // Création du template des filtres et ajout au main
    const filters = new FiltersTemplate(
      filtersData.ingredients,
      filtersData.appliances,
      filtersData.ustensils
    );

    main.appendChild(filters.getDOM());

    const resultSection = document.createElement("section");
    resultSection.id = "selectedItemsResult";
    main.appendChild(resultSection);

    // Création du template des recettes et ajout au main
    const recipes = new RecipesTemplate(this.recipes);
    main.appendChild(recipes.getDOM());

    body.appendChild(main);
  }

  getItems() {
    // stocker les ingrédients, appareils et ustensiles
    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();
    const uniqueUstensils = new Set();

    // Parcourez toutes les recettes pour extraire ingrédients, appareils, ustensiles
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

  // ?????????????????????????????
  searchRecipes(searchInput) {
    // Création d'une expression régulière pour la recherche
    const regex = new RegExp(searchInput, "i"); // 'i' indique une recherche insensible à la casse
    const filteredRecipes = this.recipes.filter((recipe) =>
      regex.test(recipe.name)
    );

    // Mettre à jour l'interface utilisateur avec les résultats de la recherche
    const recipesTemplate = new RecipesTemplate(filteredRecipes);
    const recipesSection = document.querySelector(".recipes");
    recipesSection.innerHTML = "";
    recipesSection.appendChild(recipesTemplate.getDOM());
  }
}

const app = new App();
app.init();
