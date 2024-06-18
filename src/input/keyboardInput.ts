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
      [MyGame.player.position[0], MyGame.player.position[1] - 1],
      val
    );
    MyGame.grid.set(
      [MyGame.player.position[0] + 1, MyGame.player.position[1] - 1],
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

  // UP
  if (MyGame.keysPressed.ArrowUp) {
    MyGame.player.precisePosition[1] -= MyGame.speed * delta;
    let absPostion = Math.round(MyGame.player.precisePosition[1]);
    if (absPostion >= MyGame.player.position[1] - 1) {
      if (MyGame.grid.canMove(MyGame.player.position, "UP")) {
        MyGame.playerDirection = "UP";
        MyGame.player.position[1] = absPostion;
        MyGame.stateChanged = true;
      }
    }
  }

  // DOWN
  if (MyGame.keysPressed.ArrowDown) {
    MyGame.player.precisePosition[1] += MyGame.speed * delta;
    let absPostion = Math.round(MyGame.player.precisePosition[1]);
    if (absPostion >= MyGame.player.position[1] + 1) {
      if (MyGame.grid.canMove(MyGame.player.position, "DOWN")) {
        MyGame.playerDirection = "DOWN";
        MyGame.player.position[1] = absPostion;
        MyGame.stateChanged = true;
      }
    }
  }

  // LEFT
  if (MyGame.keysPressed.ArrowLeft) {
    MyGame.player.precisePosition[0] -= MyGame.speed * delta;
    let absPostion = Math.round(MyGame.player.precisePosition[0]);
    if (absPostion >= MyGame.player.position[0] - 1) {
      if (MyGame.grid.canMove(MyGame.player.position, "LEFT")) {
        MyGame.playerDirection = "LEFT";
        MyGame.player.position[0] = absPostion;
        MyGame.stateChanged = true;
      }
    }
  }

  // RIGHT
  if (MyGame.keysPressed.ArrowRight) {
    MyGame.player.precisePosition[0] += MyGame.speed * delta;
    let absPostion = Math.round(MyGame.player.precisePosition[0]);
    if (absPostion >= MyGame.player.position[0] + 1) {
      if (MyGame.grid.canMove(MyGame.player.position, "RIGHT")) {
        MyGame.playerDirection = "RIGHT";

        MyGame.player.position[0] = absPostion;
        MyGame.stateChanged = true;
      }
    }
  }

  // if (MyGame.keysPressed.ArrowRight) {
  //   MyGame.precisePosition[0] += MyGame.speed * delta;
  //   let absPostion = Math.round(MyGame.precisePosition[0]);
  //   if (absPostion >= MyGame.grid.position[0] + 1) {
  //     MyGame.playerDirection = "RIGHT";
  //     if (MyGame.grid.move4Block("RIGHT")) {
  //       setBlockFromOrigin(MyGame, 2);
  //       MyGame.precisePosition[0] = MyGame.grid.position[0];
  //       absPostion = MyGame.grid.position[0];
  //       MyGame.stateChanged = true;
  //     }
  //   }
  // }
}
