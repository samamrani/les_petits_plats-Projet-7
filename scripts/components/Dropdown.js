export class Dropdown {
  constructor(category, list) {
    this.category = category;
    this.list = list;
    this.openIcon = false;
    this.selectedItems = [];
  }

  getDOM() {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    const dropdownButton = document.createElement("button");
    dropdownButton.className = "dropdown__button";

    const dropdownCategory = document.createElement("div");
    dropdownCategory.className = "dropdown__category";
    dropdownCategory.textContent = `${this.category}`;

    const iconElement = document.createElement("div");
    iconElement.className = "dropdown__icone";
    iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    iconElement.setAttribute("aria-hidden", "true");

    dropdownButton.appendChild(dropdownCategory);
    dropdownButton.appendChild(iconElement);

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown__content hidden";

    const dropdownIconInputDiv = document.createElement("div");
    dropdownIconInputDiv.className = "dropdown__search";

    const dropdownInput = document.createElement("input");
    dropdownInput.className = "dropdown__input";
    dropdownInput.type = "text";
    dropdownInput.name = "search";
    dropdownInput.minLength = 3;
    dropdownInput.placeholder = "Rechercher...";

    const closeButton = document.createElement("i");
    closeButton.className = "fa-solid fa-xmark";
    dropdownIconInputDiv.appendChild(closeButton);

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";
    dropdownIconInputDiv.appendChild(dropdownInput);
    dropdownIconInputDiv.appendChild(searchIcon);

    const dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown__list";

    const results = document.createElement("div");
    results.className = "dropdown__results";

    this.list.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;

      dropdownList.appendChild(listItem);

      listItem.addEventListener("click", (event) => {
        event.stopPropagation();

        // Sélectionne l'élément cliqué
        listItem.className = "dropdown__colorItem";

        const closeBtn = document.createElement("i");
        closeBtn.className = "fa-solid fa-circle-xmark";

        closeBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          listItem.classList.remove("dropdown__colorItem");
          listItem.remove();
          // Supprime l'élément de l'affichage extérieur
          selectedItem.remove();
        });

        listItem.appendChild(closeBtn);
        // listItem.value = "";
        dropdownContent.classList.add("hidden");

        const selectedItem = document.createElement("div");
        selectedItem.textContent = item;

        selectedItem.className = "dropdown__color";

        results.appendChild(selectedItem);

        const closeButton = document.createElement("i");
        closeButton.className = "fa-solid fa-xmark dropdown__btn";

        closeButton.addEventListener("click", (event) => {
          event.stopPropagation();

          selectedItem.classList.remove("dropdown__colorItem");
          listItem.remove();
          // Supprime l'élément de l'affichage extérieur
          selectedItem.remove();
        });

        selectedItem.appendChild(closeButton);
      });
    });

    closeButton.addEventListener("click", () => {
      dropdownInput.value = "";
      closeButton.style.display = "none";
    });

    dropdownContent.appendChild(dropdownIconInputDiv);
    dropdownContent.appendChild(dropdownList);

    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(dropdownContent);
    dropdown.appendChild(results);

    dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this.openIcon = !this.openIcon;
      dropdownContent.classList.toggle("hidden", !this.openIcon);
      if (this.openIcon) {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
      } else {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
      }
    });

    // écouteur d'événements de la barre de recherche
    dropdownInput.addEventListener("input", (event) => {
      const inputValue = dropdownInput.value;
      closeButton.style.display = inputValue ? "block" : "none";

      const searchValue = event.target.value; // Récupère la valeur saisie
      const dropdownList = dropdownContent.querySelector(".dropdown__list"); // Sélectionne la liste déroulante

      // éléments de la liste déroulante pour les filtrer la valeur saisie
      dropdownList.querySelectorAll("li").forEach((item) => {
        const itemName = item.textContent;
        if (itemName.includes(searchValue)) {
          item.style.display = "block"; // Affiche l'élément
        } else {
          item.style.display = "none"; // Masque l'élément
        }
      });
    });

    return dropdown;
  }
}
