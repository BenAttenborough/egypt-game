import { Grid } from "./grid";

type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

const cellSize = 32;
const spriteSize = 32;

let player = new Image();
player.src = "res/player-sheet.png";

function createGrid(width: number, height: number, content: any): any[][] {
  let row = Array(width).fill(content);
  return Array(height).fill(row);
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

  MyGame.ctx.drawImage(
    player,
    offSet,
    0,
    spriteSize,
    spriteSize,
    MyGame.grid.position[0] * cellSize,
    MyGame.grid.position[1] * cellSize,
    cellSize,
    cellSize
  );
}

function draw() {
  // console.log("draw");
  // console.log(MyGame.grid.position);
  //   console.log(grid.content);
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  //   console.log(canvas);
  if (canvas.getContext) {
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

    // MyGame.ctx.fillStyle = "#008000";

    drawPlayer(MyGame.playerDirection);

    // MyGame.ctx.fillRect(
    //   MyGame.grid.position[0] * cellSize,
    //   MyGame.grid.position[1] * cellSize,
    //   cellSize,
    //   cellSize
    // );

    // MyGame.ctx.strokeRect(
    //   MyGame.grid.position[0] * cellSize,
    //   MyGame.grid.position[1] * cellSize,
    //   cellSize,
    //   cellSize
    // );
  }
}

function update(tFrame) {}

function initPlayfield() {
  return [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
}

function initContext() {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("No canvas found!");
  }
  return {
    stopMain: 0,
    ctx: canvas.getContext("2d")!,
    grid: new Grid(initPlayfield()),
    render: draw,
    stateChanged: true,
    playerDirection: "DOWN",
  };
}

const MyGame = initContext();

require(["domReady"], function (domReady) {
  domReady(function () {
    //This function is called once the DOM is ready.
    //It will be safe to query the DOM and manipulate
    //DOM nodes in this function.
    console.log("Dom ready");

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
          MyGame.grid.move("UP");
          MyGame.stateChanged = true;
        }
        if (event.code === "ArrowRight") {
          MyGame.playerDirection = "RIGHT";

          MyGame.grid.move("RIGHT");
          MyGame.stateChanged = true;
        }
        if (event.code === "ArrowDown") {
          MyGame.playerDirection = "DOWN";
          MyGame.grid.move("DOWN");
          MyGame.stateChanged = true;
        }
        if (event.code === "ArrowLeft") {
          MyGame.playerDirection = "LEFT";
          MyGame.grid.move("LEFT");
          MyGame.stateChanged = true;
        }
      },
      true
    );

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
  });
});
