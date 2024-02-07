export class HeaderTemplate {
  constructor() {
    this.inputElement = null;
  }

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
      "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES";

    headerContent.appendChild(headerTitle);

    const form = document.createElement("form");
    form.name = "search";
    form.className = "header__search";
    // form.action = "";

    headerContent.appendChild(form);

    const formDiv = document.createElement("div");
    formDiv.className = "header__form";

    form.appendChild(formDiv);

    const inputElement = document.createElement("input");
    inputElement.className = "header__input";
    inputElement.type = "text";
    inputElement.name = "search";
    inputElement.minLength = 2;
    inputElement.placeholder = "Rechercher un ingrédient,...";

    formDiv.appendChild(inputElement);

    const closeButton = document.createElement("i");
    closeButton.className = "fa-solid fa-xmark";

    formDiv.appendChild(closeButton);

    // la visibilité du bouton de fermeture lors de la saisie
    inputElement.addEventListener("input", () => {
      const inputValue = inputElement.value;
      closeButton.style.display = inputValue ? "block" : "none";
    });

    // la fermeture de bouton de fermeture
    closeButton.addEventListener("click", () => {
      inputElement.value = "";
      closeButton.style.display = "none";
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
