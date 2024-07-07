export class Mummy {
  spriteSize: number;
  cellSize: number;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  stopMain: () => void;
  position: Point;
  precisePosition: Point;
  direction: Direction;
  isMovingFromIntersection: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    stopMain: () => void,
    position: Point,
    precisePosition: Point,
    direction: Direction,
    isMovingFromIntersection: boolean
  ) {
    this.spriteSize = 32;
    this.cellSize = 16;
    this.ctx = ctx;
    this.image = image;
    this.stopMain = stopMain;
    this.position = position;
    this.precisePosition = precisePosition;
    this.direction = direction;
    this.isMovingFromIntersection = isMovingFromIntersection;
  }

  draw() {
    let offSet = 0;
    switch (this.direction) {
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
        this.image,
        offSet,
        this.spriteSize * 8,
        this.spriteSize,
        this.spriteSize,
        this.position[0] * this.cellSize,
        this.position[1] * this.cellSize,
        this.spriteSize,
        this.spriteSize
      );
    } catch (error) {
      this.stopMain;
      throw new Error(`Error loading image: ${this.image.currentSrc}`);
    }
  }

  setPosition(position: Point) {
    console.log("Setting position to", position);
    this.position = position;
  }
}
