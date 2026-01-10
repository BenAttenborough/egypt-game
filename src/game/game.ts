import { GameScene } from "./scenes/gameScene";
import spriteSheet from "./res/sprite-sheet2.png";


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
    playerImage: HTMLImageElement;
};

function initGameConfig(spriteSheetImg: HTMLImageElement): GameConfig {
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
        playerImage: spriteSheetImg
    }
}

export class Game {

    gameState: any;
    gameConfig: GameConfig;
    spriteSheetImg: HTMLImageElement;


    constructor() {
        this.spriteSheetImg = new Image();
        this.spriteSheetImg.src = spriteSheet;
        this.gameConfig = initGameConfig(this.spriteSheetImg);
        this.gameState = new GameScene(this.gameConfig)
    }

    update = (dt: number) => {
        this.gameState.update(dt)
    }

    render = (ctx: CanvasRenderingContext2D) => {
        // console.log("Rendering maze game");
        this.gameState.render(ctx);
    }
}