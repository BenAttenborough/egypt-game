function setBlockFromOrigin(MyGame: any, val: any) {
  if (val === 4) {
    // UP
    MyGame.grid.set(
      [MyGame.grid.position[0], MyGame.grid.position[1] + 2],
      val
    );
    MyGame.grid.set(
      [MyGame.grid.position[0] + 1, MyGame.grid.position[1] + 2],
      val
    );
  }

  if (val === 5) {
    // DOWN
    MyGame.grid.set(
      [MyGame.grid.position[0], MyGame.grid.position[1] - 1],
      val
    );
    MyGame.grid.set(
      [MyGame.grid.position[0] + 1, MyGame.grid.position[1] - 1],
      val
    );
  }

  if (val === 3) {
    // LEFT
    MyGame.grid.set(
      [MyGame.grid.position[0] + 2, MyGame.grid.position[1]],
      val
    );
    MyGame.grid.set(
      [MyGame.grid.position[0] + 2, MyGame.grid.position[1] + 1],
      val
    );
  }

  if (val === 2) {
    // RIGHT
    MyGame.grid.set(
      [MyGame.grid.position[0] - 1, MyGame.grid.position[1]],
      val
    );
    MyGame.grid.set(
      [MyGame.grid.position[0] - 1, MyGame.grid.position[1] + 1],
      val
    );
  }
}

export function handleKeyboardInput(
  MyGame: GameConfig,
  delta: number
  // stopMain: () => void
) {
  // if (key === "Enter") {
  //   console.log("Enter");
  //   console.log(MyGame.stopMain);
  //   stopMain;
  // }
  if (MyGame.keysPressed.ArrowUp) {
    MyGame.precisePosition[1] -= MyGame.speed * delta;
    let absPostion = Math.round(MyGame.precisePosition[1]);
    if (absPostion <= MyGame.grid.position[1] - 1) {
      MyGame.playerDirection = "UP";
      MyGame.grid.move4Block("UP");
      setBlockFromOrigin(MyGame, 4);
      MyGame.precisePosition[1] = MyGame.grid.position[1];
      absPostion = MyGame.grid.position[1];
      MyGame.stateChanged = true;
    }
  }
  if (MyGame.keysPressed.ArrowDown) {
    MyGame.precisePosition[1] += MyGame.speed * delta;
    let absPostion = Math.round(MyGame.precisePosition[1]);
    if (absPostion >= MyGame.grid.position[1] + 1) {
      MyGame.playerDirection = "DOWN";
      MyGame.grid.move4Block("DOWN");
      setBlockFromOrigin(MyGame, 5);
      MyGame.precisePosition[1] = MyGame.grid.position[1];
      absPostion = MyGame.grid.position[1];
      MyGame.stateChanged = true;
    }
  }
  if (MyGame.keysPressed.ArrowLeft) {
    MyGame.precisePosition[0] -= MyGame.speed * delta;
    let absPostion = Math.round(MyGame.precisePosition[0]);
    if (absPostion <= MyGame.grid.position[0] - 1) {
      MyGame.playerDirection = "LEFT";
      MyGame.grid.move4Block("LEFT");
      setBlockFromOrigin(MyGame, 3);
      MyGame.precisePosition[0] = MyGame.grid.position[0];
      absPostion = MyGame.grid.position[0];
      MyGame.stateChanged = true;
    }
  }
  if (MyGame.keysPressed.ArrowRight) {
    MyGame.precisePosition[0] += MyGame.speed * delta;
    let absPostion = Math.round(MyGame.precisePosition[0]);
    if (absPostion >= MyGame.grid.position[0] + 1) {
      MyGame.playerDirection = "RIGHT";
      MyGame.grid.move4Block("RIGHT");
      setBlockFromOrigin(MyGame, 2);
      MyGame.precisePosition[0] = MyGame.grid.position[0];
      absPostion = MyGame.grid.position[0];
      MyGame.stateChanged = true;
    }
  }
}
