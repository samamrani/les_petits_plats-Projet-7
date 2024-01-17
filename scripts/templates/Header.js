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
    headerLogo.className = "header__logo";

    const logo = document.createElement("img");
    logo.src = "assets/logo.png";
    logo.alt = "les petits plats";
    headerLogo.appendChild(logo);

    const headerContent = document.createElement("div");
    headerContent.className = "header__content";

    const headerTitle = document.createElement("h1");
    headerTitle.className = "header__title";
    headerTitle.textContent =
      "Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses";

    headerContent.appendChild(headerTitle);

    const form = document.createElement("form");
    form.action = "";

    headerContent.appendChild(form);

    const formDiv = document.createElement("div");
    formDiv.className = "header__form";

    form.appendChild(formDiv);

    const inputElement = document.createElement("input");
    inputElement.className = "header__input";
    inputElement.type = "search";
    inputElement.placeholder =
      "Rechercher un ingrédient, appareil, ustensile ou une recette";

    formDiv.appendChild(inputElement);

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    formDiv.appendChild(searchIcon);

    header.appendChild(headerBackground);
    header.appendChild(headerLogo);
    header.appendChild(headerContent);

    return header;
  }
}
