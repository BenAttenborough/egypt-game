import { Mummy } from "../../objects/mummy";
import { Player } from "../../objects/player";

export class Mummies {
  spriteSheet: HTMLImageElement;
  mummies: Mummy[] = [];

  constructor(spriteSheet: HTMLImageElement) {
    this.spriteSheet = spriteSheet;
  }

  addMummy = (config: {
    x: number;
    y: number;
    spriteSheet: HTMLImageElement;
    player: Player;
  }) => {
    this.mummies.push(new Mummy(config));
  };

  drawMummies = (ctx: CanvasRenderingContext2D) => {
    this.mummies.forEach((mummy) => {
      mummy.draw(ctx);
    });
  };

  moveMummies = () => {
    this.mummies.forEach((mummy) => {
      mummy.move();
    });
  };
}
