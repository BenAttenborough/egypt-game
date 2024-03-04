type Point = [number, number];
type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";
type Quadrant = "TL" | "TR" | "BL" | "BR";
type Grid = {
  content: any[][];
  position: Point;
  move4Block: (direction: Direction) => void;
  get: (point: Point) => any;
};

type Tomb = {
  open: boolean;
  draw: () => void;
  neighbouringCells: Point[];
};
type GameConfig = {
  stopMain: number;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  precisePosition: Point;
  speed: number;
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
