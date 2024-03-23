import { HeaderTemplate } from "../templates/HeaderTemplate.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { RecipeCardTemplate } from "../templates/RecipeCardTemplate.js";

class App {
  constructor() {
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];

    // this.filtersTemplate = null;

    this.filteredSearch = [];
    this.filteredTags = [];
    this.filtered = [];
  }

  async init() {
    // Récupérer les recettes depuis le fichier JSON
    this.recipes = await fetch("./data/recipes.json").then((res) => res.json());
    this.filteredSearch = this.recipes;
    this.displayData();

    // événements pour la fermeture des dropdowns en dehors
    this.setupDropdownEvent();

    // ?????????????????????
    this.updateRecipesTags();
  }

  displayData() {
    const body = document.querySelector("body");

    const headerTemplate = new HeaderTemplate();
    const headerElement = headerTemplate.getDOM();
    body.appendChild(headerElement);

    // 'événements---keyup, la recherche sera actualisée dès que l'utilisateur relâchera une touche
    const inputElement = document.querySelector(".header__input");
    inputElement.addEventListener("keyup", (event) => {
      event.stopPropagation();
      const inputValue = event.target.value;
      this.updateRecipesSearch(inputValue);
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
    const filtersData = this.getItems(this.filteredSearch);
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
          this.updateRecipesTags(item);
          // -------------------
        } else {
          const tag = tagsSection.querySelector(
            `.tag[data-category="${dropdown.dataset.category}"][data-key="${li.dataset.key}"]`
          );
          // ,,,,,
          tag.remove();

          this.updateRecipesTags();
        }
      }
    );
    // initialise filtersTemplate
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

  updateRecipesSearch(searchText) {
    if (searchText.length >= 3) {
      // supprim les espaces et passer en miniscule
      const text = searchText.trim().toLowerCase();

      // Filtrer les recettes correspondant à la recherche
      const filteredRecipes = this.recipes.filter((recipe) => {
        const nameRecipe = recipe.name.toLowerCase().includes(text);
        const descRecipe = recipe.description.toLowerCase().includes(text);

        // Vérifie ingrédient correspond à la recherche
        const ingredientRecipe = recipe.ingredients.find((item) =>
          item.ingredient.toLowerCase().includes(text)
        );

        // Retourner true si au moins correspond
        return nameRecipe || descRecipe || ingredientRecipe;
      });

      // Mettre à jour la liste des recettes à afficher
      this.filteredSearch = filteredRecipes;

      // Mettre à jour l'affichage avec les recettes filtrées
      this.updateDisplayRecipes(filteredRecipes);
    } else {
      // inférieure à 3, vide résultats de la recherche
      this.filteredSearch = [];
      this.updateDisplayRecipes([]);
    }
  }
  // met à jour la visibilité des recettes en fonction des tags sélectionnés
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
      let verifyIngredients = true;
      let verifyAppliances = true;
      let verifyUstensils = true;

      if (selectedIngredients.length > 0) {
        verifyIngredients = recipe.ingredients.some((ingredient) =>
          selectedIngredients.includes(ingredient.ingredient.toLowerCase())
        );
      }
      // si l'appareil de la recette correspond à l'appareil sélectionné.
      if (selectedAppliances.length > 0) {
        verifyAppliances = selectedAppliances.includes(
          recipe.appliance.toLowerCase()
        );
      }
      if (selectedUstensils.length > 0) {
        verifyUstensils = recipe.ustensils.some((ustensil) =>
          selectedUstensils.includes(ustensil.toLowerCase())
        );
      }
      return verifyIngredients && verifyAppliances && verifyUstensils;
    });
    console.log(filtered);

    this.updateDisplayRecipes(filtered);
  }

  // mise ajour de l'affichage des recettes
  updateDisplayRecipes(recipes) {
    const recipesSection = document.querySelector(".recipes");
    recipesSection.innerHTML = "";

    recipes.forEach((recipe) => {
      const recipeCard = new RecipeCardTemplate(recipe);
      recipesSection.appendChild(recipeCard.getDOM());
    });

    const countDiv = document.querySelector("#count");
    if (recipes.length > 0) {
      countDiv.textContent = `${recipes.length} Recette(s)`;
    } else {
      countDiv.textContent = "Aucune recette";
    }
  }
}

const app = new App();
app.init();
