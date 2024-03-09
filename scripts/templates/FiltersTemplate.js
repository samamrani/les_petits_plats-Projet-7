import { Dropdown } from "../components/Dropdown.js";
export class FiltersTemplate {
  constructor(ingredients, appliances, ustensils) {
    this.ingredients = ingredients;
    this.appliances = appliances;
    this.ustensils = ustensils;
    this.recipeCount = 50;
  }

  // mettre à jour le compteur de recettes
  updateRecipeCount() {
    this.recipeCount++;
    const recipeCountDiv = document.querySelector(".dropdown__recette");
    if (recipeCountDiv) {
      recipeCountDiv.textContent = `${this.recipeCount} Recette(s)`;
    }
  }

  getDOM() {
    const dropdownSection = document.createElement("section");
    dropdownSection.className = "dropdown__filters";

    // Création du dropdown pour les ingrédients
    const ingredientsDropdown = new Dropdown("Ingrédients", this.ingredients);
    const ingredientsDropdownDOM = ingredientsDropdown.getDOM();

    // ingredientsDropdownDOM.addEventListener("change", () => {
    //   this.updateRecipeCount();
    // });

    dropdownSection.appendChild(ingredientsDropdownDOM);

    // Création du dropdown pour les appareils
    const appliancesDropdown = new Dropdown("Appareils", this.appliances);
    const appliancesDropdownDOM = appliancesDropdown.getDOM();

    // appliancesDropdownDOM.addEventListener("change", () => {
    //   this.updateRecipeCount();
    // });

    dropdownSection.appendChild(appliancesDropdownDOM);

    // Création du dropdown pour les ustensiles
    const ustensilsDropdown = new Dropdown("Ustensiles", this.ustensils);
    const ustensilsDropdownDOM = ustensilsDropdown.getDOM();

    // ustensilsDropdownDOM.addEventListener("change", () => {
    //   this.updateRecipeCount();
    // });

    dropdownSection.appendChild(ustensilsDropdownDOM);

    // Ajout du div pour afficher le nombre de recettes
    const recipeCountDiv = document.createElement("div");
    recipeCountDiv.className = "dropdown__recette";
    recipeCountDiv.textContent = `${this.recipeCount} Recette(s)`;
    dropdownSection.appendChild(recipeCountDiv);

    return dropdownSection;
  }
}
