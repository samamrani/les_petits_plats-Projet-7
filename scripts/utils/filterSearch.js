export class FilterSearch {
  constructor() {}

  getDOM() {
    const filter = document.querySelectorAll(".dropdown__list");
    const cards = document.querySelectorAll(".dropdown__colorItem");
    const search = document.getElementById("selectedItemsResult").value;
  }
}
