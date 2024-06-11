export class Grid {
  content: any[][];
  // position: Point;
  // constructor(content: any, position?: Point) {
  constructor(content: any) {
    this.content = content;
    // this.position = position || [0, 0];
  }

  get([x, y]: Point): any {
    return this.content[y]?.[x];
  }

  getRow(row: number): any[] {
    return this.content[row];
  }

  // getCurrent(): any {
  //   return this.get(this.position);
  // }

  set([x, y]: Point, data: any) {
    this.content[y][x] = data;
  }

  map(func: (x: any) => any[][]): Grid {
    const newContent = this.content.map((row) => row.map(func));
    // return new Grid(newContent, this.position);
    return new Grid(newContent);
  }

  forEach(func: (value: any, x?: number, y?: number) => void) {
    this.content.forEach((row, rowIdx) => {
      row.forEach((value, colIdx) => {
        func(value, colIdx, rowIdx);
      });
    });
  }

  reduce(
    rowReducer: (arr: any[]) => any,
    gridReducer: (grid: any[]) => any
  ): any {
    return this.content
      .map((row) => rowReducer(row))
      .map((values) => gridReducer(values));
  }

  private checkPosition(pos: Point): boolean {
    if (this.getRow(pos[1]) && this.get(pos)) {
      return true;
    }

    return false;
  }

  // setPosition([x, y]: Point) {
  //   this.position = [y, x];
  // }

  // move(direction: Direction) {
  //   let proposedPosition: Point = [...this.position];
  //   switch (direction) {
  //     case "UP":
  //       proposedPosition[1] -= 1;
  //       break;
  //     case "DOWN":
  //       proposedPosition[1] += 1;
  //       break;
  //     case "LEFT":
  //       proposedPosition[0] -= 1;
  //       break;
  //     case "RIGHT":
  //       proposedPosition[0] += 1;
  //       break;
  //   }

  //   if (this.checkPosition(proposedPosition)) {
  //     this.position = proposedPosition;
  //   }
  // }

  canMove(position: Point, direction: Direction): boolean {
    let proposedPosition: Point = [...position];
    let colliderA: Point = [...position];
    let colliderB: Point = [...position];
    let moved: boolean = false;

    switch (direction) {
      case "UP":
        colliderA = [proposedPosition[0], proposedPosition[1] - 1];
        colliderB = [proposedPosition[0] + 1, proposedPosition[1] - 1];
        if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
          proposedPosition[1] -= 1;
          moved = true;
        }
        break;

      case "DOWN":
        colliderA = [proposedPosition[0], proposedPosition[1] + 2];
        colliderB = [proposedPosition[0] + 1, proposedPosition[1] + 2];
        if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
          proposedPosition[1] += 1;
          moved = true;
        }
        break;
      case "LEFT":
        colliderA = [proposedPosition[0] - 1, proposedPosition[1]];
        colliderB = [proposedPosition[0] - 1, proposedPosition[1] + 1];
        if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
          proposedPosition[0] -= 1;
          moved = true;
        }
        break;
      case "RIGHT":
        colliderA = [proposedPosition[0] + 2, proposedPosition[1]];
        colliderB = [proposedPosition[0] + 2, proposedPosition[1] + 1];
        if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
          proposedPosition[0] += 1;
          moved = true;
        }
        break;
    }

    return moved;
  }

  // move4Block(direction: Direction): boolean {
  //   let proposedPosition: Point = [...this.position];
  //   let colliderA: Point = [...this.position];
  //   let colliderB: Point = [...this.position];
  //   let moved: boolean = false;

  //   switch (direction) {
  //     case "UP":
  //       colliderA = [proposedPosition[0], proposedPosition[1] - 1];
  //       colliderB = [proposedPosition[0] + 1, proposedPosition[1] - 1];
  //       if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
  //         proposedPosition[1] -= 1;
  //         moved = true;
  //       }
  //       break;
  //     case "DOWN":
  //       colliderA = [proposedPosition[0], proposedPosition[1] + 2];
  //       colliderB = [proposedPosition[0] + 1, proposedPosition[1] + 2];
  //       if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
  //         proposedPosition[1] += 1;
  //         moved = true;
  //       }
  //       break;
  //     case "LEFT":
  //       colliderA = [proposedPosition[0] - 1, proposedPosition[1]];
  //       colliderB = [proposedPosition[0] - 1, proposedPosition[1] + 1];
  //       if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
  //         proposedPosition[0] -= 1;
  //         moved = true;
  //       }
  //       break;
  //     case "RIGHT":
  //       colliderA = [proposedPosition[0] + 2, proposedPosition[1]];
  //       colliderB = [proposedPosition[0] + 2, proposedPosition[1] + 1];
  //       if (this.checkPosition(colliderA) && this.checkPosition(colliderB)) {
  //         proposedPosition[0] += 1;
  //         moved = true;
  //       }
  //       break;
  //   }

  //   this.position = proposedPosition;
  //   return moved;
  // }

  // findFirst(needle: any): Point {
  //   for (let y = 0; y < this.content.length; y++) {
  //     for (let x = 0; x < this.content[y].length; x++) {
  //       if (this.content[y][x] === needle) {
  //         return [y, x];
  //       }
  //     }
  //   }
  //   throw new Error(`${needle} does not exist in grid`);
  // }

  // pushIf(arr: any[], value: any) {
  //   if (value !== undefined) {
  //     arr.push(value);
  //   }
  // }

  // getOrthogonalValues([x, y]: Point): any[] {
  //   let values: any = [];
  //   this.pushIf(values, this.get([x, y - 1]));
  //   this.pushIf(values, this.get([x + 1, y]));
  //   this.pushIf(values, this.get([x, y + 1]));
  //   this.pushIf(values, this.get([x - 1, y]));

  //   // values.push(this.get([x + 1, y]));
  //   // values.push(this.get([x, y - 1]));
  //   // values.push(this.get([x, y + 1]));
  //   // values.push(this.get([x - 1, y]));

  //   return values;
  // }

  // getOrthogonalValuesFromCurrentPosition(): any[] {
  //   return this.getOrthogonalValues(this.position);
  // }
}
