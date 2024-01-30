import "./style.css";
import { Grid } from "./grid";
import playerImgUrl from "./player-sheet.png";
import tomb1ImgUrl from "./tomb-1.png";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <canvas id="game-canvas" width="670" height="320"></canvas>
  </div>
`;

type GameConfig = {
  stopMain: number;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  render: () => void;
  stateChanged: boolean;
  playerDirection: Direction;
  tombs: Tomb[];
};

type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

const cellSize = 16;
const spriteSize = 32;

let player = new Image();
player.src = playerImgUrl;

let tomb1 = new Image();
tomb1.src = tomb1ImgUrl;

function doubleArray(arr: number[]): number[] {
  return arr.reduce((prev: number[], cur) => {
    return prev.concat([cur, cur]);
  }, []);
}

function doubleArrayArray(arr: number[][]): number[][] {
  return arr.reduce((prev: number[][], cur) => {
    return prev.concat([doubleArray(cur), doubleArray(cur)]);
  }, []);
}

function drawPlayer(direction: Direction) {
  let offSet = 0;
  switch (direction) {
    case "UP":
      offSet = 6 * spriteSize;
      if (MyGame.grid.position[1] % 2 === 0) {
        offSet += spriteSize;
      }
      break;
    case "RIGHT":
      offSet = 0;
      if (MyGame.grid.position[0] % 2 === 0) {
        offSet += spriteSize;
      }
      break;
    case "DOWN":
      offSet = 4 * spriteSize;
      if (MyGame.grid.position[1] % 2 === 0) {
        offSet += spriteSize;
      }
      break;
    case "LEFT":
      offSet = 2 * spriteSize;
      if (MyGame.grid.position[0] % 2 === 0) {
        offSet += spriteSize;
      }
      break;
  }

  try {
    MyGame.ctx.drawImage(
      player,
      offSet,
      0,
      spriteSize,
      spriteSize,
      MyGame.grid.position[0] * cellSize,
      MyGame.grid.position[1] * cellSize,
      spriteSize,
      spriteSize
    );
  } catch (error) {
    window.cancelAnimationFrame(MyGame.stopMain);
    throw new Error(`Error loading image: ${player.currentSrc}`);
  }
}

class Tomb {
  x;
  y;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col <= 5; col++) {
        MyGame.ctx.drawImage(
          tomb1,
          this.x * cellSize + col * cellSize,
          this.y * cellSize + row * cellSize
        );
      }
    }
  }
}

function draw() {
  // console.log("draw");
  // console.log(MyGame.grid.position);
  //   console.log(grid.content);
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  //   console.log(canvas);
  MyGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  MyGame.grid.content.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === 0) {
        MyGame.ctx.fillStyle = "#EE0000";
        MyGame.ctx.fillRect(
          cellSize * colIdx,
          cellSize * rowIdx,
          cellSize,
          cellSize
        );
        MyGame.ctx.strokeRect(
          cellSize * colIdx,
          cellSize * rowIdx,
          cellSize,
          cellSize
        );
      } else {
        MyGame.ctx.fillStyle = "#000000";
        MyGame.ctx.fillRect(
          cellSize * colIdx,
          cellSize * rowIdx,
          cellSize,
          cellSize
        );
      }
    });
  });
  drawPlayer(MyGame.playerDirection);
  MyGame.tombs.forEach((tomb) => tomb.draw());
}

function update(tFrame?: number) {
  tFrame;
}

function initPlayfield() {
  return [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
}

function initTombs(): Tomb[] {
  let tombs = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col <= 5; col++) {
      tombs.push(new Tomb(col * 8 + 2, row * 6 + 2));
    }
  }
  return tombs;
}

function initContext(): GameConfig {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("No canvas found!");
  }
  return {
    stopMain: 0,
    ctx: canvas.getContext("2d")!,
    grid: new Grid(doubleArrayArray(initPlayfield())),
    render: draw,
    stateChanged: true,
    playerDirection: "DOWN",
    tombs: initTombs(),
  };
}

const MyGame = initContext();

function keyboardInput() {
  window.addEventListener(
    "keydown",
    (event) => {
      if (event.code === "Enter") {
        console.log("Enter");
        console.log(MyGame.stopMain);
        window.cancelAnimationFrame(MyGame.stopMain);
      }
      if (event.code === "ArrowUp") {
        MyGame.playerDirection = "UP";
        MyGame.grid.move4Block("UP");
        MyGame.stateChanged = true;
      }
      if (event.code === "ArrowRight") {
        MyGame.playerDirection = "RIGHT";

        MyGame.grid.move4Block("RIGHT");
        MyGame.stateChanged = true;
      }
      if (event.code === "ArrowDown") {
        MyGame.playerDirection = "DOWN";
        MyGame.grid.move4Block("DOWN");
        MyGame.stateChanged = true;
      }
      if (event.code === "ArrowLeft") {
        MyGame.playerDirection = "LEFT";
        MyGame.grid.move4Block("LEFT");
        MyGame.stateChanged = true;
      }
    },
    true
  );
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // document ready
    console.log("Readyx");
    keyboardInput();

    (() => {
      function main(tFrame?: number) {
        MyGame.stopMain = window.requestAnimationFrame(main);

        update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
        if (MyGame.stateChanged) {
          draw();
        }
        MyGame.stateChanged = false;
      }

      main(); // Start the cycle
    })();
  }
};
