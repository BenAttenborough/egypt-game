import { Player } from "../objects/player";

export class GameScene {
    speed: number;
    x: number;
    x2: number;
    player: any;

    constructor(gameConfig: any) {
        this.speed = 0.05;
        this.x = 0;
        this.x2 = 0;
        this.player = new Player(gameConfig.playerImage);
    }

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
    }
}