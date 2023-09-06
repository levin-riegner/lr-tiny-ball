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
    this.iconContainer.style.gap = "5px";


  }

  createPlayerIcon(client) {
    // Create a div for the player icon
    const iconDiv = document.createElement("div");
    iconDiv.style.borderRadius = "12px";
    iconDiv.style.border = "2px solid white";
    iconDiv.style.boxShadow = "2px 3px 8px 0px rgba(0,0,0,0.15)";
    iconDiv.style.backgroundColor = "white";
    iconDiv.style.display = "inline-block"; // to display in line
    iconDiv.style.textAlign = "center";
    iconDiv.style.display = "flex";
    iconDiv.style.justifyContent = "center";
    iconDiv.style.overflow = "hidden";

    const letterContainer = document.createElement("div");
    letterContainer.style.display = "flex";
    letterContainer.style.justifyContent = "center";
    letterContainer.style.width = "40px";
    letterContainer.style.height = "50px";
    letterContainer.style.backgroundColor = client.color;
    iconDiv.appendChild(letterContainer);

    const letter = document.createElement("p");
    letter.innerText = client.letter;
    letter.style.fontSize = "30px";
    letter.style.fontWeight = "bold";
    letter.style.fontFamily = "sans-serif";
    letter.style.color = "white";
    letter.style.alignSelf = "center";
    letterContainer.appendChild(letter);

    const counterContainer = document.createElement("div");
    counterContainer.style.display = "flex";
    counterContainer.style.justifyContent = "center";
    counterContainer.style.alignItems = "center";
    counterContainer.style.width = "40px";
    counterContainer.style.height = "50px";
    counterContainer.style.borderLeft = "2px solid white";
    counterContainer.style.backgroundColor = client.color;
    iconDiv.appendChild(counterContainer);

    const counter = document.createElement("p");
    counter.innerText = "0";
    counter.style.fontSize = "30px";
    counter.style.fontWeight = "bold";
    counter.style.fontFamily = "sans-serif";
    counter.style.color = "white";
    counterContainer.appendChild(counter);

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
