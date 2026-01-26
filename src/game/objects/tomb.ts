type Config = {
  x: number;
  y: number;
  spriteSheet: HTMLImageElement;
  type: TombType;
};

export class Tomb {
  x: number;
  y: number;
  cellSize: number = 16;
  spriteSheet: HTMLImageElement;
  open = false;
  neighbouringCells: Point[] = this.getNeighbouringCells();
  type: TombType;

  constructor(config: Config) {
    this.x = config.x;
    this.y = config.y;
    this.spriteSheet = config.spriteSheet;
    this.type = config.type;
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

  // printCellValues(grid) {
  //   grid.forEach((row) => {
  //     row.forEach((col) => {
  //       console.log(col);
  //     });
  //   });
  // }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.open) {
      ctx.drawImage(
        this.spriteSheet,
        0,
        64,
        96,
        64,
        this.x * this.cellSize,
        this.y * this.cellSize,
        96,
        64
      );
    } else {
      let offSetX: number;
      let offSetY: number;
      switch (this.type) {
        case "EMPTY":
          offSetX = 96;
          offSetY = 64;
          break;
        case "KEY":
          offSetX = 0;
          offSetY = 128;
          break;
        case "SCROLL":
          offSetX = 96;
          offSetY = 192;
          break;
        case "COFFIN":
          offSetX = 0;
          offSetY = 192;
          break;
        case "TREASURE":
          offSetX = 96;
          offSetY = 128;
          break;
        case "MUMMY":
          offSetX = 0;
          offSetY = 64;
          break;
      }
      ctx.drawImage(
        this.spriteSheet,
        offSetX,
        offSetY,
        96,
        64,
        this.x * this.cellSize,
        this.y * this.cellSize,
        96,
        64
      );
    }
  }
}
