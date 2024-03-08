export class DropdownButton {
  constructor(category, openIcon) {
    (this.category = category), (this.openIcon = openIcon);
  }

  getDOM() {
    const dropdownButton = document.createElement("button");
    dropdownButton.className = "dropdown__button";

    const dropdownName = document.createElement("div");
    dropdownName.className = "dropdown__category";
    dropdownName.textContent = this.category;

    const iconElement = document.createElement("div");
    iconElement.className = "dropdown__icone";
    iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    iconElement.setAttribute("aria-hidden", "true");

    dropdownButton.appendChild(dropdownName);
    dropdownButton.appendChild(iconElement);

    dropdownButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const dropdownContent = document.getElementById(
        this.category + "_dropdown__content"
      );

      dropdownContent.classList.toggle("hidden");

      // Changer l'icône en fonction de l'état du dropdown
      if (!dropdownContent.classList.contains("hidden")) {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
      } else {
        iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
      }
    });

    return dropdownButton;
  }
}
