import { SplashScene } from "./scenes/splash/splashScene";
import { GameScene } from "./scenes/main_game/gameScene";
import spriteSheet from "./res/sprite-sheet2.png";

export class Game {
  gameState: any;
  gameConfig: GameConfig;
  spriteSheetImg: HTMLImageElement;

  constructor() {
    this.spriteSheetImg = new Image();
    this.spriteSheetImg.src = spriteSheet;
    this.gameConfig = this.initGameConfig(this.spriteSheetImg);
    this.gameState = new GameScene(this.gameConfig);
    // this.gameState = new SplashScene(this.gameConfig);
  }

  update = (dt: number) => {
    this.gameState.update(dt, this.callBack);
  };

  render = (ctx: CanvasRenderingContext2D) => {
    this.gameState.render(ctx);
  };

  callBack = (gameScene: gameScene) => {
    console.log("Callback");
    console.log(gameScene);
    switch (gameScene) {
      case "SPLASH":
        this.gameState = new SplashScene(this.gameConfig);
        break;
      case "GAME":
        this.gameState = new GameScene(this.gameConfig);
    }
  };

  initGameConfig(spriteSheetImg: HTMLImageElement): GameConfig {
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
      spriteSheet: spriteSheetImg,
      changeScene: this.callBack,
    };
  }
}
