export function DropdownOpenClose(category, openIcon) {
  const dropdownOpenClose = document.createElement("button");
  dropdownOpenClose.className = "dropdown__button";

  const dropdownName = document.createElement("div");
  dropdownName.className = "dropdown__category";
  dropdownName.textContent = `${category}`;

  const iconElement = document.createElement("div");
  iconElement.className = "dropdown__icone";
  iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
  iconElement.setAttribute("aria-hidden", "true");

  dropdownOpenClose.appendChild(dropdownName);
  dropdownOpenClose.appendChild(iconElement);

  dropdownOpenClose.addEventListener("click", (event) => {
    event.stopPropagation();

    openIcon = !openIcon;

    document
      .getElementById(category + "_dropdown__content")
      .classList.toggle("hidden", !openIcon);

    // Changer l'icône en fonction de l'état du dropdown
    if (openIcon) {
      iconElement.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
    } else {
      iconElement.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    }
  });

  return dropdownOpenClose;
}
