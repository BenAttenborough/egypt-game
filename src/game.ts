import { Grid } from "./grid";

function createGrid(width: number, height: number, content: any): any[][] {
  let row = Array(width).fill(content);
  return Array(height).fill(row);
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
          MyGame.ctx.fillRect(10 * colIdx, 10 * rowIdx, 10, 10);
          MyGame.ctx.strokeRect(10 * colIdx, 10 * rowIdx, 10, 10);
        } else {
          MyGame.ctx.strokeRect(10 * colIdx, 10 * rowIdx, 10, 10);
        }
      });
    });

    MyGame.ctx.fillStyle = "#008000";

    MyGame.ctx.fillRect(
      MyGame.grid.position[0] * 10,
      MyGame.grid.position[1] * 10,
      10,
      10
    );

    MyGame.ctx.strokeRect(
      MyGame.grid.position[0] * 10,
      MyGame.grid.position[1] * 10,
      10,
      10
    );
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
          MyGame.grid.move("UP");
          MyGame.stateChanged = true;
        }
        if (event.code === "ArrowRight") {
          MyGame.grid.move("RIGHT");
          MyGame.stateChanged = true;
        }
        if (event.code === "ArrowDown") {
          MyGame.grid.move("DOWN");
          MyGame.stateChanged = true;
        }
        if (event.code === "ArrowLeft") {
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
