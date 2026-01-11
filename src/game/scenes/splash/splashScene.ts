export class SplashScene implements scene {

    init = (): void => { }

    update = (dt: number): void => {

    }

    render = (ctx: CanvasRenderingContext2D): void => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}