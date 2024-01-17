export class DropdownTemplate {
  constructor() {
    // this.api = api;
  }

  getDOM() {
    const mainElement = document.createElement("main");

    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "dropdown";
    dropdownContainer.id = "dropdownId";

    // Création des conteneurs de menu déroulant pour différentes catégories
    const container1 = this.createDropdownContainer("ingredient");
    const container2 = this.createDropdownContainer("appareil");
    const container3 = this.createDropdownContainer("ustensile");

    const recettesContainer = document.createElement("div");
    recettesContainer.className = "dropdown__recettes";
    recettesContainer.innerHTML = "<h2>recettes</h2>";

    dropdownContainer.appendChild(container1);
    dropdownContainer.appendChild(container2);
    dropdownContainer.appendChild(container3);
    dropdownContainer.appendChild(recettesContainer);

    mainElement.appendChild(dropdownContainer);

    return mainElement;
  }

  createDropdownContainer(optionValue) {
    const container = document.createElement("div");
    container.className = "dropdown__container";

    const select = document.createElement("select");
    select.id = "category";
    select.name = "category";

    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;

    select.appendChild(option);
    container.appendChild(select);

    return container;
  }
}
