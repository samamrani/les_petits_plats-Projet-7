export class HeaderTemplate {
  constructor() {}

  getDOM() {
    const header = document.createElement("header");
    header.className = "header";

    const imageHeader = document.createElement("img");
    imageHeader.src = "assets/image.jpg";
    imageHeader.alt = "image";
    imageHeader.className = "header__image";

    const headerLogo = document.createElement("div");
    headerLogo.className = "header__logo";

    const logo = document.createElement("img");
    logo.src = "assets/logo.png";
    logo.alt = "les petits plats";
    headerLogo.appendChild(logo);

    const headerTitre = document.createElement("div");
    headerTitre.className = "headre__titre";

    const titre = document.createElement("h1");
    titre.className = "titre";
    titre.textContent =
      "Cherchez parmi plus de 1500 recettes du quotidien, simples et délicieuses";

    headerTitre.appendChild(titre);

    header.appendChild(imageHeader);
    header.appendChild(headerLogo);
    header.appendChild(headerTitre);

    return header;
  }
}
