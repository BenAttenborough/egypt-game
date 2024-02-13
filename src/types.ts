type Point = [number, number];
type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";
type Quadrant = "TL" | "TR" | "BL" | "BR";
type Grid = {
  content: any[][];
  position: Point;
  move4Block: (direction: Direction) => void;
};

type Tomb = {
  open: boolean;
  draw: () => void;
};
type GameConfig = {
  stopMain: number;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  stateChanged: boolean;
  playerDirection: Direction;
  tombs: Tomb[];
  keysPressed: {
    ArrowRight: boolean;
    ArrowLeft: boolean;
    ArrowUp: boolean;
    ArrowDown: boolean;
  };
};
