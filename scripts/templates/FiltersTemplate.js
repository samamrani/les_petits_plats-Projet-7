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

    const div1 = new Dropdown("Ingrédients", this.ingredients);
    const div1Element = div1.getDOM();
    wrapper.appendChild(div1Element);

    const div2 = new Dropdown("Appareils", this.appliances);
    const div2Element = div2.getDOM();
    wrapper.appendChild(div2Element);

    const div3 = new Dropdown("Ustensiles", this.ustensils);
    const div3Element = div3.getDOM();
    wrapper.appendChild(div3Element);

    const div4 = document.createElement("div");
    div4.className = "dropdown__recette";
    div4.textContent = "50 Recette(s) ";
    wrapper.appendChild(div4);

    // Compteur de clics
    let clickCount = 0;

    // Événement de clic pour mettre à jour div4 avec le nombre de clics
    const updateDiv4 = () => {
      clickCount++;
      div4.textContent = `${clickCount} Recette(s)`;
    };

    //écouteurs d'événements de clic à chaque élément de liste des dropdowns
    const addClickListeners = (dropdownElement) => {
      dropdownElement.querySelectorAll(".dropdown__list li").forEach((item) => {
        item.addEventListener("click", (event) => {
          event.stopPropagation(); // Empêche la propagation du clic
          updateDiv4();
        });
      });
    };

    addClickListeners(div1Element);
    addClickListeners(div2Element);
    addClickListeners(div3Element);

    return wrapper;
  }
}
