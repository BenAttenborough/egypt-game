import { Engine } from "./engine/engine";
import { Game } from "./game/game.ts";

console.log("Main");

window.addEventListener("DOMContentLoaded", () => { new Engine(Game); });