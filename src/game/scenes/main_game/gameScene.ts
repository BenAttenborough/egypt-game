import { Player } from "../../objects/player";
import { Tombs } from "./tombs";
import { playfield } from "./playfield";
import { Grid } from "./grid";
import { doubleArrayArray } from "../../../helpers/util";

interface keysPressed {
  ArrowRight: boolean;
  ArrowLeft: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

export class GameScene implements scene {
  movementDelay: number = 100; // delay in milliseconds in character movement
  grid: Grid = new Grid(doubleArrayArray(playfield()));

  player: any;
  keysPressed: keysPressed;
  changeScene: (GameScene: gameScene) => void;
  spriteSheet: any;
  tombs: Tombs;

  constructor(gameConfig: GameConfig) {
    this.player = new Player(gameConfig.spriteSheet);
    this.keysPressed = {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    };
    this.addKeyboardListeners();
    this.changeScene = gameConfig.changeScene;
    this.spriteSheet = gameConfig.spriteSheet;

    this.tombs = new Tombs(this.spriteSheet);
  }

  init = (): void => {};

  exit = (gameScene: gameScene) => {};

  update = (dt: number) => {
    this.keyboardUpdate();
  };

  render = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.player.drawPlayer(ctx);
    this.tombs.renderTombs(ctx);
  };

  keyboardUpdate = () => {
    if (this.keysPressed.ArrowRight) {
      // console.log(this.player);
      if (this.grid.canMove([this.player.x, this.player.y], "RIGHT")) {
        this.throttleMoveRight();
      }
    }
    if (this.keysPressed.ArrowLeft) {
      if (this.grid.canMove([this.player.x, this.player.y], "LEFT")) {
        this.throttleMoveLeft();
      }
    }
    if (this.keysPressed.ArrowUp) {
      if (this.grid.canMove([this.player.x, this.player.y], "UP")) {
        this.throttleMoveUp();
      }
    }
    if (this.keysPressed.ArrowDown) {
      if (this.grid.canMove([this.player.x, this.player.y], "DOWN")) {
        this.throttleMoveDown();
      }
    }
  };

  throttle = <Args extends any[], R>(
    func: (...args: Args) => R,
    delay: number
  ) => {
    let lastCall = 0; // Tracks when function last executed
    return (...args: Args) => {
      const now = Date.now(); // Get current timestamp in milliseconds
      if (now - lastCall >= delay) {
        // Check if enough time has passed
        func.apply(this, args); // Execute the function
        lastCall = now; // Update the last call time
      }
    };
  };

  throttleMoveRight = this.throttle(() => {
    this.player.moveRight();
  }, this.movementDelay);
  throttleMoveLeft = this.throttle(() => {
    this.player.moveLeft();
  }, this.movementDelay);
  throttleMoveUp = this.throttle(() => {
    this.player.moveUp();
  }, this.movementDelay);
  throttleMoveDown = this.throttle(() => {
    this.player.moveDown();
  }, this.movementDelay);

  addKeyboardListeners = () => {
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.code === "ArrowRight") {
        this.keysPressed.ArrowRight = true;
      }
      if (e.code === "ArrowLeft") {
        this.keysPressed.ArrowLeft = true;
      }
      if (e.code === "ArrowUp") {
        this.keysPressed.ArrowUp = true;
      }
      if (e.code === "ArrowDown") {
        this.keysPressed.ArrowDown = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.code === "ArrowRight") {
        this.keysPressed.ArrowRight = false;
      }
      if (e.code === "ArrowLeft") {
        this.keysPressed.ArrowLeft = false;
      }
      if (e.code === "ArrowUp") {
        this.keysPressed.ArrowUp = false;
      }
      if (e.code === "ArrowDown") {
        this.keysPressed.ArrowDown = false;
      }
    });
  };
}
