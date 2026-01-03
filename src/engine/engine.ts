export interface Game {
    render: (ctx: CanvasRenderingContext2D) => void;
}

export class Engine {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    previoustime: number;
    lastTick: number;
    game: any;

    constructor(game: any) {
        this.previoustime = Date.now();
        this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.game = new game(this.context);
        this.lastTick = performance.now();
        this.run();
    }

    update(tFrame = 0) {
        const delta = tFrame - this.lastTick;
        // console.log(delta)
        this.lastTick = tFrame;
        this.game.update(delta)

    }

    run = (tFrame?: number) => {
        // let newtime = Date.now();
        // this.previoustime = (newtime - this.previoustime) / 1000;
        this.update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
        this.game.render(this.context);

        // The main loop
        requestAnimationFrame(this.run);
    }
}
