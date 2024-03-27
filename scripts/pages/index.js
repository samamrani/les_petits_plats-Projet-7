import { HeaderTemplate } from "../templates/HeaderTemplate.js";
import { FiltersTemplate } from "../templates/FiltersTemplate.js";
import { RecipesTemplate } from "../templates/RecipesTemplate.js";
import { RecipeCardTemplate } from "../templates/RecipeCardTemplate.js";

class App {
  constructor() {
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];

    this.filtersTemplate = null;

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
    // this.setupDropdownEvent();
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

            this.updateFilters();
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

    this.filtersTemplate = filters;
    this.updateFilters();
    return filters.getDOM();
  }

  createRecipes() {
    //  trie les recettes en utilisant la méthode localeCompare()--ordre alphabétique
    const sortedRecipes = this.recipes.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const recipes = new RecipesTemplate(sortedRecipes);
    return recipes.getDOM();
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

  // mise ajour de l'affichage des recettes
  updateDisplayRecipes() {
    const recipes = this.filteredSearch.filter((recipe) =>
      this.filteredTags.includes(recipe)
    );
    // ????????????????????

    const recipesSection = document.querySelector(".recipes");
    recipesSection.innerHTML = "";

    recipes.forEach((recipe) => {
      const recipeCard = new RecipeCardTemplate(recipe);
      recipesSection.appendChild(recipeCard.getDOM());
    });

    // TODO: transformer le code ci-dessous en methode
    const countDiv = document.querySelector("#count");
    if (recipes.length > 0) {
      countDiv.textContent = `${recipes.length} Recette(s)`;
    } else {
      countDiv.textContent = "Aucune recette";
    }

    this.updateFilters(recipes);
  }

  updateFilters(recipes) {
    const filterItems = document.querySelectorAll(".dropdown__item");
    filterItems.forEach((item) => {
      const itemName = item.textContent.trim().toLowerCase();

      // ''closest''echercher l'élément parent le plus proche
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

//   https://validator.w3.org/
// ttps://jigsaw.w3.org/css-validator/
