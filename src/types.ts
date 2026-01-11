// type Point = [number, number];
// type Quadrant = "TL" | "TR" | "BL" | "BR";
// type Grid = {
//   content: any[][];
//   position: Point;
//   move4Block: (direction: Direction) => boolean;
//   get: (point: Point) => any;
// };

// type TombType = "EMPTY" | "KEY" | "SCROLL" | "COFFIN" | "TREASURE" | "MUMMY";

// type Tomb = {
//   open: boolean;
//   draw: () => void;
//   neighbouringCells: Point[];
//   type: TombType;
// };

type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

type gameScene = "SPLASH" | "GAME";

interface scene {
  init: () => void;
  update: (dt: number) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
  exit: (gameScene: gameScene) => void;
}

interface GameConfig {
  stopMain: number;
  speed: number;
  stateChanged: boolean;
  playerDirection: Direction;
  keysPressed: {
    ArrowRight: boolean;
    ArrowLeft: boolean;
    ArrowUp: boolean;
    ArrowDown: boolean;
  };
  score: number;
  playerImage: HTMLImageElement;
  changeScene: (gameScene: gameScene) => void;
};