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
  movementDelay: number = 200; // delay in milliseconds in character movement

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

  // throttle = <Args extends any[], R>(
  //   func: (...args: Args) => R,
  //   delay: number
  // ) => {
  //   let lastCall = 0; // Tracks when function last executed
  //   return (...args: Args) => {
  //     const now = Date.now(); // Get current timestamp in milliseconds
  //     if (now - lastCall >= delay) {
  //       // Check if enough time has passed
  //       func.apply(this, args); // Execute the function
  //       lastCall = now; // Update the last call time
  //     }
  //   };
  // };

  // throttleMoveRight = this.throttle(() => {
  //   this.direction = "RIGHT";
  //   this.x++;
  // }, this.movementDelay);
  // throttleMoveLeft = this.throttle(() => {
  //   this.direction = "LEFT";
  //   this.x--;
  // }, this.movementDelay);
  // throttleMoveUp = this.throttle(() => {
  //   this.direction = "UP";
  //   this.y--;
  // }, this.movementDelay);
  // throttleMoveDown = this.throttle(() => {
  //   this.direction = "DOWN";
  //   this.y++;
  // }, this.movementDelay);

  moveInternal(direction: Direction) {
    switch (direction) {
      case "UP":
        this.direction = "UP";
        this.y--;
        break;
      case "DOWN":
        this.direction = "DOWN";
        this.y++;
        break;
      case "RIGHT":
        this.direction = "RIGHT";
        this.x++;
        break;
      case "LEFT":
        this.direction = "LEFT";
        this.x--;
        break;
    }
  }

  move(direction: Direction) {
    console.log("Tick");
    this.moveInternal(direction);
    setTimeout(() => this.move(direction), 200);
  }
}
