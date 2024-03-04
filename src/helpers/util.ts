function doubleArray(arr: number[]): number[] {
  return arr.reduce((prev: number[], cur) => {
    return prev.concat([cur, cur]);
  }, []);
}

export function doubleArrayArray(arr: number[][]): number[][] {
  return arr.reduce((prev: number[][], cur) => {
    return prev.concat([doubleArray(cur), doubleArray(cur)]);
  }, []);
}
