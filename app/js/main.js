import World from "./world.js";
import ScoreCounter from "./scoreCounter.js";
import ServerClient from "./serverClient.js";
import PlayerUI from "./playerUI.js";

const container = document.getElementById("tinyball-container");
const serverClient = new ServerClient();
const world = new World(container, {
  ballEntry: [0.1, 0.1],
});
const score = new ScoreCounter(container, world);
const playerUI = new PlayerUI(container);

serverClient.onChange = (e) => {
  playerUI.drawPlayerUI(e);
}