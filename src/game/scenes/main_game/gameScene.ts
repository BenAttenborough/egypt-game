import { Player } from "../../objects/player";

interface keysPressed {
  ArrowRight: boolean;
  ArrowLeft: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
}

export class GameScene implements scene {
  speed: number;
  speed2: number;
  x: number;
  x2: number;
  x3: number;
  player: any;
  keysPressed: keysPressed;
  changeScene: (GameScene: gameScene) => void;
  playerImage: any;
  throttleMoveRight: (...args: any[]) => void;

  constructor(gameConfig: GameConfig) {
    this.speed = 0.05;
    this.speed2 = 0.005;
    this.x = 0;
    this.x2 = 0;
    this.x3 = 0;
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
    this.x += this.speed * dt;
    this.x = this.x % 100;
    this.x2 += this.speed * 8.4;
    this.x2 = this.x2 % 100;
    // this.x3 += this.speed2 * 8.4;
    // this.x3 = (this.x3 % 100);
    if (this.keysPressed.ArrowRight) {
      // this.x3 += this.speed2 * dt;
      // this.x3 = (this.x3 % 100)
      this.throttleMoveRight(dt);
    }
  };

  moveRight = () => {
    this.x3 += 1;
  };

  throttle = (func, delay) => {
    let lastCall = 0; // Tracks when function last executed
    return function (...args) {
      const now = Date.now(); // Get current timestamp in milliseconds
      if (now - lastCall >= delay) {
        // Check if enough time has passed
        func.apply(this, args); // Execute the function
        lastCall = now; // Update the last call time
      }
    };
  };

  render = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, 10, 10, 10);
    ctx.fillStyle = "red";
    ctx.fillRect(this.x2, 30, 10, 10);
    this.player.drawPlayer(ctx, "DOWN", [this.x3, 3]);
    // ctx.drawImage(this.playerImage, 0, 0, 32, 32, this.x3, 50, 32, 32);
    ctx.fillText("ArrowRight: " + this.keysPressed.ArrowRight, 10, 120);
    ctx.fillText("x: " + this.x, 10, 140);
    ctx.fillText("x2: " + this.x2, 10, 160);
    ctx.fillText("x3: " + this.x3, 10, 180);
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
