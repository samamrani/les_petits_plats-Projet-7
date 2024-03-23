import { Dropdown } from "../components/Dropdown.js";

export class FiltersTemplate {
  constructor(ingredients, appliances, ustensils, selectChange) {
    this.ingredients = ingredients;
    this.appliances = appliances;
    this.ustensils = ustensils;
    this.selectChange = selectChange;

    this.filteredRecipes = [];
  }

  getDOM() {
    const filtersSection = document.createElement("section");
    filtersSection.className = "filters";

    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters__container";

    // Création des dropdowns pour les ingrédients, appareils et ustensiles
    const ingredientsDropdown = new Dropdown(
      "Ingrédients",
      this.ingredients,
      this.selectChange
    );
    const appliancesDropdown = new Dropdown(
      "Appareils",
      this.appliances,
      this.selectChange
    );
    const ustensilsDropdown = new Dropdown(
      "Ustensiles",
      this.ustensils,
      this.selectChange
    );

    // Ajout des dropdowns au DOM
    filtersContainer.appendChild(ingredientsDropdown.getDOM());
    filtersContainer.appendChild(appliancesDropdown.getDOM());
    filtersContainer.appendChild(ustensilsDropdown.getDOM());

    filtersSection.appendChild(filtersContainer);

    // Afficher le nombre de recettes
    const recipeCountDiv = document.createElement("div");
    recipeCountDiv.id = "count";
    recipeCountDiv.className = "filters__recette";
    recipeCountDiv.textContent = `${this.filteredRecipes.length} Recette(s)`;
    filtersSection.appendChild(recipeCountDiv);

    return filtersSection;
  }
}
