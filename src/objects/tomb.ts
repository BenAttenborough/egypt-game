export class Tomb {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  playerImage: HTMLImageElement;

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
  }

  draw() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col <= 5; col++) {
        this.ctx.drawImage(
          this.playerImage,
          this.x * this.cellSize + col * this.cellSize,
          this.y * this.cellSize + row * this.cellSize
        );
      }
    }
  }
}
