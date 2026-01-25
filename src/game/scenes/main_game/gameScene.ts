import { Player } from "../../objects/player";

interface keysPressed {
  ArrowRight: boolean;
  ArrowLeft: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

export class GameScene implements scene {
  player: any;
  keysPressed: keysPressed;
  changeScene: (GameScene: gameScene) => void;
  playerImage: any;
  throttleMoveRight: (...args: any[]) => void;
  x: number;

  constructor(gameConfig: GameConfig) {
    this.x = 1
    this.player = new Player(gameConfig.playerImage);
    this.keysPressed = {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    };
    this.keyboardInput();
    this.changeScene = gameConfig.changeScene;
    this.playerImage = gameConfig.playerImage;
    this.throttleMoveRight = this.throttle(this.moveRight, 100);
  }

  init = (): void => {};

  exit = (gameScene: gameScene) => {};

  update = (dt: number) => {
    if (this.keysPressed.ArrowRight) {
      this.throttleMoveRight(dt);
    }
  };

  moveRight = () => {
    this.x += 1;
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

  render = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.player.drawPlayer(ctx, "DOWN", [this.x, 3]);
    // ctx.drawImage(this.playerImage, 0, 0, 32, 32, this.x3, 50, 32, 32);
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.strokeRect(18,50,30,30);
    ctx.fillText("ArrowRight: " + this.keysPressed.ArrowRight, 10, 120);
    ctx.fillText("x: " + this.x, 10, 140);
  };

  keyboardInput = () => {
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
      // if (this.keysPressed.hasOwnProperty(e.code))
      //   this.keysPressed[e.code] = true;
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
      // if (this.keysPressed.hasOwnProperty(e.code))
      //   this.keysPressed[e.code] = false;
    });
  };
}
