import "./style.css";
import { Grid } from "./grid";
import playerImgUrl from "./player-sheet.png";
import tomb1ImgUrl from "./tomb-1.png";
import bigFootRightImgUrl from "./bigfoot-right.png";
import bigFootLeftImgUrl from "./bigfoot-left.png";
import bigFootUpImgUrl from "./bigfoot-up.png";
import bigFootDownImgUrl from "./bigfoot-down.png";
import { Player } from "./objects/player";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Oh Mummy!x</h1>
    <canvas id="game-canvas" width="670" height="352"></canvas>
  </div>
`;

type Point = [number, number];

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

const playerImg = getImage(playerImgUrl);
const tomb1 = getImage(tomb1ImgUrl);
const footR = getImage(bigFootRightImgUrl);
const footL = getImage(bigFootLeftImgUrl);
const footU = getImage(bigFootUpImgUrl);
const footD = getImage(bigFootDownImgUrl);

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

const MyGame = initContext();
MyGame.grid.position = [16, 0];

const player = new Player(MyGame.ctx, playerImg, stopMain);

function getImage(
  url: string,
  width?: number,
  height?: number
): HTMLImageElement {
  let image = new Image(width, height);
  image.src = url;
  return image;
}

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

type Quadrant = "TL" | "TR" | "BL" | "BR";

function stopMain() {
  window.cancelAnimationFrame(MyGame.stopMain);
}

function drawQuarterImage(
  image: HTMLImageElement,
  quadrant: Quadrant,
  position: Point,
  quadSize: number
) {
  let offSetX = 0;
  let offSetY = 0;
  switch (quadrant) {
    case "TL":
      offSetX = 0;
      offSetY = 0;
      break;
    case "TR":
      offSetX = quadSize;
      offSetY = 0;
      break;
    case "BL":
      offSetX = 0;
      offSetY = quadSize;
      break;
    case "BR":
      offSetX = quadSize;
      offSetY = quadSize;
      break;
  }

  MyGame.ctx.drawImage(
    image,
    offSetX,
    offSetY,
    quadSize,
    quadSize,
    cellSize * position[1],
    cellSize * position[0],
    quadSize,
    quadSize
  );
}

function draw() {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  MyGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  MyGame.grid.content.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      if (cell === 1) {
        MyGame.ctx.fillStyle = "#000000";
        MyGame.ctx.fillRect(
          cellSize * colIdx,
          cellSize * rowIdx,
          cellSize,
          cellSize
        );
      }
      if (cell === 2) {
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footR, "TL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footR, "TR", [rowIdx, colIdx], cellSize);
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footR, "BL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footR, "BR", [rowIdx, colIdx], cellSize);
          }
        }
      }
      if (cell === 3) {
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footL, "TL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footL, "TR", [rowIdx, colIdx], cellSize);
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footL, "BL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footL, "BR", [rowIdx, colIdx], cellSize);
          }
        }
      }
      if (cell === 4) {
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footU, "TL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footU, "TR", [rowIdx, colIdx], cellSize);
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footU, "BL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footU, "BR", [rowIdx, colIdx], cellSize);
          }
        }
      }
      if (cell === 5) {
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footD, "TL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footD, "TR", [rowIdx, colIdx], cellSize);
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(footD, "BL", [rowIdx, colIdx], cellSize);
          } else {
            drawQuarterImage(footD, "BR", [rowIdx, colIdx], cellSize);
          }
        }
      }
    });
  });
  player.drawPlayer(MyGame.playerDirection, MyGame.grid.position);
  MyGame.tombs.forEach((tomb) => tomb.draw());
}

function update(tFrame?: number) {
  tFrame;
}

function initPlayfield() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      tombs.push(new Tomb(col * 8 + 2, row * 6 + 4));
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

function setBlockFromOrigin(origin: Point, val: any) {
  MyGame.grid.set([...origin], val);
  MyGame.grid.set([origin[0] + 1, origin[1]], val);
  MyGame.grid.set([origin[0], origin[1] + 1], val);
  MyGame.grid.set([origin[0] + 1, origin[1] + 1], val);
}

function keyboardInput() {
  window.addEventListener(
    "keydown",
    (event) => {
      // console.log("location", MyGame.grid.position);
      if (event.code === "Enter") {
        console.log("Enter");
        console.log(MyGame.stopMain);
        window.cancelAnimationFrame(MyGame.stopMain);
      }
      if (event.code === "ArrowUp") {
        MyGame.playerDirection = "UP";
        MyGame.grid.move4Block("UP");
        setBlockFromOrigin(MyGame.grid.position, 4);
        MyGame.stateChanged = true;
      }
      if (event.code === "ArrowRight") {
        MyGame.playerDirection = "RIGHT";
        MyGame.grid.move4Block("RIGHT");
        setBlockFromOrigin(MyGame.grid.position, 2);
        MyGame.stateChanged = true;
      }
      if (event.code === "ArrowDown") {
        MyGame.playerDirection = "DOWN";
        MyGame.grid.move4Block("DOWN");
        setBlockFromOrigin(MyGame.grid.position, 5);
        MyGame.stateChanged = true;
      }
      if (event.code === "ArrowLeft") {
        MyGame.playerDirection = "LEFT";
        MyGame.grid.move4Block("LEFT");
        setBlockFromOrigin(MyGame.grid.position, 3);
        MyGame.stateChanged = true;
      }
    },
    true
  );
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
          draw();
        }
        MyGame.stateChanged = false;
      }

      main(); // Start the cycle
    })();
  }
};
