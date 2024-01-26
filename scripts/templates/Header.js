export class HeaderTemplate {
  constructor(recipes, displayCallback) {
    this.inputElement = null;
    this.recipes = recipes || [];
    this.displayCallback = displayCallback;

    // this.getDOM();
  }
  // async init() {}

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

    //afficher les recettes filtrées
    const recipesFilterSection = document.createElement("div");
    recipesFilterSection.id = "filterRecipesSection";

    document.body.appendChild(recipesFilterSection);

    // this.inputElement = document.querySelector(".header__input");
    this.inputElement = inputElement;

    //gestionnaire d'événements(lorsque l'utilisateur saisie)
    this.inputElement.addEventListener("input", () => {
      const input = event.target.value;
      this.recipesFilter(input);
    });

    //gestionnaire d'événements au formulaire
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    // gestionnaire d'événements pour la touche "Enter"
    this.inputElement.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });

    return header;
  }

  recipesFilter(input) {
    console.log("Recipes:", this.recipes);
    console.log("Input Value:", input);

    // Filtre les recettes
    const recipesFilter = this.recipes.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );

    console.log("Filter Recipes:", recipesFilter);

    this.displayCallback(recipesFilter);
  }
}
