export class DropdownOpenClose {
  constructor(category, openIcon) {
    (this.category = category), (this.openIcon = openIcon);
  }

  getDOM() {
    const dropdownOpenClose = document.createElement("button");
    dropdownOpenClose.className = "dropdown__button";

    const dropdownName = document.createElement("div");
    dropdownName.className = "dropdown__category";
    dropdownName.textContent = `${this.category}`;

    const iconElement = document.createElement("div");
    iconElement.className = "dropdown__icone";
    iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    iconElement.setAttribute("aria-hidden", "true");

    dropdownOpenClose.appendChild(dropdownName);
    dropdownOpenClose.appendChild(iconElement);

    dropdownOpenClose.addEventListener("click", (event) => {
      event.stopPropagation();

      this.openIcon = !this.openIcon;

      document
        .getElementById(this.category + "_dropdown__content")
        .classList.toggle("hidden", !this.openIcon);

      // Changer l'icône en fonction de l'état du dropdown
      if (this.openIcon) {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
      } else {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
      }
    });

    return dropdownOpenClose;
  }
}
