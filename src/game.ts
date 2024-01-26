import { Grid } from "./grid";

function createGrid(width: number, height: number, content: any): any[][] {
  let row = Array(width).fill(content);
  return Array(height).fill(row);
}

function draw() {
  console.log("draw");
  console.log(MyGame.grid.position);

  // const grid = new Grid(createGrid(10, 5, 0));
  //   console.log(grid.content);
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  //   console.log(canvas);
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    MyGame.grid.content.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        ctx.strokeRect(10 * colIdx, 10 * rowIdx, 10, 10);
      });
    });
    ctx.fillRect(
      MyGame.grid.position[0] * 10,
      MyGame.grid.position[1] * 10,
      10,
      10
    );
  }
}

function update(tFrame) {}

const MyGame = {
  stopMain: 0,
  grid: new Grid(createGrid(10, 5, 1)),
  render: draw,
  stateChanged: true,
};

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
