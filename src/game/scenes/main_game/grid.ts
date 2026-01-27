export class Grid {
  content: number[][];
  constructor(content: any) {
    this.content = content;
  }

  get([x, y]: Point): any {
    // console.log("this.content [1]: " + this.content[1][1]);
    return this.content[y]?.[x];
  }

  //   getRow(row: number): any[] {
  //     return this.content[row];
  //   }

  //   getCurrent(): any {
  //     return this.get(this.position);
  //   }

  //   set([x, y]: Point, data: any) {
  //     this.content[y][x] = data;
  //   }

  //   map(func: (x: number) => number[][]): Grid {
  //     const newContent = this.content.map((row) => row.map(func));
  //     return new Grid(newContent);
  //   }

  //   forEach(func: (value: any, x?: number, y?: number) => void) {
  //     this.content.forEach((row, rowIdx) => {
  //       row.forEach((value, colIdx) => {
  //         func(value, colIdx, rowIdx);
  //       });
  //     });
  //   }

  //   reduce(
  //     rowReducer: (arr: any[]) => any,
  //     gridReducer: (grid: any[]) => any
  //   ): any {
  //     return this.content
  //       .map((row) => rowReducer(row))
  //       .map((values) => gridReducer(values));
  //   }

  //   private checkPosition(pos: Point): boolean {
  //     if (this.getRow(pos[1]) && this.get(pos)) {
  //       return true;
  //     }
  // private checkPosition(pos1: Point, pos2: Point): boolean {
  //     if (this.get(pos1) && this.get(pos2)) {
  //       return true;
  //     }
  // }
  //     return false;
  //   }

  //   setPosition([x, y]: Point) {
  //     this.position = [y, x];
  //   }

  //   canMove(direction: Direction, position: Point): boolean {
  //     let proposedPosition: Point = position;
  //     switch (direction) {
  //       case "UP":
  //         proposedPosition[1] -= 1;
  //         break;
  //       case "DOWN":
  //         proposedPosition[1] += 1;
  //         break;
  //       case "LEFT":
  //         proposedPosition[0] -= 1;
  //         break;
  //       case "RIGHT":
  //         proposedPosition[0] += 1;
  //         break;
  //     }

  //     return this.checkPosition(proposedPosition);
  //   }

  canMove(position: Point, direction: Direction): boolean {
    // Player take up four cells so we must check two cells when moving

    // let proposedPosition: Point = [...this.position];
    // let colliderA: Point = [...this.position];
    // let colliderB: Point = [...this.position];
    // let moved: boolean = false;

    let colliderA: Point;
    let colliderB: Point;

    switch (direction) {
      case "UP":
        colliderA = [position[0], position[1] - 1];
        colliderB = [position[0] + 1, position[1] - 1];
        return this.get(colliderA) && this.get(colliderB);
      case "DOWN":
        colliderA = [position[0], position[1] + 2];
        colliderB = [position[0] + 1, position[1] + 2];
        return this.get(colliderA) && this.get(colliderB);
      case "LEFT":
        colliderA = [position[0] - 1, position[1]];
        colliderB = [position[0] - 1, position[1] + 1];
        return this.get(colliderA) && this.get(colliderB);
      case "RIGHT":
        colliderA = [position[0] + 2, position[1]];
        colliderB = [position[0] + 2, position[1] + 1];
        return this.get(colliderA) && this.get(colliderB);
    }
  }

  //   findFirst(needle: any): Point {
  //     for (let y = 0; y < this.content.length; y++) {
  //       for (let x = 0; x < this.content[y].length; x++) {
  //         if (this.content[y][x] === needle) {
  //           return [y, x];
  //         }
  //       }
  //     }
  //     throw new Error(`${needle} does not exist in grid`);
  //   }

  //   pushIf(arr: any[], value: any) {
  //     if (value !== undefined) {
  //       arr.push(value);
  //     }
  //   }

  //   getOrthogonalValues([x, y]: Point): any[] {
  //     let values: any = [];
  //     this.pushIf(values, this.get([x, y - 1]));
  //     this.pushIf(values, this.get([x + 1, y]));
  //     this.pushIf(values, this.get([x, y + 1]));
  //     this.pushIf(values, this.get([x - 1, y]));

  //     return values;
  //   }

  //   getOrthogonalValuesFromCurrentPosition(): any[] {
  //     return this.getOrthogonalValues(this.position);
  //   }
}
