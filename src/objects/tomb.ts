export class Tomb {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  playerImage: HTMLImageElement;
  open = false;
  neighbouringCells: Point[];

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

  getNeighbouringCells(): Point[] {
    let container: Point[] = [];
    // Do top and bottom rows
    let row = -1;
    for (let col = -1; col <= 6; col++) {
      container.push([col + this.x, row + this.y]);
    }
    row = 5;
    for (let col = -1; col <= 6; col++) {
      container.push([col + this.x, row + this.y]);
    }
    // Do sides
    for (let row = 0; row < 4; row++) {
      container.push([this.x - 1, this.y + row]);
      container.push([this.x + 6, this.y + row]);
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
    let offset = this.open ? 32 : 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col <= 5; col++) {
        this.ctx.drawImage(
          this.playerImage,
          128 + offset,
          32,
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
