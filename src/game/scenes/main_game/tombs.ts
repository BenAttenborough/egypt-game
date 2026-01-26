import { Tomb } from "../../objects/tomb";

export class Tombs {
  spriteSheet: HTMLImageElement;
  tombs: Tomb[];

  constructor(spriteSheet: HTMLImageElement) {
    this.spriteSheet = spriteSheet;
    this.tombs = this.getTombs();
  }

  renderTombs = (ctx: CanvasRenderingContext2D): void => {
    for (const tomb of this.tombs) tomb.draw(ctx);
  };

  getTombs = (): Tomb[] => {
    let tombs = [];
    let types = this.tombTypes.toSorted(() => (Math.random() > 0.5 ? 1 : -1));
    let i = 0;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        tombs.push(
          new Tomb({
            x: col * 8 + 2,
            y: row * 6 + 6,
            spriteSheet: this.spriteSheet,
            type: types[i],
          })
        );
        i++;
      }
    }
    return tombs;
  };

  tombTypes: TombType[] = [
    "KEY",
    "COFFIN",
    "SCROLL",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "EMPTY",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "TREASURE",
    "MUMMY",
  ];
}
