export class SplashScene implements scene {

    changeScene: (GameScene: gameScene) => void;

    constructor(gameConfig: GameConfig) {
        this.changeScene = gameConfig.changeScene;
        this.keyboardInput();
    }

    init = (): void => { }

    update = (dt: number): void => {

    }

    render = (ctx: CanvasRenderingContext2D): void => {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    exit = (gameScene: gameScene): void => {
        console.log("Exiting splash screen");
        window.removeEventListener("keyup", this.handleKeyUp);
        this.changeScene(gameScene);
    }

    handleKeyUp = (e: KeyboardEvent): void => {
        e.preventDefault();
        if (e.code === "Enter") {
            this.exit("GAME");
        }
    }

    keyboardInput = () => {
        window.addEventListener("keyup", this.handleKeyUp);
    }
}