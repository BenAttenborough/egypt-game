import { Grid } from "./grid";

function createGrid(width: number, height: number, content: any): any[][] {
  let row = Array(width).fill(content);
  return Array(height).fill(row);
}

function draw() {
  const grid = new Grid(createGrid(10, 5, 0));
  console.log(grid.content);
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  console.log(canvas);
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d")!;

    // ctx.fillStyle = "rgb(200 0 0)";
    // ctx.fillRect(10, 10, 50, 50);

    // ctx.fillStyle = "rgb(0 0 200 / 50%)";
    // ctx.fillRect(30, 30, 50, 50);

    grid.content.forEach((row, rowIdx) => {
      row.forEach((cell, colIdx) => {
        ctx.strokeRect(10 * colIdx, 10 * rowIdx, 10, 10);
      });
    });
  }
}

function update(tFrame) {}

const MyGame = {
  stopMain: 0,
};

require(["domReady"], function (domReady) {
  domReady(function () {
    //This function is called once the DOM is ready.
    //It will be safe to query the DOM and manipulate
    //DOM nodes in this function.
    console.log("Dom ready");
    // draw();
    (() => {
      function main(tFrame?: number) {
        MyGame.stopMain = window.requestAnimationFrame(main);

        update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
        // draw();
      }

      main(); // Start the cycle
    })();
  });
});
