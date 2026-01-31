type Config = {
  x: number;
  y: number;
  spriteSheet: HTMLImageElement;
};

export class Mummy {
  offSetX: number = 0;
  offSetY: number = 64;
  cellSize: number = 16;
  direction: Direction = "LEFT";
  spriteSize: number = 32;

  x: number;
  y: number;
  spriteSheet: HTMLImageElement;

  constructor(config: Config) {
    this.x = config.x;
    this.y = config.y;
    this.spriteSheet = config.spriteSheet;
  }

  draw(ctx: CanvasRenderingContext2D) {
    let offset = 0;
    switch (this.direction) {
      case "UP":
        offset = 6 * this.spriteSize;
        if (this.y % 2 === 0) {
          offset += this.spriteSize;
        }
        break;
      case "DOWN":
        offset = 4 * this.spriteSize;
        if (this.y % 2 === 0) {
          offset += this.spriteSize;
        }
        break;
      case "LEFT":
        offset = 2 * this.spriteSize;
        if (this.y % 2 === 0) {
          offset += this.spriteSize;
        }
        break;
      case "RIGHT":
        offset = 0 * this.spriteSize;
        if (this.y % 2 === 0) {
          offset += this.spriteSize;
        }
        break;
    }
    try {
      ctx.drawImage(
        this.spriteSheet,
        offset,
        this.cellSize * 16,
        this.spriteSize,
        this.spriteSize,
        this.x * this.cellSize,
        this.y * this.cellSize,
        this.spriteSize,
        this.spriteSize
      );
    } catch (error) {
      throw new Error(`Error loading image`);
    }
  }
}
