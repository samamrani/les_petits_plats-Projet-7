export class DropdownTemplate {
  constructor(ingredient, appliance, ustensiles) {
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensiles = ustensiles;
  }

  createElement(category, liste) {
    const container = document.createElement("div");
    container.className = "dropdown";

    const icone = document.createElement("div");
    icone.className = "dropdown__icone";
    icone.innerHTML = '<i class="fa-solid fa-angle-down"></i>';

    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown__Div";
    dropdownDiv.textContent = `${category}`;

    const dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown__ul";

    // l'icône de recherche
    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    const searchIconListItem = document.createElement("li");
    searchIconListItem.appendChild(searchIcon);
    dropdownMenu.appendChild(searchIconListItem);

    const inputElement = document.createElement("input");
    inputElement.className = "dropdown__input";
    inputElement.type = "search";
    inputElement.placeholder = `Rechercher une recette, un ingrédient,  ${category}`;
    searchIconListItem.appendChild(inputElement);

    // la liste déroulante
    liste.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      dropdownMenu.appendChild(listItem);
    });

    container.appendChild(dropdownDiv);
    container.appendChild(dropdownMenu);
    container.appendChild(icone);

    // dropdownMenu.classList.add("hidden");
    // L'événement de clic "l'affichage ou masquage du menu déroulant"
    icone.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
      inputElement.classList.toggle("show");
    });

    searchIconListItem.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });

    // Ajoutez cet événement d'entrée pour réagir aux modifications dans la barre de recherche
    inputElement.addEventListener("input", () => {
      const searchTerm = inputElement.value.toLowerCase();
      const listItems = dropdownMenu.getElementsByTagName("li");

      for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const text = listItem.textContent.toLowerCase();

        if (text.includes(searchTerm)) {
          listItem.style.display = "block";
        } else {
          listItem.style.display = "none";
        }
      }
    });

    return container;
  }

  getDOM() {
    console.log("Appareils:", this.appliance);
    console.log("Ustensiles:", this.ustensiles);

    const mainElement = document.createElement("main");

    const div1 = this.createElement("ingredients", this.ingredient);
    div1.className = "dropdown";

    const div2 = this.createElement("appareils", this.appliance);
    div2.className = "dropdown";

    const div3 = this.createElement("ustensiles", this.ustensiles);
    div3.className = "dropdown";

    mainElement.appendChild(div1);
    mainElement.appendChild(div2);
    mainElement.appendChild(div3);

    const div4 = document.createElement("div");
    div4.className = "dropdown dropdown__div";
    div4.textContent = "recette";

    mainElement.appendChild(div4);

    return mainElement;
  }
}
