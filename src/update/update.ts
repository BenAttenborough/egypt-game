export function mummyMovement(myGame: GameConfig, delta: number) {
  myGame.mummies.forEach((mummy) => {
    // if (isAtIntersection(mummy.position)) {
    //   if (!mummy.isMovingFromIntersection) {
    //     mummy.direction = pickRandomDirection();
    //     mummy.isMovingFromIntersection = true;
    //   }
    // } else {
    //   mummy.isMovingFromIntersection = false;
    // }
    if (mummy.direction == "LEFT") {
      if (myGame.grid.canMove(mummy.position, "LEFT")) {
        mummy.precisePosition[0] -= myGame.speed * delta;
        let absPostion = Math.round(mummy.precisePosition[0]);
        if (absPostion <= mummy.position[0] - 1) {
          mummy.position[0] = absPostion;
          mummy.precisePosition[0] = absPostion;
          myGame.stateChanged = true;
          console.log(mummy.position);
        }
      }
    }
    if (mummy.direction == "RIGHT") {
      if (myGame.grid.canMove(mummy.position, "RIGHT")) {
        mummy.precisePosition[0] += myGame.speed * delta;
        let absPostion = Math.round(mummy.precisePosition[0]);
        if (absPostion <= mummy.position[0] + 1) {
          mummy.position[0] = absPostion;
          mummy.precisePosition[0] = absPostion;
          myGame.stateChanged = true;
          console.log(mummy.position);
        }
      }
    }
    if (mummy.direction == "UP") {
      if (myGame.grid.canMove(mummy.position, "UP")) {
        mummy.precisePosition[1] -= myGame.speed * delta;
        let absPostion = Math.round(mummy.precisePosition[1]);
        if (absPostion <= mummy.position[1] - 1) {
          mummy.position[1] = absPostion;
          mummy.precisePosition[1] = absPostion;
          myGame.stateChanged = true;
          console.log(mummy.position);
        }
      }
    }
    if (mummy.direction == "DOWN") {
      if (myGame.grid.canMove(mummy.position, "DOWN")) {
        mummy.precisePosition[1] += myGame.speed * delta;
        let absPostion = Math.round(mummy.precisePosition[1]);
        if (absPostion <= mummy.position[1] + 1) {
          mummy.position[1] = absPostion;
          mummy.precisePosition[1] = absPostion;
          myGame.stateChanged = true;
          console.log(mummy.position);
        }
      }
    }
  });
}

function isAtIntersection([x, y]: Point): Boolean {
  return (
    (x === 0 || x === 8 || x === 16 || x === 24 || x === 32 || x === 40) &&
    (y === 4 || y === 10 || y === 16 || y === 22 || y === 28)
  );
}

function pickRandomDirection(): Direction {
  const choice = Math.floor(Math.random() * 4) + 1;
  switch (choice) {
    case 1:
      return "UP";
    case 2:
      return "DOWN";
    case 3:
      return "LEFT";
    default:
      return "RIGHT";
  }
}
