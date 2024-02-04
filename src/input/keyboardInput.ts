function setBlockFromOrigin(MyGame: any, val: any) {
  MyGame.grid.set([...MyGame.grid.position], val);
  MyGame.grid.set([MyGame.grid.position[0] + 1, MyGame.grid.position[1]], val);
  MyGame.grid.set([MyGame.grid.position[0], MyGame.grid.position[1] + 1], val);
  MyGame.grid.set(
    [MyGame.grid.position[0] + 1, MyGame.grid.position[1] + 1],
    val
  );
}

export function handleKeyboardInput(
  event: KeyboardEvent,
  MyGame: GameConfig,
  stopMain: () => void
) {
  if (event.code === "Enter") {
    console.log("Enter");
    console.log(MyGame.stopMain);
    stopMain;
  }
  if (event.code === "ArrowUp") {
    MyGame.playerDirection = "UP";
    MyGame.grid.move4Block("UP");
    setBlockFromOrigin(MyGame, 4);
    MyGame.stateChanged = true;
  }
  if (event.code === "ArrowRight") {
    MyGame.playerDirection = "RIGHT";
    MyGame.grid.move4Block("RIGHT");
    setBlockFromOrigin(MyGame, 2);
    MyGame.stateChanged = true;
  }
  if (event.code === "ArrowDown") {
    MyGame.playerDirection = "DOWN";
    MyGame.grid.move4Block("DOWN");
    setBlockFromOrigin(MyGame, 5);
    MyGame.stateChanged = true;
  }
  if (event.code === "ArrowLeft") {
    MyGame.playerDirection = "LEFT";
    MyGame.grid.move4Block("LEFT");
    setBlockFromOrigin(MyGame, 3);
    MyGame.stateChanged = true;
  }
}
