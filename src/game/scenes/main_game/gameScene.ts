import { Player } from "../../objects/player";

interface keysPressed {
    ArrowRight: boolean,
    ArrowLeft: boolean,
    ArrowUp: boolean,
    ArrowDown: boolean,
}

export class GameScene implements scene {
    speed: number;
    x: number;
    x2: number;
    player: any;
    keysPressed: keysPressed;

    constructor(gameConfig: GameConfig) {
        this.speed = 0.05;
        this.x = 0;
        this.x2 = 0;
        this.player = new Player(gameConfig.playerImage);
        this.keysPressed = {
            ArrowRight: false,
            ArrowLeft: false,
            ArrowUp: false,
            ArrowDown: false,
        }
        this.keyboardInput();
    }

    init = (): void => { }

    update = (dt: number) => {
        this.x += this.speed * dt;
        this.x = (this.x % 100)
        this.x2 += this.speed * 8.4;
        this.x2 = (this.x2 % 100)
    }

    render = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, 10, 10, 10);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x2, 30, 10, 10);
        this.player.drawPlayer(ctx, "DOWN", [0, 3])
        ctx.fillText(("ArrowRight: " + this.keysPressed.ArrowRight), 10, 50)
    }

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
    }
}