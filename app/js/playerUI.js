/**
 * Create UI elements for displaying players
 * @param {HTMLElement} container DOM element to append the player UI to
 */
export default class PlayerUI {
  constructor(container) {
    this.container = container;
    this.iconContainer = document.createElement("div");
    this.container.appendChild(this.iconContainer);

    this.iconContainer.style.display = "flex";
    this.iconContainer.style.position = "absolute";
    this.iconContainer.style.padding = "10px";


  }

  createPlayerIcon(client) {
    // Create a div for the player icon
    const iconDiv = document.createElement("div");
    iconDiv.style.width = "50px"; // adjust size as needed
    iconDiv.style.height = "50px";
    iconDiv.style.borderRadius = "50%";
    iconDiv.style.border = "2px solid white";
    iconDiv.style.boxShadow = "2px 3px 8px 0px rgba(0,0,0,0.15)";
    iconDiv.style.backgroundColor = client.color;
    iconDiv.style.marginRight = "10px"; // spacing between icons
    iconDiv.style.display = "inline-block"; // to display in line
    iconDiv.style.textAlign = "center";
    iconDiv.style.display = "flex";
    iconDiv.style.justifyContent = "center";
    iconDiv.style.alignItems = "center";

    const letter = document.createElement("p");
    letter.innerText = client.letter;
    letter.style.fontSize = "30px";
    letter.style.fontWeight = "bold";
    letter.style.fontFamily = "sans-serif";
    letter.style.color = "white";
    iconDiv.appendChild(letter);

    return iconDiv;
  }

  drawPlayerUI({ client, connectedClients }) {

    // Remove all children from the icon container
    while (this.iconContainer.firstChild) {
      this.iconContainer.removeChild(this.iconContainer.firstChild);
    }

    // For each connected client, draw a circle with a random cartoon headshot
    connectedClients.forEach(el => {
      const playerIcon = this.createPlayerIcon(el);
      this.iconContainer.appendChild(playerIcon);
    });
  }

}
