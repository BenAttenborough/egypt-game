function setBlockFromOrigin(MyGame: any, val: any) {
  if (val === 4) {
    // UP
    MyGame.grid.set(
      [MyGame.player.position[0], MyGame.player.position[1] + 2],
      val
    );
    MyGame.grid.set(
      [MyGame.player.position[0] + 1, MyGame.player.position[1] + 2],
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
      [MyGame.player.position[0] + 2, MyGame.player.position[1]],
      val
    );
    MyGame.grid.set(
      [MyGame.player.position[0] + 2, MyGame.player.position[1] + 1],
      val
    );
  }

  if (val === 2) {
    // RIGHT
    MyGame.grid.set(
      [MyGame.player.position[0] - 1, MyGame.player.position[1]],
      val
    );
    MyGame.grid.set(
      [MyGame.player.position[0] - 1, MyGame.player.position[1] + 1],
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
    if (MyGame.grid.canMove(MyGame.player.position, "UP")) {
      MyGame.player.precisePosition[1] -= MyGame.speed * delta;
      let absPostion = Math.round(MyGame.player.precisePosition[1]);
      if (absPostion <= MyGame.player.position[1] - 1) {
        MyGame.playerDirection = "UP";
        MyGame.player.position[1] = absPostion;
        setBlockFromOrigin(MyGame, 4);
        MyGame.stateChanged = true;
      }
    }
  }

  // DOWN
  if (MyGame.keysPressed.ArrowDown) {
    if (MyGame.grid.canMove(MyGame.player.position, "DOWN")) {
      MyGame.player.precisePosition[1] += MyGame.speed * delta;
      let absPostion = Math.round(MyGame.player.precisePosition[1]);
      if (absPostion >= MyGame.player.position[1] + 1) {
        MyGame.playerDirection = "DOWN";
        MyGame.player.position[1] = absPostion;
        setBlockFromOrigin(MyGame, 5);
        MyGame.stateChanged = true;
      }
    }
  }

  // LEFT
  if (MyGame.keysPressed.ArrowLeft) {
    if (MyGame.grid.canMove(MyGame.player.position, "LEFT")) {
      MyGame.player.precisePosition[0] -= MyGame.speed * delta;
      let absPostion = Math.round(MyGame.player.precisePosition[0]);
      if (absPostion <= MyGame.player.position[0] - 1) {
        MyGame.playerDirection = "LEFT";
        MyGame.player.position[0] = absPostion;
        setBlockFromOrigin(MyGame, 3);
        MyGame.stateChanged = true;
      }
    }
  }

  // RIGHT
  if (MyGame.keysPressed.ArrowRight) {
    if (MyGame.grid.canMove(MyGame.player.position, "RIGHT")) {
      MyGame.player.precisePosition[0] += MyGame.speed * delta;
      let absPostion = Math.round(MyGame.player.precisePosition[0]);
      if (absPostion >= MyGame.player.position[0] + 1) {
        MyGame.playerDirection = "RIGHT";
        MyGame.player.position[0] = absPostion;
        setBlockFromOrigin(MyGame, 2);
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
