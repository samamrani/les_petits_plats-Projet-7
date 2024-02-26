export function DropdownItem(
  item,
  category,
  dropdownList,
  dropdownListSelected
) {
  let i = 0;
  item.forEach((item) => {
    i++;
    const listItem = document.createElement("li");
    listItem.id = category + "_" + i;
    listItem.textContent = item;

    // afficher la liste
    dropdownList.appendChild(listItem);

    // *************************************
    listItem.addEventListener("click", (event) => {
      event.stopPropagation();

      const listItemSelected = document.createElement("li");
      listItemSelected.textContent = item;
      listItemSelected.id = category + "_" + i + "selected";
      listItemSelected.className = "dropdown__colorItem";

      const selectedItem = document.createElement("div");
      selectedItem.textContent = item;

      //Supprimer listItem de la liste dropdownList
      const closeSelectedItem = document.createElement("i");
      closeSelectedItem.className = "fa-solid fa-circle-xmark";

      closeSelectedItem.addEventListener("click", (event) => {
        event.stopPropagation();

        listItem.remove();
        listItemSelected.remove();
        resultSection.remove();

        const resultItem = document.getElementById(
          listItemSelected.id.replace("selected", "")
        );
        if (resultItem) {
          resultItem.remove();
        }
      });

      listItemSelected.appendChild(closeSelectedItem);

      // *************************
      // la section "result"
      const resultSection = document.getElementById("selectedItemsSection");

      const closeListeItemSelected = document.createElement("i");
      closeListeItemSelected.className = "fa-solid fa-xmark";

      if (resultSection) {
        const resultItem = document.createElement("div");
        resultItem.textContent = item;
        resultItem.className = "dropdown__color";

        closeListeItemSelected.addEventListener("click", (event) => {
          event.stopPropagation();

          listItem.remove();
          listItemSelected.remove();

          const dropdownListItem = document.getElementById(
            listItemSelected.id.replace("selected", "")
          );
          if (dropdownListItem) {
            dropdownListItem.remove();
          }

          resultItem.remove();
        });

        resultItem.appendChild(closeListeItemSelected);
        resultSection.appendChild(resultItem);
      }

      // afficher l'element
      dropdownListSelected.appendChild(listItemSelected);

      // Ferme le dropdown après avoir sélectionné un élément
      const dropdownContent = document.getElementById(
        category + "_dropdown__content"
      );
      dropdownContent.classList.add("hidden");
    });
  });
}
