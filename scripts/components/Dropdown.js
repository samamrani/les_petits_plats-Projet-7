export class Dropdown {
  constructor(category, list) {
    this.category = category;
    this.list = list;
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

    // dropdownIconDiv.appendChild(iconElement);

    dropdownButton.appendChild(dropdownCategory);
    dropdownButton.appendChild(iconElement);

    // *****
    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown__content hidden";

    const dropdownIconInputDiv = document.createElement("div");
    dropdownIconInputDiv.className = "dropdown__search";

    // Création de l'élément input.dropdown__input
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

    // Création de l'élément i pour l'icône de recherche
    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    dropdownIconInputDiv.appendChild(dropdownInput);
    dropdownIconInputDiv.appendChild(searchIcon);

    const dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown__list";
    dropdownList.id = "dropdownId";

    // la liste déroulante
    this.list.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;

      dropdownList.appendChild(listItem);
    });

    dropdownContent.appendChild(dropdownIconInputDiv);
    dropdownContent.appendChild(dropdownList);

    dropdown.appendChild(dropdownButton);

    dropdown.appendChild(dropdownContent);

    document.body.appendChild(dropdown);

    // L'événement de clic "l'affichage ou masquage du menu déroulant"
    dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation();

      dropdownContent.classList.toggle("hidden");
    });
    // Ajout événement d'entrée pour barre de recherche
    dropdownInput.addEventListener("input", (event) => {
      event.stopPropagation();
      const searchTerm = dropdownInput.value;
      const listItems = dropdownList.getElementsByTagName("li");

      for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const text = listItem.textContent;
        listItem.style.display = text.includes(searchTerm) ? "block" : "none";
      }

      // Afficher la liste uniquement si la barre de recherche n'est pas vide
      dropdownList.classList.toggle("show", searchTerm !== "");
      // Afficher l'icône de recherche même si la barre de recherche est vide
      // dropdownIconInputDiv.classList.toggle("hidden");
      dropdownIconInputDiv.style.display = "block";
    });

    return dropdown;
  }
}

// UR THeligh yenou ma3na ougadargh a kressragh,
//  ur theligh yedi ugadagh a tsba3dadh feli,
// ur nehader elwahid ma3na tharouchteik dima dakheliw,
// ur raqegh felak ma3na therouss elhaja degui,
//  ur kezarara atass dachou amaken snak a-halaya,
// ur senwigh aka , theligh gouliw,
// ur thefigadh del moukhiw, ahalet ekhmalerarr, ma3na achourarr ougadarh akroucharg
