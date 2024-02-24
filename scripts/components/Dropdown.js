export class Dropdown {
  constructor(category, list) {
    this.category = category;
    this.list = list;
    this.openIcon = false;
  }

  getDOM() {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";
    dropdown.id = this.category;

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown__content hidden";
    dropdownContent.id = this.category + "_dropdown__content";

    const dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown__list";
    dropdownList.id = this.category + "_dropdown__list";

    const dropdownListSelected = document.createElement("ul");
    dropdownListSelected.className = "dropdown__list";
    dropdownListSelected.id = this.category + "_dropdown__list_selected";

    dropdownContent.appendChild(this.GetDropDownSearch());
    dropdownContent.appendChild(dropdownListSelected);
    dropdownContent.appendChild(dropdownList);

    dropdown.appendChild(this.getDropdownOpenClose());
    dropdown.appendChild(dropdownContent);

    this.getElements(dropdownList, dropdownListSelected);

    return dropdown;
  }

  getDropdownOpenClose() {
    const dropdownOpenClose = document.createElement("button");
    dropdownOpenClose.className = "dropdown__button";

    const dropdownName = document.createElement("div");
    dropdownName.className = "dropdown__category";
    dropdownName.textContent = `${this.category}`;

    const iconElement = document.createElement("div");
    iconElement.className = "dropdown__icone";
    iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    iconElement.setAttribute("aria-hidden", "true");

    dropdownOpenClose.appendChild(dropdownName);
    dropdownOpenClose.appendChild(iconElement);

    dropdownOpenClose.addEventListener("click", (event) => {
      event.stopPropagation();
      this.openIcon = !this.openIcon;

      document
        .getElementById(this.category + "_dropdown__content")
        .classList.toggle("hidden", !this.openIcon);

      // Changer l'icône en fonction de l'état du dropdown
      if (this.openIcon) {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
      } else {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
      }
    });

    return dropdownOpenClose;
  }

  GetDropDownSearch() {
    const dropdownSearch = document.createElement("div");
    dropdownSearch.className = "dropdown__search";

    const dropdownInput = document.createElement("input");
    dropdownInput.className = "dropdown__input";
    dropdownInput.type = "text";
    dropdownInput.name = "search";
    dropdownInput.minLength = 3;
    dropdownInput.placeholder = "Rechercher...";

    const closeButton = document.createElement("i");
    closeButton.className = "fa-solid fa-xmark";
    dropdownSearch.appendChild(closeButton);

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";
    dropdownSearch.appendChild(dropdownInput);
    dropdownSearch.appendChild(searchIcon);

    dropdownInput.addEventListener("input", (event) => {
      const inputValue = dropdownInput.value;
      closeButton.style.display = inputValue ? "block" : "none";

      const searchValue = event.target.value; // Récupère la valeur saisie
      const dropdownList = dropdownContent.querySelector(".dropdown__list"); // Sélectionne la liste déroulante

      // éléments de la liste déroulante pour les listes la valeur saisie
      dropdownList.querySelectorAll("li").forEach((item) => {
        const itemName = item.textContent;
        if (itemName.includes(searchValue)) {
          item.style.display = "block"; // Affiche l'élément
        } else {
          item.style.display = "none"; // Masque l'élément
        }
      });
    });

    return dropdownSearch;
  }

  getElements(dropdownList, dropdownListSelected) {
    let i = 0;
    this.list.forEach((item) => {
      i++;
      const listItem = document.createElement("li");
      listItem.id = this.category + "_" + i;
      listItem.textContent = item;

      // afficher la liste
      dropdownList.appendChild(listItem);

      // *************************************
      listItem.addEventListener("click", (event) => {
        event.stopPropagation();

        const listItemSelected = document.createElement("li");
        listItemSelected.textContent = item;
        listItemSelected.id = this.category + "_" + i + "selected";
        listItemSelected.className = "dropdown__colorItem";

        const selectedItem = document.createElement("div");
        selectedItem.textContent = item;

        //Supprimer listItem de la liste dropdownList
        const closeSelectedItem = document.createElement("i");
        closeSelectedItem.className = "fa-solid fa-circle-xmark";

        closeSelectedItem.addEventListener("click", (event) => {
          event.stopPropagation();

          listItem.remove();
          listItemSelected.remove();

          const resultItem = document.getElementById(
            listItemSelected.id.replace("selected", "")
          );
          if (resultItem) {
            resultItem.remove();
          }
        });

        listItemSelected.appendChild(closeSelectedItem);

        // la section "result"
        const resultSection = document.getElementById("selectedItemsSection");

        const closeListeItemSelected = document.createElement("i");
        closeListeItemSelected.className = "fa-solid fa-xmark";

        if (resultSection) {
          const resultItem = document.createElement("div");
          resultItem.textContent = item;
          resultItem.className = "dropdown__color";

          closeListeItemSelected.addEventListener("click", (event) => {
            event.stopPropagation();

            listItem.remove();

            listItemSelected.remove();

            const dropdownListItem = document.getElementById(
              listItemSelected.id.replace("selected", "")
            );
            if (dropdownListItem) {
              dropdownListItem.remove();
            }

            resultItem.remove();
          });

          resultItem.appendChild(closeListeItemSelected);
          resultSection.appendChild(resultItem);
        }

        // afficher l'element
        dropdownListSelected.appendChild(listItemSelected);

        // Ferme le dropdown après avoir sélectionné un élément
        const dropdownContent = document.getElementById(
          this.category + "_dropdown__content"
        );
        dropdownContent.classList.add("hidden");
      });
    });
  }
}
