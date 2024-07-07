export class State {
  name: string;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  draw: () => void;

  constructor(name: string) {
    this.name = name;
    this.canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
    this.ctx = getContext(this.canvas)!;
    this.draw = () => {
      console.log(this.ctx);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = "16px Amstrad";
      this.ctx.fillStyle = "#ff8000";
      this.ctx.fillText("OH MUMMY!", 0, 18);
    };
  }
}

function getContext(canvas: HTMLCanvasElement) {
  if (!canvas.getContext) {
    throw new Error("No canvas found!");
  }
  return canvas.getContext("2d");
}
