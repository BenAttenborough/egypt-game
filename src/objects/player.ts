export class Player {
  spriteSize: number;
  cellSize: number;
  ctx: CanvasRenderingContext2D;
  playerImage: HTMLImageElement;
  stopMain: () => void;

  constructor(
    ctx: CanvasRenderingContext2D,
    playerImage: HTMLImageElement,
    stopMain: () => void
  ) {
    this.spriteSize = 32;
    this.cellSize = 16;
    this.ctx = ctx;
    this.playerImage = playerImage;
    this.stopMain = stopMain;
  }

  drawPlayer(direction: Direction, gridPosition: Point) {
    let offSet = 0;
    switch (direction) {
      case "UP":
        offSet = 6 * this.spriteSize;
        if (gridPosition[1] % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "RIGHT":
        offSet = 0;
        if (gridPosition[0] % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "DOWN":
        offSet = 4 * this.spriteSize;
        if (gridPosition[1] % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "LEFT":
        offSet = 2 * this.spriteSize;
        if (gridPosition[0] % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
    }

    try {
      this.ctx.drawImage(
        this.playerImage,
        offSet,
        0,
        this.spriteSize,
        this.spriteSize,
        gridPosition[0] * this.cellSize,
        gridPosition[1] * this.cellSize,
        this.spriteSize,
        this.spriteSize
      );
      //   this.ctx.drawImage(
      //     this.playerImage,
      //     offSet,
      //     0,
      //     this.spriteSize,
      //     this.spriteSize,
      //     this.gridPosition[0] * this.cellSize,
      //     this.gridPosition[1] * this.cellSize,
      //     this.spriteSize,
      //     this.spriteSize
      //   );
    } catch (error) {
      this.stopMain;
      throw new Error(`Error loading image: ${this.playerImage.currentSrc}`);
    }
  }
}
