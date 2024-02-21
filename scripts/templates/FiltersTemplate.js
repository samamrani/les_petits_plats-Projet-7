import { Dropdown } from "../components/Dropdown.js";
export class FiltersTemplate {
  constructor(ingredients, appliances, ustensils) {
    this.ingredients = ingredients;
    this.appliances = appliances;
    this.ustensils = ustensils;
  }

  getDOM() {
    const wrapper = document.createElement("section");
    wrapper.className = "dropdown__filters";

    // Création du dropdown pour les ingrédients
    const ingredientsDropdown = new Dropdown("Ingrédients", this.ingredients);
    const ingredientsDropdownDOM = ingredientsDropdown.getDOM();
    wrapper.appendChild(ingredientsDropdownDOM);

    // Création du dropdown pour les appareils
    const appliancesDropdown = new Dropdown("Appareils", this.appliances);
    const appliancesDropdownDOM = appliancesDropdown.getDOM();
    wrapper.appendChild(appliancesDropdownDOM);

    // Création du dropdown pour les ustensiles
    const ustensilsDropdown = new Dropdown("Ustensiles", this.ustensils);
    const ustensilsDropdownDOM = ustensilsDropdown.getDOM();
    wrapper.appendChild(ustensilsDropdownDOM);

    // Ajout du div pour afficher le nombre de recettes
    const recipeCountDiv = document.createElement("div");
    recipeCountDiv.className = "dropdown__recette";
    recipeCountDiv.textContent = "50 Recette(s) "; // Initial count
    wrapper.appendChild(recipeCountDiv);

    // Compteur de clics
    let clickCount = 0;

    //  mettre à jour le nombre de recettes affichées
    const updateRecipeCount = () => {
      clickCount++;
      recipeCountDiv.textContent = `${clickCount} Recette(s)`;
    };

    // écouteurs d'événements de clic à chaque élément de liste des dropdowns
    const addClickListeners = (dropdownElement) => {
      dropdownElement.querySelectorAll(".dropdown__list li").forEach((item) => {
        item.addEventListener("click", (event) => {
          event.stopPropagation(); // Empêche la propagation du clic
          updateRecipeCount();
        });
      });
    };

    // écouteurs d'événements de clic à chaque dropdown
    addClickListeners(ingredientsDropdownDOM);
    addClickListeners(appliancesDropdownDOM);
    addClickListeners(ustensilsDropdownDOM);

    return wrapper;
  }
}
