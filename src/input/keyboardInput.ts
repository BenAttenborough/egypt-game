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
  // if (MyGame.keysPressed.ArrowUp) {
  //   console.log("UP");
  //   MyGame.precisePosition[1] -= MyGame.speed * delta;
  //   let absPostion = Math.round(MyGame.precisePosition[1]);
  //   if (absPostion <= MyGame.grid.position[1] - 1) {
  //     MyGame.playerDirection = "UP";
  //     if (MyGame.grid.move4Block("UP")) {
  //       setBlockFromOrigin(MyGame, 4);
  //       MyGame.precisePosition[1] = MyGame.grid.position[1];
  //       absPostion = MyGame.grid.position[1];
  //       MyGame.stateChanged = true;
  //     }
  //   }
  // }
  if (MyGame.keysPressed.ArrowDown) {
    MyGame.player.precisePosition[1] += MyGame.speed * delta;
    let absPostion = Math.round(MyGame.player.precisePosition[1]);
    // console.log("precisePosition", MyGame.player.precisePosition[1])
    console.log("absPostion", absPostion)
    
    console.log("MyGame.player.position[1]", MyGame.player.position[1])

    if (absPostion >= MyGame.player.position[1] + 1) {
      MyGame.player.position[1] = absPostion
      MyGame.stateChanged = true;
    }

    // if (absPostion >= MyGame.player.position[1] + 1) {
    //   MyGame.playerDirection = "DOWN";
    //   console.log("Moving down");
    //   if (MyGame.grid.canMove(MyGame.player.position, "DOWN")) {
    //     console.log("Can move down");
    //     setBlockFromOrigin(MyGame, 5);
    //     MyGame.player.precisePosition[1] = MyGame.player.position[1];
    //     console.log("Position", MyGame.player.position[1])
    //     console.log("Precise Position", MyGame.player.precisePosition[1])
    //     absPostion = MyGame.player.position[1];
    //     MyGame.stateChanged = true;
    //   }
    // }
  }
  // if (MyGame.keysPressed.ArrowLeft) {
  //   MyGame.precisePosition[0] -= MyGame.speed * delta;
  //   let absPostion = Math.round(MyGame.precisePosition[0]);
  //   if (absPostion <= MyGame.grid.position[0] - 1) {
  //     MyGame.playerDirection = "LEFT";
  //     if (MyGame.grid.move4Block("LEFT")) {
  //       setBlockFromOrigin(MyGame, 3);
  //       MyGame.precisePosition[0] = MyGame.grid.position[0];
  //       absPostion = MyGame.grid.position[0];
  //       MyGame.stateChanged = true;
  //     }
  //   }
  // }
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
