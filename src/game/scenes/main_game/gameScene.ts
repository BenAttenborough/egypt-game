import { Player } from "../../objects/player";

interface keysPressed {
  ArrowRight: boolean;
  ArrowLeft: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

export class GameScene implements scene {
  x: number = 1;
  y: number = 3;
  movementDelay: number = 100; // delay in milliseconds in character movement

  player: any;
  keysPressed: keysPressed;
  changeScene: (GameScene: gameScene) => void;
  playerImage: any;

  constructor(gameConfig: GameConfig) {
    this.player = new Player(gameConfig.playerImage);
    this.keysPressed = {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    };
    this.addKeyboardListeners();
    this.changeScene = gameConfig.changeScene;
    this.playerImage = gameConfig.playerImage;
  }

  init = (): void => {};

  exit = (gameScene: gameScene) => {};

  update = (dt: number) => {
    this.keyboardUpdate();
  };

  render = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.player.drawPlayer(ctx, "DOWN", [this.x, this.y]);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.strokeRect(18, 50, 30, 30);
    ctx.fillText("ArrowRight: " + this.keysPressed.ArrowRight, 10, 120);
    ctx.fillText("x: " + this.x, 10, 140);
  };

  keyboardUpdate = () => {
    if (this.keysPressed.ArrowRight) {
      this.throttleMoveRight();
    }
    if (this.keysPressed.ArrowLeft) {
      this.throttleMoveLeft();
    }
    if (this.keysPressed.ArrowUp) {
      this.throttleMoveUp();
    }
    if (this.keysPressed.ArrowDown) {
      this.throttleMoveDown();
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
    this.x += 1;
  }, this.movementDelay);
  throttleMoveLeft = this.throttle(() => {
    this.x -= 1;
  }, this.movementDelay);
  throttleMoveUp = this.throttle(() => {
    this.y -= 1;
  }, this.movementDelay);
  throttleMoveDown = this.throttle(() => {
    this.y += 1;
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
