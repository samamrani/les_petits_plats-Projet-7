export class DropDownSearch {
  constructor(searchChange) {
    this.searchChange = searchChange;
  }

  getDOM() {
    const dropdownSearch = document.createElement("div");
    dropdownSearch.className = "dropdown__search";

    const dropdownInput = document.createElement("input");
    dropdownInput.className = "dropdown__input";
    dropdownInput.type = "text";
    dropdownInput.placeholder = "Rechercher...";

    const resetButton = document.createElement("i");
    resetButton.id = "resetButton";
    resetButton.className = "fa-solid fa-xmark reset-icon hidden";

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search search-icon";

    const errorMessage = document.createElement("div");
    errorMessage.className = "errorMessage hidden";
    errorMessage.textContent = "Aucun résultat";

    dropdownSearch.appendChild(dropdownInput);
    dropdownSearch.appendChild(resetButton);
    dropdownSearch.appendChild(searchIcon);
    dropdownSearch.appendChild(errorMessage);

    //gestionnaire d'événement de reset input
    resetButton.addEventListener("click", (event) => {
      event.stopPropagation();

      dropdownInput.value = "";
      resetButton.classList.add("hidden");

      this.searchChange("");
    });

    // gestionnaire d'événements pour la recherche
    dropdownInput.addEventListener("input", (event) => {
      event.stopPropagation();

      const inputValue = dropdownInput.value;
      if (inputValue) {
        resetButton.classList.remove("hidden");
      } else {
        resetButton.classList.add("hidden");
      }
    });

    return dropdownSearch;
  }
}
