export class SplashScene implements scene {
    update = (dt: number): void => {

    }

    render = (ctx: CanvasRenderingContext2D): void => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}