import { Splash } from "./scenes/splash";

type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

interface GameConfig {
    stopMain: number;
    speed: number;
    stateChanged: boolean;
    playerDirection: Direction;
    keysPressed: {
        ArrowRight: boolean;
        ArrowLeft: boolean;
        ArrowUp: boolean;
        ArrowDown: boolean;
    };
    score: number;
};

function initGameConfig(): GameConfig {
    return {
        stopMain: 0,
        speed: 0.005,
        stateChanged: true,
        playerDirection: "DOWN",
        keysPressed: {
            ArrowRight: false,
            ArrowLeft: false,
            ArrowUp: false,
            ArrowDown: false,
        },
        score: 0,
    }
}

export class Game {

    splashState: any;
    gameConfig: GameConfig;

    constructor(ctx: CanvasRenderingContext2D) {
        this.splashState = new Splash()
        this.gameConfig = initGameConfig();
    }

    update = (dt: number) => {
        this.splashState.update(dt)
    }

    render = (ctx: CanvasRenderingContext2D) => {
        // console.log("Rendering maze game");
        this.splashState.render(ctx);
    }
}