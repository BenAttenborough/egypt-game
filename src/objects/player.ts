export class Player {
  spriteSize: number;
  cellSize: number;
  ctx: CanvasRenderingContext2D;
  playerImage: HTMLImageElement;
  stopMain: () => void;
  position: Point;
  precisePosition: Point;

  constructor(
    ctx: CanvasRenderingContext2D,
    playerImage: HTMLImageElement,
    stopMain: () => void,
    position: Point,
    precisePosition: Point
  ) {
    this.spriteSize = 32;
    this.cellSize = 16;
    this.ctx = ctx;
    this.playerImage = playerImage;
    this.stopMain = stopMain;
    this.position = position;
    this.precisePosition = precisePosition;
  }

  drawPlayer(direction: Direction) {
    let offSet = 0;
    switch (direction) {
      case "UP":
        offSet = 6 * this.spriteSize;
        if (this.position[1] % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "RIGHT":
        offSet = 0;
        if (this.position[0] % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "DOWN":
        offSet = 4 * this.spriteSize;
        if (this.position[1] % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "LEFT":
        offSet = 2 * this.spriteSize;
        if (this.position[0] % 2 === 0) {
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
        this.position[0] * this.cellSize,
        this.position[1] * this.cellSize,
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
