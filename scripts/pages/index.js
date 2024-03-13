import { HeaderTemplate } from "../templates/HeaderTemplate.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";

class App {
  constructor() {}

  async init() {
    // Récupérer les recettes depuis le fichier JSON
    this.recipes = await fetch("./data/recipes.json").then((res) => res.json());

    this.displayData();

    // Gestionnaire d'événements pour la fermeture des dropdowns en dehors
    this.setupDropdownEvent();
  }

  displayData() {
    const body = document.querySelector("body");

    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();
    body.appendChild(headerElement);

    // 'événements pour la saisie dans la barre de recherche
    const inputElement = document.querySelector(".header__input");
    inputElement.addEventListener("input", (event) => {
      event.stopPropagation();
      const inputValue = event.target.value;
      this.searchRecipes(inputValue);
    });

    // Création et ajout des filtres et des recettes
    const main = document.createElement("main");
    main.appendChild(this.createFilters());
    main.appendChild(this.createResultSection());
    main.appendChild(this.createRecipes());

    body.appendChild(main);
  }

  getItems() {
    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();
    const uniqueUstensils = new Set();

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

    const fnSort = (item1, item2) => item1.localeCompare(item2);

    const ingredientsArray = Array.from(uniqueIngredients).sort(fnSort);
    const appliancesArray = Array.from(uniqueAppliances).sort(fnSort);
    const ustensilsArray = Array.from(uniqueUstensils).sort(fnSort);

    return {
      ingredients: ingredientsArray,
      appliances: appliancesArray,
      ustensils: ustensilsArray,
    };
  }

  createResultSection() {
    const resultSection = document.createElement("section");
    resultSection.id = "tags";
    return resultSection;
  }

  createFilters() {
    const filtersData = this.getItems();
    const filters = new FiltersTemplate(
      filtersData.ingredients,
      filtersData.appliances,
      filtersData.ustensils,
      (dropdown, li, item, selected) => {
        const tagsSection = document.querySelector("#tags");

        if (selected) {
          const tag = document.createElement("div");
          tag.textContent = item;
          tag.className = "tag";
          // tag.id = li.id;
          tag.dataset.category = dropdown.dataset.category;
          tag.dataset.key = li.dataset.key;

          const buttonClose = document.createElement("i");
          buttonClose.className = "fa-solid fa-xmark icon-close";
          buttonClose.addEventListener("click", (event) => {
            event.preventDefault();
            tag.remove();
            li.classList.remove("dropdown__item--selected");
          });

          tag.appendChild(buttonClose);
          tagsSection.appendChild(tag);
        } else {
          const tag = tagsSection.querySelector(
            `.tag[data-category="${dropdown.dataset.category}"][data-key="${li.dataset.key}"]`
          );
          tag.remove();
        }

        this.updateRecipeTags();
      }
    );
    return filters.getDOM();
  }

  createRecipes() {
    const recipes = new RecipesTemplate(this.recipes);
    return recipes.getDOM();
  }

  setupDropdownEvent() {
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

  searchRecipes(searchInput) {
    const regex = new RegExp(searchInput, "i");
    const filteredRecipes = this.recipes.filter((recipe) =>
      regex.test(recipe.name)
    );
    const recipesTemplate = new RecipesTemplate(filteredRecipes);
    const recipesSection = document.querySelector(".recipes");
    recipesSection.innerHTML = "";
    recipesSection.appendChild(recipesTemplate.getDOM());
  }

  // ,????????????????
  updateRecipeTags() {
    const tags = document.querySelectorAll("#tags .tag");
  }
}

const app = new App();
app.init();
