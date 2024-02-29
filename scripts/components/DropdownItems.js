export class DropdownItems {
  constructor(items, category, dropdownList, dropdownListSelected) {
    this.items = items;
    this.category = category;
    this.dropdownList = dropdownList;
    this.dropdownListSelected = dropdownListSelected;
    this.resultSection = document.getElementById("selectedItemsResult");
  }

  render() {
    let i = 0;
    this.items.forEach((item) => {
      i++;
      this.createItemLi(i, item);
    });
  }

  createItemLi(i, item) {
    const itemLi = document.createElement("li");
    itemLi.textContent = item;
    itemLi.id = this.category + "_" + i;

    this.addEventClickOnItemLi(i, item, itemLi);

    this.dropdownList.appendChild(itemLi);

    return itemLi;
  }

  addEventClickOnItemLi(i, item, itemLi) {
    itemLi.addEventListener("click", (event) => {
      event.stopPropagation();

      this.dropdownList.removeChild(itemLi);

      this.createItemLiSelected(i, item);
      this.createItemSelected(i, item);
    });
  }

  createItemLiSelected(i, item) {
    const itemLiSelected = document.createElement("li");
    itemLiSelected.textContent = item;
    itemLiSelected.id = this.category + "_" + i + "_li_selected";
    itemLiSelected.className = "dropdown__colorItem";

    const itemLiSelectedClose = document.createElement("i");
    itemLiSelectedClose.className = "fa-solid fa-xmark";

    itemLiSelected.appendChild(itemLiSelectedClose);

    this.dropdownListSelected.appendChild(itemLiSelected);

    itemLiSelectedClose.addEventListener("click", (event) => {
      event.stopPropagation();

      this.deleteItemSelected(i, item);
    });

    return itemLiSelected;
  }

  resetItemClickEvent(itemLi, i, item) {
    itemLi.addEventListener("click", (event) => {
      event.stopPropagation();

      this.dropdownList.removeChild(itemLi);

      this.createItemLiSelected(i, item);
      this.createItemSelected(i, item);
    });
  }

  deleteItemSelected(i, item) {
    const itemLiSelected = document.getElementById(
      this.category + "_" + i + "_li_selected"
    );
    const itemSelected = document.getElementById(
      this.category + "_" + i + "_selected"
    );

    this.resultSection.removeChild(itemSelected);
    this.dropdownListSelected.removeChild(itemLiSelected);

    const itemLi = document.createElement("li");
    itemLi.textContent = item;
    itemLi.id = this.category + "_" + i;

    this.dropdownList.appendChild(itemLi);

    this.resetItemClickEvent(itemLi, i, item);
  }

  createItemSelected(i, item) {
    const itemSelected = document.createElement("div");
    itemSelected.textContent = item;
    itemSelected.id = this.category + "_" + i + "_selected";
    itemSelected.className = "dropdown__color";

    const itemSelectedClose = document.createElement("i");
    itemSelectedClose.className = "fa-solid fa-circle-xmark";

    itemSelected.appendChild(itemSelectedClose);

    itemSelectedClose.addEventListener("click", (event) => {
      event.stopPropagation();

      this.deleteItemSelected(i, item);
    });
    this.resultSection = document.getElementById("selectedItemsResult");
    this.resultSection.appendChild(itemSelected);
  }
}
