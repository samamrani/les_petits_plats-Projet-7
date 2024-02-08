export class Dropdown {
  constructor(category, list) {
    this.category = category;
    this.list = list;
  }

  getDOM() {
    const container = document.createElement("div");
    container.className = "dropdown";

    const innerContainer = document.createElement("div");

    const headerDiv = document.createElement("div");
    headerDiv.className = "dropdown__header";

    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown__Div";
    dropdownDiv.textContent = `${this.category}`;

    const icon = document.createElement("div");
    icon.className = "dropdown__icone";
    icon.innerHTML = '<i class="fa-solid fa-angle-down"></i>';

    headerDiv.appendChild(dropdownDiv);
    headerDiv.appendChild(icon);

    const dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown__ul";

    const dropdownIconInput = document.createElement("div");
    dropdownIconInput.className = "dropdown__iconeInput";

    const inputElement = document.createElement("input");
    inputElement.className = "dropdown__input";
    inputElement.type = "search";
    inputElement.placeholder = "Rechercher...";

    // l'icône de recherche
    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    dropdownIconInput.appendChild(inputElement);
    dropdownIconInput.appendChild(searchIcon);

    // la liste déroulante
    this.list.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      dropdownMenu.appendChild(listItem);
    });

    innerContainer.appendChild(headerDiv);

    innerContainer.appendChild(dropdownIconInput);
    innerContainer.appendChild(dropdownMenu);

    container.appendChild(innerContainer);

    // L'événement de clic "l'affichage ou masquage du menu déroulant"
    icon.addEventListener("click", (event) => {
      event.stopPropagation();
      //toggle=basculer---ajouter ou supprimer une classe CSS à un élément HTML
      dropdownMenu.classList.toggle("show"); // show=montrer
      inputElement.classList.toggle("show");
      searchIcon.classList.toggle("show");
    });

    // Ajout événement d'entrée pour barre de recherche
    inputElement.addEventListener("input", (event) => {
      event.stopPropagation();
      const searchTerm = inputElement.value;
      const listItems = dropdownMenu.getElementsByTagName("li");

      for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const text = listItem.textContent;
        listItem.style.display = text.includes(searchTerm) ? "block" : "none";
      }

      // Afficher la liste uniquement si la barre de recherche n'est pas vide
      dropdownMenu.classList.toggle("show", searchTerm !== "");
      // Afficher l'icône de recherche même si la barre de recherche est vide
      searchIcon.classList.add("show");
    });

    return container;
  }
}
