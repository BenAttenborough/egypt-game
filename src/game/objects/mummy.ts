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
        if (this.y > 0) {
          this.y--;
        }
        break;
      case "DOWN":
        this.direction = "DOWN";
        if (this.y < 26) {
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

  move() {
    // console.log("Tick");
    let direction: Direction;

    if (this.player.x > this.x && this.x < 40) {
      direction = "RIGHT";
    } else if (this.player.x < this.x && this.x > 0) {
      direction = "LEFT";
    } else if (this.player.y > this.y && this.y < 26) {
      direction = "DOWN";
    } else if (this.player.y < this.y && this.y > 0) {
      direction = "UP";
    } else {
      direction = this.direction; // Fallback to current if no movement possible
    }

    this.moveInternal(direction);
    setTimeout(() => this.move(), 200);
  }
}
