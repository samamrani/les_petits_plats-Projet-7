import { HeaderTemplate } from "../templates/HeaderTemplate.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";

class App {
  constructor() {
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.recipes = null;
    this.filtersTemplate = null;
  }

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

    // ???????????????????????
    this.updateRecipeTags();
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

          // orsque l'utilisateur sélectionne une recette, j'appelle
          this.searchRecipes(item);
          // -------------------
        } else {
          const tag = tagsSection.querySelector(
            `.tag[data-category="${dropdown.dataset.category}"][data-key="${li.dataset.key}"]`
          );
          tag.remove();
        }

        this.updateRecipeTags();
      }
    );
    // initialiser filtersTemplate
    this.filtersTemplate = filters;

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

  // *********************************

  // ,????????????????,,,,,,,,,,,,,,,,,,,,,??????????????????
  // ?????????????????????????????????????????????????????????|||||||
  searchRecipes(selected) {
    console.log(selected);

    const recipesContainer = document.querySelector(".recipes");
    recipesContainer.innerHTML = "";

    // Filtre les recettes correspondant à la recherche
    const filteredRecipes = this.recipes.filter((recipe) => {
      const recipeName = recipe.name
        .toLowerCase()
        .includes(selected.toLowerCase());

      const ingredientsName = recipe.ingredients.find((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(selected.toLowerCase())
      );

      const appliancesName =
        recipe.appliances &&
        recipe.appliances.find((appliance) =>
          appliance.appliance.toLowerCase().includes(selected.toLowerCase())
        );

      const ustensilsName =
        recipe.ustensils &&
        recipe.ustensils.find(
          (ustensil) =>
            ustensil.ustensil &&
            ustensil.ustensil.toLowerCase().includes(selected.toLowerCase())
        );
      return recipeName || ingredientsName || appliancesName || ustensilsName;
    });

    // Mettre à jour recipes avec les recettes filtrées
    this.recipes = filteredRecipes;

    // Mettre à jour le compteur avec le nombre de recettes
    this.updateRecipeCount();
  }

  updateRecipeCount() {
    const countDiv = document.querySelector("#count");
    if (countDiv) {
      countDiv.textContent = `${this.recipes.length} Recette(s)`;
    }

    // Mettre à jour l'affichage avec les recettes filtrées
    if (this.recipes.length > 0) {
      const recipesTemplate = new RecipesTemplate(this.recipes);
      const recipesSection = document.querySelector(".recipes");
      recipesSection.innerHTML = "";
      recipesSection.appendChild(recipesTemplate.getDOM());
    }
    // Mettre à jour le nombre de recettes filtrées
    this.filtersTemplate.updateRecipeCount(this.recipes.length);
  }

  // //METTRE A JOUR LA LISTE DES RECETTES
  updateRecipeTags() {
    const tagsSection = document.querySelector("#tags");

    tagsSection.innerHTML = "";

    const filtersContainers = document.querySelectorAll(".filters__container");

    filtersContainers.forEach((container) => {
      const selectedTags = container.querySelectorAll(".tag");

      selectedTags.forEach((tag) => {
        const newTag = document.createElement("div");
        newTag.textContent = tag.textContent;
        newTag.className = "tag";
        newTag.dataset.category = tag.dataset.category;
        newTag.dataset.key = tag.dataset.key;

        // Bouton de fermeture
        const buttonClose = document.createElement("i");
        buttonClose.className = "fa-solid fa-xmark icon-close";
        buttonClose.addEventListener("click", (event) => {
          event.preventDefault();
          newTag.remove();
        });

        newTag.appendChild(buttonClose);
        tagsSection.appendChild(newTag);
      });
    });
  }
}

const app = new App();
app.init();
