export function drawQuarterImage(
  image: HTMLImageElement,
  quadrant: Quadrant,
  position: Point,
  quadSize: number,
  ctx: CanvasRenderingContext2D,
  offSetX: number = 0,
  offSetY: number = 0
) {
  let cellSize = 16;
  switch (quadrant) {
    case "TR":
      offSetX += quadSize;
      break;
    case "BL":
      offSetY += quadSize;
      break;
    case "BR":
      offSetX += quadSize;
      offSetY += quadSize;
      break;
  }

  ctx.drawImage(
    image,
    offSetX,
    offSetY,
    quadSize,
    quadSize,
    cellSize * position[1],
    cellSize * position[0],
    quadSize,
    quadSize
  );
}
