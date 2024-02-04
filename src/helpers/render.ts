export function drawQuarterImage(
  image: HTMLImageElement,
  quadrant: Quadrant,
  position: Point,
  quadSize: number,
  ctx: CanvasRenderingContext2D
) {
  let offSetX = 0;
  let offSetY = 0;
  let cellSize = 16;
  switch (quadrant) {
    case "TL":
      offSetX = 0;
      offSetY = 0;
      break;
    case "TR":
      offSetX = quadSize;
      offSetY = 0;
      break;
    case "BL":
      offSetX = 0;
      offSetY = quadSize;
      break;
    case "BR":
      offSetX = quadSize;
      offSetY = quadSize;
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
