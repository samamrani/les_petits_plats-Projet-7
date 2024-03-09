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

    itemLi.addEventListener("click", (event) => {
      event.stopPropagation();

      this.dropdownList.removeChild(itemLi);

      this.createItemLiSelected(i, item);
      this.createItemSelected(i, item);
    });

    this.dropdownList.appendChild(itemLi);

    return itemLi;
  }

  createItemLiSelected(i, item) {
    const itemLiSelected = document.createElement("li");
    itemLiSelected.textContent = item;
    itemLiSelected.id = this.category + "_" + i + "_li_selected";
    itemLiSelected.className = "dropdown__colorItem";

    const itemLiSelectedClose = document.createElement("i");
    itemLiSelectedClose.className = "fa-solid fa-circle-xmark";

    itemLiSelected.appendChild(itemLiSelectedClose);

    // this.dropdownListSelected.appendChild(itemLiSelected);

    itemLiSelectedClose.addEventListener("click", (event) => {
      event.stopPropagation();

      this.deleteItemSelected(i, item);
    });

    this.dropdownList.appendChild(itemLiSelected);

    return itemLiSelected;
  }

  deleteItemSelected(i, item) {
    const itemLiSelected = document.getElementById(
      this.category + "_" + i + "_li_selected"
    );
    const itemSelected = document.getElementById(
      this.category + "_" + i + "_selected"
    );

    this.resultSection.removeChild(itemSelected);
    this.dropdownList.removeChild(itemLiSelected);

    const itemLi = document.createElement("li");
    itemLi.textContent = item;
    itemLi.id = this.category + "_" + i;

    this.dropdownList.appendChild(itemLi);
  }

  createItemSelected(i, item) {
    const itemSelected = document.createElement("div");
    itemSelected.textContent = item;
    itemSelected.id = this.category + "_" + i + "_selected";
    itemSelected.className = "dropdown__color";

    const itemSelectedClose = document.createElement("i");
    itemSelectedClose.className = "fa-solid fa-xmark";

    itemSelected.appendChild(itemSelectedClose);

    itemSelectedClose.addEventListener("click", (event) => {
      event.stopPropagation();

      this.deleteItemSelected(i, item);
    });
    this.resultSection = document.getElementById("selectedItemsResult");
    this.resultSection.appendChild(itemSelected);
  }
}
