export class DropDownSearch {
  constructor(dropdownList) {
    this.dropdownList = dropdownList;
  }

  getDOM() {
    const dropdownSearch = document.createElement("div");
    dropdownSearch.className = "dropdown__search";

    const dropdownInput = document.createElement("input");
    dropdownInput.className = "dropdown__input";
    dropdownInput.type = "text";
    dropdownInput.name = "search";
    dropdownInput.minLength = 3;
    dropdownInput.placeholder = "Rechercher...";
    dropdownInput.id = search;

    const closeButton = document.createElement("i");
    closeButton.className = "fa-solid fa-xmark";
    closeButton.style.display = "none";

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    dropdownSearch.appendChild(dropdownInput);
    dropdownSearch.appendChild(closeButton);
    dropdownSearch.appendChild(searchIcon);

    // la fermeture de bouton de fermeture
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();

      dropdownInput.value = "";
      closeButton.style.display = "none";
    });

    // gestionnaire d'événements pour la barre de recherche
    dropdownInput.addEventListener("input", (event) => {
      event.stopPropagation();

      const inputValue = dropdownInput.value;
      closeButton.style.display = inputValue ? "block" : "none";

      const dropdownItems = this.dropdownList.querySelectorAll("li");

      dropdownItems.forEach((item) => {
        const itemName = item.textContent;
        if (itemName.includes(inputValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });

    return dropdownSearch;
  }
}
