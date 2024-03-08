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
    dropdownInput.placeholder = "Rechercher...";

    const resetButton = document.createElement("i");
    resetButton.className = "fa-solid fa-xmark hidden";

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    dropdownSearch.appendChild(dropdownInput);
    dropdownSearch.appendChild(resetButton);
    dropdownSearch.appendChild(searchIcon);

    //gestionnaire d'événement de reset input
    resetButton.addEventListener("click", (event) => {
      event.stopPropagation();

      dropdownInput.value = "";
      resetButton.classList.add("hidden");
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

      const dropdownItems = this.dropdownList.querySelectorAll("li");

      dropdownItems.forEach((item) => {
        const itemName = item.textContent;
        if (itemName.includes(inputValue)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });

    return dropdownSearch;
  }
}
