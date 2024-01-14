export class RecipeModel {
  constructor(data) {
    const { id, image, name, servings, ingredients } = data;

    this.id = id;
    this.picture = `assets/recettes/${image}`;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
  }
}
