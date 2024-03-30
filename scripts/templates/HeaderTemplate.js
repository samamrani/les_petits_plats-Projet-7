export class HeaderTemplate {
  constructor() {}

  getDOM() {
    const header = document.createElement("header");
    header.className = "header";

    const headerBackground = document.createElement("img");
    headerBackground.src = "assets/image.jpg";
    headerBackground.alt = "image";
    headerBackground.className = "header__background";

    const headerLogo = document.createElement("div");
    headerLogo.className = "header__logo-image";

    const logo = document.createElement("img");
    logo.src = "assets/logo.png";
    logo.alt = "les petits plats";
    logo.className = "header__logo";
    headerLogo.appendChild(logo);

    const headerContent = document.createElement("div");
    headerContent.className = "header__content";

    const headerTitle = document.createElement("h1");
    headerTitle.className = "header__title";
    headerTitle.textContent =
      "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";

    headerContent.appendChild(headerTitle);

    const form = document.createElement("form");
    form.name = "search";
    form.id = "searchForm";
    form.className = "header__search";

    headerContent.appendChild(form);

    const formDiv = document.createElement("div");
    formDiv.className = "header__form";

    form.appendChild(formDiv);

    const inputElement = document.createElement("input");
    inputElement.className = "header__input";
    inputElement.id = "searchInput";
    inputElement.type = "text";
    inputElement.name = "search";
    inputElement.placeholder = "Rechercher un ingrédient,...";

    formDiv.appendChild(inputElement);

    const resetButton = document.createElement("i");
    resetButton.className = "fa-solid fa-xmark hidden reset-icon";

    formDiv.appendChild(resetButton);

    // la fermeture de bouton de fermeture
    resetButton.addEventListener("click", (event) => {
      event.stopPropagation();

      inputElement.value = "";
      // declenchement de l'evenement 'input'
      inputElement.dispatchEvent(new Event("input"));

      resetButton.classList.add("hidden");
    });

    inputElement.addEventListener("input", (event) => {
      event.stopPropagation();
      resetButton.classList.toggle("hidden", inputElement.value == "");
    });

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    formDiv.appendChild(searchIcon);

    header.appendChild(headerBackground);
    header.appendChild(headerLogo);
    header.appendChild(headerContent);

    return header;
  }
}
