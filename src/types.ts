type Point = [number, number];
type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";
type Quadrant = "TL" | "TR" | "BL" | "BR";
type GameConfig = {
  stopMain: number;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  stateChanged: boolean;
  playerDirection: Direction;
  tombs: Tomb[];
};
