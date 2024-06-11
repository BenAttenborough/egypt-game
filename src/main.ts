import "./style.css";
import { Grid } from "./grid";
import spriteSheet from "./sprite-sheet2.png";
import { Player } from "./objects/player";
import { Tomb, tombTypes } from "./objects/tomb";
import { drawFeet } from "./objects/feet";
import { initPlayfield } from "./objects/playfield";
import { handleKeyboardInput } from "./input/keyboardInput";
import { doubleArrayArray } from "./helpers/util";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>MUMMY MAYHEM</h1>
    <canvas id="game-canvas" width="670" height="480"></canvas>
  </div>
`;

let lastTick = performance.now();
const spriteSheetImg = new Image();
spriteSheetImg.src = spriteSheet;

const MyGame = initContext();
// MyGame.grid.position = [16, 2];

function stopMain() {
  window.cancelAnimationFrame(MyGame.stopMain);
}

function draw() {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  MyGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFeet(MyGame.grid.content, MyGame.ctx, spriteSheetImg);
  MyGame.player.drawPlayer(MyGame.playerDirection);
  MyGame.tombs.forEach((tomb) => tomb.draw());
  MyGame.ctx.font = "16px Amstrad";
  MyGame.ctx.fillStyle = "#ff8000";
  MyGame.ctx.fillText("SCORE", 0, 18);
  // MyGame.ctx.fillStyle = "#0080ff";
  // MyGame.ctx.fillRect(100, 0, 200, 18);
  MyGame.ctx.fillStyle = "#0080ff";
  MyGame.ctx.fillText(("00000" + MyGame.score.toString()).slice(-5), 100, 18);
}

function update(tFrame = 0) {
  const delta = tFrame - lastTick;
  lastTick = tFrame;
  handleKeyboardInput(MyGame, delta);
}

function initTombs(ctx: CanvasRenderingContext2D): Tomb[] {
  let tombs = [];
  let types = tombTypes.toSorted(() => (Math.random() > 0.5 ? 1 : -1));
  let i = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      tombs.push(
        new Tomb(col * 8 + 2, row * 6 + 6, ctx, spriteSheetImg, types[i])
      );
      i++;
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
    player: new Player(ctx!, spriteSheetImg, stopMain, [16, 2], [16, 2]),
    tombs: initTombs(ctx!),
    keysPressed: {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    },
    score: 0,
  };
}

function keyboardInput() {
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.code === "ArrowRight") {
      MyGame.keysPressed.ArrowRight = true;
    }
    if (e.code === "ArrowLeft") {
      MyGame.keysPressed.ArrowLeft = true;
    }
    if (e.code === "ArrowUp") {
      MyGame.keysPressed.ArrowUp = true;
    }
    if (e.code === "ArrowDown") {
      MyGame.keysPressed.ArrowDown = true;
    }
    // if (MyGame.keysPressed.hasOwnProperty(e.code))
    //   MyGame.keysPressed[e.code] = true;
  });

  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.code === "ArrowRight") {
      MyGame.keysPressed.ArrowRight = false;
    }
    if (e.code === "ArrowLeft") {
      MyGame.keysPressed.ArrowLeft = false;
    }
    if (e.code === "ArrowUp") {
      MyGame.keysPressed.ArrowUp = false;
    }
    if (e.code === "ArrowDown") {
      MyGame.keysPressed.ArrowDown = false;
    }
    // if (MyGame.keysPressed.hasOwnProperty(e.code))
    //   MyGame.keysPressed[e.code] = false;
  });
}

function checkTombs() {
  MyGame.tombs.forEach((tomb) => {
    if (
      !tomb.open &&
      tomb.neighbouringCells.every((point) => MyGame.grid.get(point) > 1)
    ) {
      tomb.open = true;
      switch (tomb.type) {
        case "TREASURE":
          MyGame.score += 5;
          break;

        case "COFFIN":
          MyGame.score += 50;
          break;

        default:
          break;
      }
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
