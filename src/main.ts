import "./style.css";
import { Grid } from "./grid";
import spriteSheet from "./sprite-sheet.png";
import { Player } from "./objects/player";
import { Tomb } from "./objects/tomb";
import { drawFeet } from "./objects/feet";
import { initPlayfield } from "./objects/playfield";
import { handleKeyboardInput } from "./input/keyboardInput";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Oh Mummy!</h1>
    <canvas id="game-canvas" width="670" height="352"></canvas>
  </div>
`;

let lastTick = performance.now();
let precisePosition = [16, 0];
let speed = 0.005;

const spriteSheetImg = new Image();
spriteSheetImg.src = spriteSheet;

const MyGame = initContext();
MyGame.grid.position = [16, 0];

const player = new Player(MyGame.ctx, spriteSheetImg, stopMain);

function doubleArray(arr: number[]): number[] {
  return arr.reduce((prev: number[], cur) => {
    return prev.concat([cur, cur]);
  }, []);
}

function doubleArrayArray(arr: number[][]): number[][] {
  return arr.reduce((prev: number[][], cur) => {
    return prev.concat([doubleArray(cur), doubleArray(cur)]);
  }, []);
}

function stopMain() {
  window.cancelAnimationFrame(MyGame.stopMain);
}

function draw() {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  MyGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFeet(MyGame.grid.content, MyGame.ctx, spriteSheetImg);
  player.drawPlayer(MyGame.playerDirection, MyGame.grid.position);
  MyGame.tombs.forEach((tomb) => tomb.draw());
}

function update(tFrame = 0) {
  const delta = tFrame - lastTick;
  lastTick = tFrame;
  if (MyGame.keysPressed.ArrowUp) {
    precisePosition[1] -= speed * delta;
    let absPostion = Math.round(precisePosition[1]);
    if (absPostion <= MyGame.grid.position[1] - 1) {
      MyGame.playerDirection = "UP";
      MyGame.grid.move4Block("UP");
      setBlockFromOrigin(MyGame, 4);
      precisePosition[1] = MyGame.grid.position[1];
      absPostion = MyGame.grid.position[1];
      MyGame.stateChanged = true;
    }
  }
  if (MyGame.keysPressed.ArrowDown) {
    precisePosition[1] += speed * delta;
    let absPostion = Math.round(precisePosition[1]);
    if (absPostion >= MyGame.grid.position[1] + 1) {
      MyGame.playerDirection = "DOWN";
      MyGame.grid.move4Block("DOWN");
      setBlockFromOrigin(MyGame, 5);
      precisePosition[1] = MyGame.grid.position[1];
      absPostion = MyGame.grid.position[1];
      MyGame.stateChanged = true;
    }
  }
  if (MyGame.keysPressed.ArrowLeft) {
    precisePosition[0] -= speed * delta;
    let absPostion = Math.round(precisePosition[0]);
    if (absPostion <= MyGame.grid.position[0] - 1) {
      MyGame.playerDirection = "LEFT";
      MyGame.grid.move4Block("LEFT");
      setBlockFromOrigin(MyGame, 3);
      precisePosition[0] = MyGame.grid.position[0];
      absPostion = MyGame.grid.position[0];
      MyGame.stateChanged = true;
    }
  }
  if (MyGame.keysPressed.ArrowRight) {
    precisePosition[0] += speed * delta;
    let absPostion = Math.round(precisePosition[0]);
    if (absPostion >= MyGame.grid.position[0] + 1) {
      MyGame.playerDirection = "RIGHT";
      MyGame.grid.move4Block("RIGHT");
      setBlockFromOrigin(MyGame, 2);
      precisePosition[0] = MyGame.grid.position[0];
      absPostion = MyGame.grid.position[0];
      MyGame.stateChanged = true;
    }
  }
}

function setBlockFromOrigin(MyGame: any, val: any) {
  MyGame.grid.set([...MyGame.grid.position], val);
  MyGame.grid.set([MyGame.grid.position[0] + 1, MyGame.grid.position[1]], val);
  MyGame.grid.set([MyGame.grid.position[0], MyGame.grid.position[1] + 1], val);
  MyGame.grid.set(
    [MyGame.grid.position[0] + 1, MyGame.grid.position[1] + 1],
    val
  );
}

function initTombs(ctx: CanvasRenderingContext2D): Tomb[] {
  let tombs = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col <= 5; col++) {
      tombs.push(new Tomb(col * 8 + 2, row * 6 + 4, ctx, spriteSheetImg));
    }
  }
  return tombs;
}

function initContext(): GameConfig {
  const canvas = document.getElementById("game-canvas")! as HTMLCanvasElement;
  if (!canvas.getContext) {
    throw new Error("No canvas found!");
  }
  const ctx = canvas.getContext("2d");
  return {
    stopMain: 0,
    ctx: ctx!,
    grid: new Grid(doubleArrayArray(initPlayfield())),
    stateChanged: true,
    playerDirection: "DOWN",
    tombs: initTombs(ctx!),
    keysPressed: {
      ArrowRight: false,
      ArrowLeft: false,
      ArrowUp: false,
      ArrowDown: false,
    },
  };
}

function keyboardInput() {
  // window.addEventListener("keydown", (event) => {
  //   handleKeyboardInput(event, MyGame, stopMain);
  // });

  window.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (MyGame.keysPressed.hasOwnProperty(e.code))
      MyGame.keysPressed[e.code] = true;
  });

  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (MyGame.keysPressed.hasOwnProperty(e.code))
      MyGame.keysPressed[e.code] = false;
  });
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // document ready
    keyboardInput();

    (() => {
      function main(tFrame?: number) {
        MyGame.stopMain = window.requestAnimationFrame(main);

        update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
        if (MyGame.stateChanged) {
          draw();
        }
        MyGame.stateChanged = false;
      }

      main(); // Start the cycle
    })();
  }
};
