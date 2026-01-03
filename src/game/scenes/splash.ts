export class Splash {
    speed = 0.05;
    x = 0;
    x2 = 0;

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
    }
}