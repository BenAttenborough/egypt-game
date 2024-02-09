import { drawQuarterImage } from "../helpers/render";

export function drawFeet(
  gridContent: any,
  ctx: CanvasRenderingContext2D,
  spriteSheetImg: HTMLImageElement
) {
  const cellSize = 16;
  const pixelCellSize = 32;
  gridContent.forEach((row: number[], rowIdx: number) => {
    row.forEach((cell, colIdx: number) => {
      if (cell === 1) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(cellSize * colIdx, cellSize * rowIdx, cellSize, cellSize);
      }
      if (cell === 2) {
        // Foot right
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "TL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              0,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "TR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              0,
              pixelCellSize
            );
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "BL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              0,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "BR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              0,
              pixelCellSize
            );
          }
        }
      }
      if (cell === 3) {
        // Foot left
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "TL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "TR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize,
              pixelCellSize
            );
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "BL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "BR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize,
              pixelCellSize
            );
          }
        }
      }
      if (cell === 4) {
        // Foot up
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "TL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 2,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "TR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 2,
              pixelCellSize
            );
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "BL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 2,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "BR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 2,
              pixelCellSize
            );
          }
        }
      }
      if (cell === 5) {
        // Foot down
        if (rowIdx % 2 === 0) {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "TL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 3,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "TR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 3,
              pixelCellSize
            );
          }
        } else {
          if (colIdx % 2 === 0) {
            drawQuarterImage(
              spriteSheetImg,
              "BL",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 3,
              pixelCellSize
            );
          } else {
            drawQuarterImage(
              spriteSheetImg,
              "BR",
              [rowIdx, colIdx],
              cellSize,
              ctx,
              pixelCellSize * 3,
              pixelCellSize
            );
          }
        }
      }
    });
  });
}
