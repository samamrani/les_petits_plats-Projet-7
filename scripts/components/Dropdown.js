import { DropdownItems } from "./DropdownItems.js";
import { DropdownButton } from "./DropdownButton.js";
import { DropDownSearch } from "./DropdownSearch.js";

export class Dropdown {
  constructor(category, list, selectChange) {
    this.category = category;
    this.list = list;
    this.selectChange = selectChange;

    this.normalizeString = (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    };
  }

  getDOM() {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";
    dropdown.id = this.category;
    dropdown.dataset.category = this.category;

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown__content hidden";
    dropdownContent.id = this.category + "_dropdown__content";

    const dropdownItems = new DropdownItems(this.list, (li, item, selected) => {
      this.selectChange(dropdown, li, item, selected);
    }).getDOM();

    const dropdownSearch = new DropDownSearch((text) => {
      text = this.normalizeString(text)
      const items = dropdownItems.querySelectorAll("li");
      items.forEach((item) => {
        const itemName = this.normalizeString(item.textContent);
        if (itemName.includes(text)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    }).getDOM();

    dropdownContent.appendChild(dropdownSearch);
    dropdownContent.appendChild(dropdownItems);
    const dropdownButton = new DropdownButton(this.category).getDOM();

    dropdown.appendChild(dropdownButton);
    dropdown.appendChild(dropdownContent);

    return dropdown;
  }
}
