export class RecetteTemplate {
  constructor(recetteModel) {
    this.recette = recetteModel;
  }
  getDOM() {
    const recette = document.createElement("div");
    recette.classList = "recette";

    const section = document.createElement("div");
    section.classList = "recette__section";

    const temps = document.createElement("div");
    temps.classList = "recette__temps";
    temps.textContent = "10min";

    const card = document.createElement("div");
    card.classList = "recette__card";

    const image = document.createElement("img");
    image.src = "assets/image.jpg";
    image.alt = "image";

    const titleH3 = document.createElement("h3");
    titleH3.className = "h3";
    titleH3.textContent = "Limonade de Coco";

    const recipeTitleH4 = document.createElement("h4");
    recipeTitleH4.className = "h4";
    recipeTitleH4.textContent = "RECETTE";

    const descriptionP = document.createElement("p");
    descriptionP.className = "p";
    descriptionP.textContent =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit";

    // ***********
    const ingredients = document.createElement("div");
    ingredients.classList = "recette__ingredient";

    const ingredientsData = [
      { name: "lait de coco", quantity: "400ml" },
      { name: "Jus de citron", quantity: "400ml" },
      { name: "Crème de coco", quantity: "4 cuillères" },
      { name: "Sucre", quantity: "20g" },
      { name: "Glaçons", quantity: "2" },
    ];

    ingredientsData.forEach((ingredientData) => {
      const ingredientDiv = document.createElement("div");
      ingredientDiv.classList = "recette__div";

      const ingredientH4 = document.createElement("h4");
      ingredientH4.className = "h4";
      ingredientH4.textContent = ingredientData.name;

      const quantitySpan = document.createElement("span");
      quantitySpan.className = "span";
      quantitySpan.textContent = ingredientData.quantity;

      ingredientDiv.appendChild(ingredientH4);
      ingredientDiv.appendChild(quantitySpan);

      ingredients.appendChild(ingredientDiv);
    });

    // ****************

    card.appendChild(image);
    card.appendChild(titleH3);
    card.appendChild(recipeTitleH4);
    card.appendChild(descriptionP);
    card.appendChild(ingredients);

    section.appendChild(temps);
    section.appendChild(card);

    recette.appendChild(section);

    return recette;
  }
}
