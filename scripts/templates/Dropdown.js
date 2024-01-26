export class DropdownTemplate {
  constructor() {
    this.recipes = [];
  }

  createElement(category) {
    const container = document.createElement("div");
    container.className = "dropdown";

    const icone = document.createElement("div");
    icone.className = "dropdown__icone";
    icone.innerHTML = '<i class="fa-solid fa-angle-down"></i>';

    const dropdownDiv = document.createElement("div");
    dropdownDiv.className = "dropdown__Div";
    dropdownDiv.textContent = `${category}`;

    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "dropdown__menu";
    dropdownMenu.innerHTML = "";

    const inputElement = document.createElement("input");
    inputElement.className = "dropdown__input";
    inputElement.type = "search";

    inputElement.placeholder = `Rechercher une recette, un ingrédient,  ${category}`;

    const searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";

    container.appendChild(dropdownDiv);
    container.appendChild(dropdownMenu);
    container.appendChild(icone);
    container.appendChild(inputElement);
    container.appendChild(searchIcon);

    //l'événement de clic "l'affichage ou masquage du menu déroulant"
    icone.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });
    return container;
  }

  getDOM() {
    const mainElement = document.createElement("main");

    const div1 = this.createElement("ingredients");
    div1.className = "dropdown";

    const div2 = this.createElement("appareils");
    div2.className = "dropdown";

    const div3 = this.createElement("ustensiles");
    div3.className = "dropdown";

    mainElement.appendChild(div1);
    mainElement.appendChild(div2);
    mainElement.appendChild(div3);

    const div4 = document.createElement("div");
    div4.className = "dropdown dropdown__div";
    div4.textContent = "recette";

    mainElement.appendChild(div4);

    // filtrer les recettes en fonction de la catégorie sélectionnée
    const dropdownRecipe = mainElement.querySelectorAll(".dropdown__Div");
    dropdownRecipe.forEach((dropdownRecipe) => {
      dropdownRecipe.addEventListener("click", () => {
        const category = dropdownRecipe.textContent.toLowerCase();
        this.filterRecipes(category);
      });
    });
    return mainElement;
  }

  filterRecipes(category) {
    this.recipes.forEach((recipeData) => {
      const recipeElement = document.getElementById(`recipe-${recipeData.id}`);
      const recipeCategories = ["ingredients", "appareils", "ustensiles"];

      if (recipeCategories.includes(category) && recipeElement) {
        recipeElement.style.display = "block";
      } else {
        recipeElement.style.display = "none";
      }
    });
  }
}
