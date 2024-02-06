import { Dropdown } from "../components/Dropdown.js";

export class FiltersTemplate {
  constructor(ingredients, appliances, ustensils) {
    this.ingredients = ingredients;
    this.appliances = appliances;
    this.ustensils = ustensils;
    this.recetteClickCount = 0;
  }

  getDOM() {
    const wrapper = document.createElement("section");
    wrapper.className = "filters";

    const div1 = new Dropdown("Ingrédients", this.ingredients);
    wrapper.appendChild(div1.getDOM());

    const div2 = new Dropdown("Appareils", this.appliances);
    wrapper.appendChild(div2.getDOM());

    const div3 = new Dropdown("Ustensiles", this.ustensils);
    wrapper.appendChild(div3.getDOM());

    const div4 = document.createElement("div");
    div4.className = "dropdown dropdown__div";
    div4.textContent = "recette";

    // Événement de clic pour incrémenter le compteur
    const incrementCount = () => {
      this.recetteClickCount++;
      // Mettre à jour le texte de la balise span pour afficher le compteur
      countElement.textContent = this.recetteClickCount.toString();
    };

    // Ajouter l'événement de clic à tous les dropdowns
    wrapper.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.addEventListener("click", incrementCount);
    });

    // Span pour afficher le compteur
    const countElement = document.createElement("span");
    countElement.className = "click-count";
    countElement.textContent = "0";
    div4.appendChild(countElement);

    wrapper.appendChild(div4);

    return wrapper;
  }
}
