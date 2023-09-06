import World from "./world.js";
import ScoreCounter from "./scoreCounter.js";
import ServerClient from "./serverClient.js";
import PlayerUI from "./playerUI.js";

const wrapper = document.getElementById("wrapper");
const uiContainer = document.getElementById("ui-container");

const serverClient = new ServerClient();
const world = new World(wrapper, {
  ballEntry: [0.1, 0.1],
});
const score = new ScoreCounter(wrapper, world);
const playerUI = new PlayerUI(uiContainer);

serverClient.onChange = (e) => {
  playerUI.drawPlayerUI(e);
}

// Scale container to fit canvas height
// This is important since the scale of the canvas is transformed which won't trigger a re-flow
const resizeWrapper = () => {
  // Match wrapper height to width if width is smaller than height
  // Otherwise set height to 100%
  if (wrapper.clientWidth < wrapper.clientHeight) {
    wrapper.style.height = `${wrapper.clientWidth}px`;
  } else {
    wrapper.style.height = "100%"
  }
}
resizeWrapper();
window.addEventListener("resize", resizeWrapper);
