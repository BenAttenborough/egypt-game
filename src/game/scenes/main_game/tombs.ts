import { Tomb } from "../../objects/tomb";

export class Tombs {
  spriteSheet: HTMLImageElement;
  tombs: Tomb[];

  constructor(spriteSheet: HTMLImageElement) {
    this.spriteSheet = spriteSheet;
    this.tombs = this.getTombs();
  }

  renderTombs = (ctx: CanvasRenderingContext2D): void => {
    this.tombs[0].draw(ctx);
  };

  getTombs = (): Tomb[] => {
    const tomb = new Tomb({
      x: 1,
      y: 1,
      spriteSheet: this.spriteSheet,
      type: "SCROLL",
    });

    return [tomb];
  };
}
