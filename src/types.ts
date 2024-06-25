type Point = [number, number];
type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";
type Quadrant = "TL" | "TR" | "BL" | "BR";
type Grid = {
  content: any[][];
  // position: Point;
  // move4Block: (direction: Direction) => boolean;
  canMove: (position: Point, direction: Direction) => boolean;
  get: (point: Point) => any;
};

type TombType = "EMPTY" | "KEY" | "SCROLL" | "COFFIN" | "TREASURE" | "MUMMY";

type Tomb = {
  open: boolean;
  draw: () => void;
  neighbouringCells: Point[];
  type: TombType;
};

type Player = {
  spriteSize: number;
  cellSize: number;
  ctx: CanvasRenderingContext2D;
  playerImage: HTMLImageElement;
  stopMain: () => void;
  position: Point;
  precisePosition: Point;
  drawPlayer: (direction: Direction) => void;
  setPosition: (position: Point) => void;
};

type Mummy = {
  spriteSize: number;
  cellSize: number;
  ctx: CanvasRenderingContext2D;
  image: HTMLImageElement;
  stopMain: () => void;
  position: Point;
  precisePosition: Point;
  direction: Direction;
  draw: () => void;
  setPosition: (position: Point) => void;
};

type GameConfig = {
  stopMain: number;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  precisePosition: Point;
  speed: number;
  stateChanged: boolean;
  player: Player;
  playerDirection: Direction;
  mummies: Mummy[];
  tombs: Tomb[];
  keysPressed: {
    ArrowRight: boolean;
    ArrowLeft: boolean;
    ArrowUp: boolean;
    ArrowDown: boolean;
  };
  score: number;
};
