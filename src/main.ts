import "./style.css";
import { Grid } from "./grid";
import spriteSheet from "./sprite-sheet2.png";
import { Player } from "./objects/player";
import { Tomb } from "./objects/tomb";
import { drawFeet } from "./objects/feet";
import { initPlayfield } from "./objects/playfield";
import { handleKeyboardInput } from "./input/keyboardInput";
import { doubleArrayArray } from "./helpers/util";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Oh Mummy!</h1>
    <canvas id="game-canvas" width="670" height="352"></canvas>
  </div>
`;

let lastTick = performance.now();
const spriteSheetImg = new Image();
spriteSheetImg.src = spriteSheet;

const MyGame = initContext();
MyGame.grid.position = [16, 0];

const player = new Player(MyGame.ctx, spriteSheetImg, stopMain);

function stopMain() {
  window.cancelAnimationFrame(MyGame.stopMain);
}

function draw() {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  MyGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFeet(MyGame.grid.content, MyGame.ctx, spriteSheetImg);
  player.drawPlayer(MyGame.playerDirection, MyGame.grid.position);
  MyGame.tombs.forEach((tomb) => tomb.draw());
}

function update(tFrame = 0) {
  const delta = tFrame - lastTick;
  lastTick = tFrame;
  handleKeyboardInput(MyGame, delta);
}

function initTombs(ctx: CanvasRenderingContext2D): Tomb[] {
  let tombs = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col <= 5; col++) {
      tombs.push(new Tomb(col * 8 + 2, row * 6 + 4, ctx, spriteSheetImg));
    }
  }
  return tombs;
}

function initContext(): GameConfig {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("No canvas found!");
  }
  const ctx = canvas.getContext("2d");
  return {
    stopMain: 0,
    ctx: ctx!,
    grid: new Grid(doubleArrayArray(initPlayfield())),
    precisePosition: [16, 0],
    speed: 0.005,
    stateChanged: true,
    playerDirection: "DOWN",
    tombs: initTombs(ctx!),
    keysPressed: {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    },
  };
}

function keyboardInput() {
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (MyGame.keysPressed.hasOwnProperty(e.code))
      MyGame.keysPressed[e.code] = true;
  });

  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (MyGame.keysPressed.hasOwnProperty(e.code))
      MyGame.keysPressed[e.code] = false;
  });
}

function checkTombs() {
  MyGame.tombs.forEach((tomb) => {
    if (
      !tomb.open &&
      tomb.neighbouringCells.every((point) => MyGame.grid.get(point) > 1)
    ) {
      tomb.open = true;
    }
  });
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // document ready
    keyboardInput();

    (() => {
      function main(tFrame?: number) {
        MyGame.stopMain = window.requestAnimationFrame(main);

        update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
        if (MyGame.stateChanged) {
          checkTombs();
          draw();
        }
        MyGame.stateChanged = false;
      }

      main(); // Start the cycle
    })();
  }
};
