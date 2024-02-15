export class Dropdown {
  constructor(category, list, messageFond) {
    this.category = category;
    this.list = list;

    this.openIcon = false;
    this.messageFond = messageFond;
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

    // *****
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

    // la visibilité du bouton de fermeture lors de la saisie
    dropdownInput.addEventListener("input", () => {
      const inputValue = dropdownInput.value;
      closeButton.style.display = inputValue ? "block" : "none";
    });

    // la fermeture de bouton de fermeture
    closeButton.addEventListener("click", () => {
      dropdownInput.value = "";
      closeButton.style.display = "none";
    });

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    dropdownIconInputDiv.appendChild(dropdownInput);
    dropdownIconInputDiv.appendChild(searchIcon);

    const dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown__list";

    // la liste déroulante
    this.list.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;

      dropdownList.appendChild(listItem);

      // événement de clic à chaque élément de la liste
      listItem.addEventListener("click", (event) => {
        event.stopPropagation();

        // Affichez resultat
        // results.innerHTML = `<div id="btn-id" class="dropdown__color">${item}<button class="fa-solid fa-xmark dropdown__btn"></button></div>`;

        const divElement = document.createElement("div");
        divElement.id = "btn-id";
        divElement.className = "dropdown__color";

        divElement.innerHTML = item;

        const buttonElement = document.createElement("i");
        buttonElement.className = "fa-solid fa-xmark dropdown__btn";

        divElement.appendChild(buttonElement);

        results.appendChild(divElement);

        const closeButton = document.getElementById("btn-id");
        closeButton.addEventListener("click", (event) => {
          event.stopPropagation();
          results.style.display = "none";
        });

        // Affichez l'élément sélectionné
        dropdownInput.value = item;

        results.style.display = "block";
        // Masquez la liste déroulante
        dropdownContent.classList.add("hidden");
      });
    });

    dropdownContent.appendChild(dropdownIconInputDiv);
    dropdownContent.appendChild(dropdownList);

    dropdown.appendChild(dropdownButton);

    dropdown.appendChild(dropdownContent);

    document.body.appendChild(dropdown);

    // l'affichage ou masquage du menu déroulant
    dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation();

      this.openIcon = !this.openIcon;
      dropdownContent.classList.toggle("hidden", !this.openIcon);

      if (this.openIcon) {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-up"></i>'; // Changer l'icône lorsque la liste est ouverte
      } else {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>'; // Changer l'icône lorsque la liste est fermée
      }
    });

    // Message d'erreur
    const errorMessage = document.createElement("div");
    errorMessage.className = "dropdown__message";
    errorMessage.textContent = "Aucun résultat trouvé";
    dropdownContent.appendChild(errorMessage);

    const results = document.createElement("div");
    results.className = "dropdown__results";
    dropdown.appendChild(results);

    //  événement d'entrée pour barre de recherche
    dropdownInput.addEventListener("input", (event) => {
      event.stopPropagation();
      const searchTerm = dropdownInput.value;
      const listItems = dropdownList.getElementsByTagName("li");

      this.messageFond = false;
      // Réinitialiser les résultats filtrés à chaque saisie
      results.innerHTML = "";
      // results.style.display = dropdown ? "block" : "none";

      for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const text = listItem.textContent;
        const message = text.includes(searchTerm);
        listItem.style.display = message ? "block" : "none";
        if (message) {
          this.messageFond = true;

          // les éléments filtrés
          const filteredItem = document.createElement("div");
          filteredItem.textContent = text;
          // results.appendChild(filteredItem);
        }
      }

      // Afficher le message d'erreur
      errorMessage.style.display =
        searchTerm !== "" && !this.messageFond ? "block" : "none";
      // Afficher la liste uniquement si la barre de recherche n'est pas vide
      dropdownList.classList.toggle("hidden", searchTerm === "");

      // Afficher l'icône de recherche même si la barre de recherche est vide
      dropdownIconInputDiv.style.display = "block";
    });

    return dropdown;
  }
}
