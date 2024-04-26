import { HeaderTemplate } from "../templates/HeaderTemplate.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { RecipeCardTemplate } from "../templates/RecipeCardTemplate.js";

class App {
  constructor() {
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];

    this.filteredSearch = [];
    this.filteredTags = [];
    this.filtered = [];
  }

  async init() {
    // Récupérer les recettes depuis le fichier JSON
    this.recipes = await fetch("./data/recipes.json").then((res) => res.json());

    //  trier les recettes par ordre alphabétique
    this.recipes.sort((recipeA, recipeB) =>
      recipeA.name.localeCompare(recipeB.name)
    );

    // Mesure du temps d'exécution pour l'algorithme 1
    console.time("Algorithme 1");

    //Initialisation des variables de recherche filtrée
    this.filteredSearch = this.recipes;
    this.filteredTags = this.recipes;
    // this.filtered = this.recipes;
    this.displayData();

    console.timeEnd("Algorithme 1");

    // événements pour la fermeture des dropdowns en dehors
    this.cancelDropdownOnEvent();
  }

  displayData() {
    const body = document.querySelector("body");

    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();
    body.appendChild(headerElement);

    // 'événements la recherche sera actualisée dès que l'utilisateur relâchera une touche
    const inputElement = document.querySelector(".header__input");
    inputElement.addEventListener("input", (event) => {
      event.stopPropagation();
      const inputValue = event.target.value;
      this.updateRecipesSearch(inputValue);
    });

    // Création et ajout des filtres et des recettes
    const main = document.createElement("main");
    main.appendChild(this.createFiltersSection());
    main.appendChild(this.createTagsSection());
    main.appendChild(this.createRecipesSection());

    body.appendChild(main);

    //Mise à jour du compteur de recettes
    this.updateDisplayCountRecipes(this.recipes);
  }
  //
  cancelDropdownOnEvent() {
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
  // Préparation des options de filtrage
  prepareFiltersDropdown() {
    const uniqueIngredients = new Set();
    const uniqueAppliances = new Set();
    const uniqueUstensils = new Set();

    this.recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        uniqueIngredients.add(ingredient.ingredient.toLowerCase());
      });

      if (recipe.appliance) {
        uniqueAppliances.add(recipe.appliance.toLowerCase());
      }

      if (recipe.ustensils) {
        recipe.ustensils.forEach((ustensil) => {
          uniqueUstensils.add(ustensil.toLowerCase());
        });
      }
    });

    const sortTri = (item1, item2) => item1.localeCompare(item2);

    const ingredientsList = Array.from(uniqueIngredients).sort(sortTri);
    const appliancesList = Array.from(uniqueAppliances).sort(sortTri);
    const ustensilsList = Array.from(uniqueUstensils).sort(sortTri);

    return {
      ingredients: ingredientsList,
      appliances: appliancesList,
      ustensils: ustensilsList,
    };
  }
  // Création de la section des tags
  createTagsSection() {
    const resultSection = document.createElement("section");
    resultSection.id = "tags";
    return resultSection;
  }
  // Création de la section des filtres
  createFiltersSection() {
    const filtersData = this.prepareFiltersDropdown(this.filteredSearch);
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

          tag.dataset.category = dropdown.dataset.category;
          tag.dataset.key = li.dataset.key;

          const buttonClose = document.createElement("i");
          buttonClose.className = "fa-solid fa-xmark icon-close";
          buttonClose.addEventListener("click", (event) => {
            event.preventDefault();
            tag.remove();
            li.classList.remove("dropdown__item--selected");

            this.updateRecipesTags();
          });

          tag.appendChild(buttonClose);
          tagsSection.appendChild(tag);
        } else {
          const tag = tagsSection.querySelector(
            `.tag[data-category="${dropdown.dataset.category}"][data-key="${li.dataset.key}"]`
          );
          tag.remove();
        }
        this.updateRecipesTags();
      }
    );

    return filters.getDOM();
  }
  // Création de la section des recettes
  createRecipesSection() {
    const recipes = new RecipesTemplate(this.recipes);
    return recipes.getDOM();
  }
  updateRecipesSearch(searchText) {
    if (searchText.length >= 3) {
      const text = searchText.trim().toLowerCase();

      const filteredRecipes = [];
      // traverser toutes les recettes
      for (let i = 0; i < this.recipes.length; i++) {
        const recipe = this.recipes[i];
        const verifyName = recipe.name.toLowerCase().includes(text);
        const verifyDescription = recipe.description
          .toLowerCase()
          .includes(text);

        // traverser les ingredients de la recette
        let verifyIngredient = false;
        for (let a = 0; a < recipe.ingredients.length; a++) {
          const item = recipe.ingredients[a];
          if (item.ingredient.toLowerCase().includes(text)) {
            verifyIngredient = true;
            break;
          }
        }
        // ajouter la recette filtree
        if (verifyName || verifyDescription || verifyIngredient) {
          filteredRecipes.push(recipe);
        }
      }
      this.filteredSearch = filteredRecipes;
    } else {
      this.filteredSearch = this.recipes;
    }
    this.updateDisplayRecipes(this.filteredSearch);
  }
  // Mise à jour des recettes en fonction des tags sélectionnés
  updateRecipesTags() {
    const tags = document.querySelectorAll("#tags .tag");

    const recipes = this.recipes;

    // Stocker les éléments sélectionnés dans les tags
    const selectedIngredients = [];
    const selectedAppliances = [];
    const selectedUstensils = [];

    // parcourir chaque tag récupéré à partir de la première ligne
    tags.forEach((tag) => {
      //En fonction de la valeur de l'attribut, tag est ajouté au tableau
      if (tag.dataset.category === "Ingrédients") {
        selectedIngredients.push(tag.textContent.trim().toLowerCase());
      } else if (tag.dataset.category === "Appareils") {
        selectedAppliances.push(tag.textContent.trim().toLowerCase());
      } else if (tag.dataset.category === "Ustensiles") {
        selectedUstensils.push(tag.textContent.trim().toLowerCase());
      }
    });

    // Filtrer les recettes en fonction des éléments sélectionnés
    const filtered = recipes.filter((recipe) => {
      const verifyIngredients =
        selectedIngredients.length === 0 ||
        selectedIngredients.every((selectedIngredient) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(selectedIngredient)
          )
        );
      const verifyAppliances =
        selectedAppliances.length === 0 ||
        selectedAppliances.includes(recipe.appliance.toLowerCase());

      const verifyUstensils =
        selectedUstensils.length === 0 ||
        selectedUstensils.every((selectedUstensil) =>
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(selectedUstensil)
          )
        );
      return verifyIngredients && verifyAppliances && verifyUstensils;
    });

    this.filteredTags = filtered;
    this.updateDisplayRecipes(filtered);
  }
  // Mise à jour de l'affichage des recettes
  updateDisplayRecipes() {
    const recipes = this.filteredSearch.filter((recipe) =>
      this.filteredTags.includes(recipe)
    );

    const recipesSection = document.querySelector(".recipes");
    recipesSection.innerHTML = "";

    recipes.forEach((recipe) => {
      const recipeCard = new RecipeCardTemplate(recipe);
      recipesSection.appendChild(recipeCard.getDOM());
    });

    this.updateDisplayCountRecipes(recipes);
    this.updateFiltersDropdown(recipes);
  }
  // Mise à jour du compteur de recettes affichées
  updateDisplayCountRecipes(recipes) {
    const countDiv = document.querySelector("#count");

    if (recipes.length > 0) {
      countDiv.textContent = `${recipes.length} Recette(s)`;
    } else {
      countDiv.textContent = "Aucune recette";
    }
  }
  //  Mise à jour des options de filtrage dans le menu déroulant
  updateFiltersDropdown(recipes) {
    const filterItems = document.querySelectorAll(".dropdown__item");
    filterItems.forEach((item) => {
      const itemName = item.textContent.trim().toLowerCase();

      // 'closest'echercher l'élément parent le plus proche
      const dropdown = item.closest(".dropdown");
      const category = dropdown.dataset.category.toLowerCase();

      let isRecipe = false;

      // si l'éléments est présent dans la recette
      if (category === "ingrédients") {
        isRecipe = recipes.some((recipeItem) =>
          recipeItem.ingredients.some((ingredientItem) =>
            ingredientItem.ingredient.toLowerCase().includes(itemName)
          )
        );
      } else if (category === "appareils") {
        isRecipe = recipes.some(
          (recipeItem) =>
            recipeItem.appliance &&
            recipeItem.appliance.toLowerCase().includes(itemName)
        );
      } else if (category === "ustensiles") {
        isRecipe = recipes.some(
          (recipeItem) =>
            recipeItem.ustensils &&
            recipeItem.ustensils.some((ustensil) =>
              ustensil.toLowerCase().includes(itemName)
            )
        );
      }

      if (isRecipe) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  }
}
const app = new App();
app.init();
