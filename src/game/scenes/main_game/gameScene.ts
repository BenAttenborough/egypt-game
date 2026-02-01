import { Player } from "../../objects/player";
import { Tombs } from "./tombs";
import { Mummies } from "./mummies";
import { playfield } from "./playfield";
import { Grid } from "./grid";
import { doubleArrayArray } from "../../../helpers/util";
import { drawFeet } from "../../objects/feet";

interface keysPressed {
  ArrowRight: boolean;
  ArrowLeft: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

export class GameScene implements scene {
  movementDelay: number = 100; // delay in milliseconds in character movement
  cellSize: number = 32;
  colorOrange: string = "#ff8000";
  grid: Grid = new Grid(doubleArrayArray(playfield()));
  score: number = 0;

  player: any;
  keysPressed: keysPressed;
  changeScene: (GameScene: gameScene) => void;
  spriteSheet: any;
  tombs: Tombs;
  mummies: Mummies;

  constructor(gameConfig: GameConfig) {
    this.changeScene = gameConfig.changeScene;
    this.spriteSheet = gameConfig.spriteSheet;
    this.player = new Player(gameConfig.spriteSheet);

    this.keysPressed = {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    };
    this.addKeyboardListeners();
    this.tombs = new Tombs(this.spriteSheet, this.updateScore);
    this.mummies = new Mummies(this.spriteSheet);
    this.init();
  }

  init = (): void => {
    this.mummies.addMummy({
      x: 40,
      y: 28,
      spriteSheet: this.spriteSheet,
    });
    // this.mummies.mummies[0].move(this.mummies.mummies[0].direction);
  };

  exit = (gameScene: gameScene) => {};

  update = (dt: number) => {
    this.keyboardUpdate();
    // this.mummies.moveMummies();
  };

  render = (ctx: CanvasRenderingContext2D) => {
    this.renderBackground(ctx);
    this.renderUI(ctx);
    drawFeet(this.grid.content, ctx, this.spriteSheet);
    this.player.drawPlayer(ctx);
    this.tombs.renderTombs(ctx);
    this.mummies.drawMummies(ctx);
  };

  renderBackground = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#3954ff";
    ctx.fillRect(0, 0, ctx.canvas.width, this.cellSize);
    ctx.fillRect(0, this.cellSize, this.cellSize * 8, this.cellSize);
    ctx.fillRect(
      this.cellSize * 9,
      this.cellSize,
      ctx.canvas.width,
      this.cellSize
    );
  };

  renderUI = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = this.colorOrange;
    ctx.font = "18px Amstrad";
    ctx.fillText(
      "SCORE " + ("00000" + this.score.toString()).slice(-5),
      0,
      this.cellSize
    );
  };

  updateScore = (points: number) => {
    this.score += points; // Update score here
  };

  keyboardUpdate = () => {
    if (this.keysPressed.ArrowRight) {
      // console.log(this.player);
      if (this.grid.canMove([this.player.x, this.player.y], "RIGHT")) {
        this.throttleMoveRight();
        this.tombs.checkTombs(this.grid.content);
      }
    }
    if (this.keysPressed.ArrowLeft) {
      if (this.grid.canMove([this.player.x, this.player.y], "LEFT")) {
        this.throttleMoveLeft();
        this.tombs.checkTombs(this.grid.content);
      }
    }
    if (this.keysPressed.ArrowUp) {
      if (this.grid.canMove([this.player.x, this.player.y], "UP")) {
        this.throttleMoveUp();
        this.tombs.checkTombs(this.grid.content);
      }
    }
    if (this.keysPressed.ArrowDown) {
      if (this.grid.canMove([this.player.x, this.player.y], "DOWN")) {
        this.throttleMoveDown();
        this.tombs.checkTombs(this.grid.content);
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
    this.grid.setBlockFromOrigin([this.player.x, this.player.y], 2);
  }, this.movementDelay);
  throttleMoveLeft = this.throttle(() => {
    this.player.moveLeft();
    this.grid.setBlockFromOrigin([this.player.x, this.player.y], 3);
  }, this.movementDelay);
  throttleMoveUp = this.throttle(() => {
    this.player.moveUp();
    this.grid.setBlockFromOrigin([this.player.x, this.player.y], 4);
  }, this.movementDelay);
  throttleMoveDown = this.throttle(() => {
    this.player.moveDown();
    this.grid.setBlockFromOrigin([this.player.x, this.player.y], 5);
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
