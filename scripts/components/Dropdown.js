export class Dropdown {
  constructor(name, list) {
    this.name = name;
    this.list = list;
  }

  getDOM() {
    const container = document.createElement("div");
    container.className = "dropdown";

    const icon = document.createElement("div");
    icon.className = "dropdown__icone";
    icon.innerHTML = '<i class="fa-solid fa-angle-down"></i>';

    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown__Div";
    dropdownDiv.textContent = `${this.name}`;

    const dropdownMenu = document.createElement("ul");
    dropdownMenu.className = "dropdown__ul";

    // l'icône de recherche
    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search hidden";

    const inputElement = document.createElement("input");
    inputElement.className = "dropdown__input";
    inputElement.type = "search";
    inputElement.placeholder = "Rechercher...";

    // la liste déroulante
    this.list.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      dropdownMenu.appendChild(listItem);
    });

    container.appendChild(dropdownDiv);
    container.appendChild(searchIcon);
    container.appendChild(inputElement);
    container.appendChild(dropdownMenu);
    container.appendChild(icon);

    // Initialiser la liste comme cachée
    dropdownMenu.classList.add("hidden");

    // L'événement de clic "l'affichage ou masquage du menu déroulant"
    icon.addEventListener("click", (event) => {
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
}
