export class Tomb {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  playerImage: HTMLImageElement;
  open = false;
  neighbouringCells: number[][];

  constructor(
    x: number,
    y: number,
    ctx: CanvasRenderingContext2D,
    playerImage: HTMLImageElement
  ) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.cellSize = 16;
    this.playerImage = playerImage;
    this.neighbouringCells = this.getNeighbouringCells();
  }

  getNeighbouringCells(): number[][] {
    let container: number[][] = [];
    for (let row = -1; row < 5; row++) {
      for (let col = -1; col <= 6; col++) {
        container.push([row, col]);
      }
    }
    return container;
  }

  printCellValues(grid) {
    grid.forEach((row) => {
      row.forEach((col) => {
        console.log(col);
      });
    });
  }

  draw() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col <= 5; col++) {
        this.ctx.drawImage(
          this.playerImage,
          0,
          64,
          16,
          16,
          this.x * this.cellSize + col * this.cellSize,
          this.y * this.cellSize + row * this.cellSize,
          16,
          16
        );
      }
    }
  }
}
