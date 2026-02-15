import { Player } from "./player";

type Config = {
  x: number;
  y: number;
  spriteSheet: HTMLImageElement;
  player: Player;
};

export class Mummy {
  offSetX: number = 0;
  offSetY: number = 64;
  cellSize: number = 16;
  direction: Direction = "LEFT";
  spriteSize: number = 32;
  movementDelay: number = 200; // delay in milliseconds in character movement
  xCorners: number[] = [0, 8, 16, 24, 32, 40];
  yCorners: number[] = [4, 10, 16, 22, 28];
  destroyed: boolean = false;

  x: number;
  y: number;
  spriteSheet: HTMLImageElement;
  player: Player;

  constructor(config: Config) {
    this.x = config.x;
    this.y = config.y;
    this.spriteSheet = config.spriteSheet;
    this.player = config.player;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.destroyed) {
      return;
    }

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
        if (this.x % 2 === 0) {
          offset += this.spriteSize;
        }
        break;
      case "RIGHT":
        offset = 0 * this.spriteSize;
        if (this.x % 2 === 0) {
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

  moveInternal(direction: Direction) {
    switch (direction) {
      case "UP":
        this.direction = "UP";
        if (this.y > 2) {
          this.y--;
        }
        break;
      case "DOWN":
        this.direction = "DOWN";
        if (this.y < 28) {
          this.y++;
        }
        break;
      case "RIGHT":
        this.direction = "RIGHT";
        if (this.x < 40) {
          this.x++;
        }
        break;
      case "LEFT":
        this.direction = "LEFT";
        if (this.x > 0) {
          this.x--;
        }
        break;
    }
  }

  setDirection(): Direction {
    let direction: Direction = "UP";
    let xDistance = Math.abs(this.player.x - this.x);
    let yDistance = Math.abs(this.player.y - this.y);
    if (xDistance < yDistance) {
      if (this.player.y > this.y) {
        direction = "DOWN";
      } else {
        direction = "UP";
      }
    } else {
      if (this.player.x > this.x) {
        direction = "RIGHT";
      } else {
        direction = "LEFT";
      }
    }
    return direction;
  }

  checkCollision(): boolean {
    if (this.x === this.player.x && this.y === this.player.y) {
      return true;
    }
    return false;
  }

  update() {
    if (this.destroyed) {
      return;
    }
    if (this.checkCollision()) {
      console.log("Hit!"); // We might not be checking this often enough
      this.destroyed = true;
    }
    this.move();
  }

  move() {
    let direction: Direction = this.direction;

    if (this.xCorners.includes(this.x) && this.yCorners.includes(this.y)) {
      direction = this.setDirection();
    }

    this.moveInternal(direction);
    setTimeout(() => this.update(), 200);
  }
}
