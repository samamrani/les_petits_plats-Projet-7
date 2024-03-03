import { DropdownItems } from "./DropdownItems.js";
import { DropdownOpenClose } from "./DropdownOpenClose.js";
import { DropDownSearch } from "./DropdownSearch.js";
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

    const de = new DropDownSearch(dropdownList);
    const dropdownSearchDOM = de.getDOM();

    dropdownContent.appendChild(dropdownSearchDOM);

    dropdownContent.appendChild(dropdownListSelected);

    dropdownContent.appendChild(dropdownList);

    const di = new DropdownItems(
      this.list,
      this.category,
      dropdownList,
      dropdownListSelected
    );
    di.render();

    const da = new DropdownOpenClose(this.category, this.openIcon);
    const dropdownOpenClose = da.getDOM();

    dropdown.appendChild(dropdownOpenClose);

    dropdown.appendChild(dropdownContent);

    return dropdown;
  }
}
