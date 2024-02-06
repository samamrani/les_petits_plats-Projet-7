export class DropdownTemplate {
  constructor(ingredient, appliance, ustensiles) {
    this.ingredient = ingredient;
    this.appliance = appliance;
    this.ustensiles = ustensiles;
    this.recetteClickCount = 0;
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
    searchIcon.className = "fas fa-search hidden";

    const inputElement = document.createElement("input");
    inputElement.className = "dropdown__input";
    inputElement.type = "search";
    inputElement.placeholder = `Rechercher une recette, un ingrédient, ${category}`;

    // la liste déroulante
    liste.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      dropdownMenu.appendChild(listItem);
    });

    container.appendChild(dropdownDiv);
    container.appendChild(searchIcon);
    container.appendChild(inputElement);
    container.appendChild(dropdownMenu);
    container.appendChild(icone);

    // Initialiser la liste comme cachée
    dropdownMenu.classList.add("hidden");

    // L'événement de clic "l'affichage ou masquage du menu déroulant"
    icone.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdownMenu.classList.toggle("show");
      inputElement.classList.toggle("show");
      searchIcon.classList.toggle(
        "hidden",
        inputElement.classList.contains("hidden")
      );
    });

    // Ajout événement d'entrée pour réagir modifications dans barre de recherche
    inputElement.addEventListener("input", (event) => {
      event.stopPropagation();
      const searchTerm = inputElement.value.toLowerCase();
      const listItems = dropdownMenu.getElementsByTagName("li");

      for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const text = listItem.textContent.toLowerCase();
        listItem.style.display = text.includes(searchTerm) ? "block" : "none";
      }

      // Afficher la liste uniquement si la barre de recherche n'est pas vide
      dropdownMenu.classList.toggle(
        "show",
        searchTerm !== "" && !inputElement.classList.contains("hidden")
      );
      // Cacher l'icône lorsque l'input est caché
      searchIcon.classList.toggle(
        "hidden",
        inputElement.classList.contains("hidden")
      );
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

    // événement de clic pour incrémenter le compteur
    div4.addEventListener("click", () => {
      this.recetteClickCount++;
      // Mettez à jour le texte de la balise span pour afficher le compteur
      countElement.textContent = this.recetteClickCount.toString();
    });
    //span pour afficher le compteur
    const countElement = document.createElement("span");
    countElement.className = "click-count";
    countElement.textContent = "0";
    div4.appendChild(countElement);

    mainElement.appendChild(div4);

    return mainElement;
  }
}
