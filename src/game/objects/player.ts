export class Player {
  spriteSize: number = 32;
  cellSize: number = 16;
  x: number = 16;
  y: number = 2;
  direction: Direction = "DOWN";
  lives: number = 5;

  spriteSheet: HTMLImageElement;
  constructor(spriteSheet: HTMLImageElement) {
    this.spriteSheet = spriteSheet;
  }

  moveRight = () => {
    this.direction = "RIGHT";
    this.x++;
  };
  moveLeft = () => {
    this.direction = "LEFT";
    this.x--;
  };
  moveUp = () => {
    this.direction = "UP";
    this.y--;
  };
  moveDown = () => {
    this.direction = "DOWN";
    this.y++;
  };

  drawPlayer(ctx: CanvasRenderingContext2D) {
    let offSet = 0;
    switch (this.direction) {
      case "UP":
        offSet = 6 * this.spriteSize;
        if (this.y % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "RIGHT":
        offSet = 0;
        if (this.x % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "DOWN":
        offSet = 4 * this.spriteSize;
        if (this.y % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
      case "LEFT":
        offSet = 2 * this.spriteSize;
        if (this.x % 2 === 0) {
          offSet += this.spriteSize;
        }
        break;
    }

    try {
      ctx.drawImage(
        this.spriteSheet,
        offSet,
        0,
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
