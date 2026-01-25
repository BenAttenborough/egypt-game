import { Tomb } from "../../objects/tomb";

export class Tombs {
  ctx: CanvasRenderingContext2D;
  spriteSheet: HTMLImageElement;
  tombs: Tomb[];

  constructor(ctx: CanvasRenderingContext2D, spriteSheet: HTMLImageElement) {
    this.ctx = ctx;
    this.spriteSheet = spriteSheet;
    this.tombs = this.getTombs();
  }

  renderTombs = (): void => {
    this.tombs[0].draw();
  };

  getTombs = (): Tomb[] => {
    const tomb = new Tomb({
      x: 1,
      y: 1,
      ctx: this.ctx,
      spriteSheet: this.spriteSheet,
      type: "SCROLL",
    });

    return [tomb];
  };
}
