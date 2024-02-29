import { DropDownSearch } from "./DropdownSearch.js";
import { DropdownItems } from "./DropdownItems.js";
import { DropdownOpenClose } from "./DropdownOpenClose.js";

export class Dropdown {
  constructor(category, list) {
    this.category = category;
    this.list = list;
    this.openIcon = false;
  }

  getDOM() {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";
    dropdown.id = this.category;

    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown__content hidden";
    dropdownContent.id = this.category + "_dropdown__content";

    const dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown__list";
    dropdownList.id = this.category + "_dropdown__list";

    const dropdownListSelected = document.createElement("ul");
    dropdownListSelected.className = "dropdown__list";
    dropdownListSelected.id = this.category + "_dropdown__list_selected";

    dropdownContent.appendChild(this.DropDownSearch(dropdownContent));
    dropdownContent.appendChild(dropdownListSelected);
    dropdownContent.appendChild(dropdownList);

    const di = new DropdownItems(
      this.list,
      this.category,
      dropdownList,
      dropdownListSelected
    );
    di.render();

    dropdown.appendChild(DropdownOpenClose(this.category, this.openIcon));
    dropdown.appendChild(dropdownContent);

    return dropdown;
  }

  DropDownSearch(dropdownList) {
    return DropDownSearch(dropdownList);
  }
}
