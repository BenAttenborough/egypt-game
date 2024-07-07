import { State } from "../state";

export default function TitleState(config: {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}) {
  return new State({
    name: "Title",
    canvas: config.canvas,
    ctx: config.ctx,
    draw: () => {
      console.log(config.ctx);
      config.ctx.clearRect(0, 0, config.canvas.width, config.canvas.height);
      config.ctx.font = "16px Amstrad";
      config.ctx.fillStyle = "#ff8000";
      config.ctx.fillText("OH MUMMY!", 0, 18);
    },
  });
}

// ("Title", () => {
//     console.log(this.ctx);
//     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     this.ctx.font = "16px Amstrad";
//     this.ctx.fillStyle = "#ff8000";
//     this.ctx.fillText("OH MUMMY!", 0, 18);
//   });
