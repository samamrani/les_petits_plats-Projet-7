export class DropdownItems {
  constructor(items, selectChange) {
    this.items = items;
    this.selectChange = selectChange;
  }

  getDOM() {
    const dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown__list";

    this.items.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "dropdown__item";
      li.textContent = item;
      // li.id = this.category + "_" + i;
      li.dataset.key = i;

      const unselectButton = document.createElement("i");
      unselectButton.className = "fa-solid fa-circle-xmark unselect-icon";

      li.appendChild(unselectButton);

      li.addEventListener("click", (event) => {
        event.preventDefault();

        li.classList.toggle("dropdown__item--selected");
        const selected = li.classList.contains("dropdown__item--selected");

        this.selectChange(li, item, selected);
      });

      dropdownList.appendChild(li);
    });

    return dropdownList;
  }
}
