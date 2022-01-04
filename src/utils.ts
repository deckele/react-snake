import { Coordinate } from "./types";

export enum Direction {
  up = 0,
  down = 1,
  right = 2,
  left = 3,
}
export const keyToDirection: Record<string, Direction> = {
  ArrowUp: Direction.up,
  ArrowDown: Direction.down,
  ArrowRight: Direction.right,
  ArrowLeft: Direction.left,
  w: Direction.up,
  s: Direction.down,
  d: Direction.right,
  a: Direction.left,
};
const currentToNextValidDirection: Record<
  Direction,
  Record<Direction, boolean>
> = {
  [Direction.up]: {
    [Direction.up]: false,
    [Direction.down]: false,
    [Direction.right]: true,
    [Direction.left]: true,
  },
  [Direction.down]: {
    [Direction.up]: false,
    [Direction.down]: false,
    [Direction.right]: true,
    [Direction.left]: true,
  },
  [Direction.right]: {
    [Direction.up]: true,
    [Direction.down]: true,
    [Direction.right]: false,
    [Direction.left]: false,
  },
  [Direction.left]: {
    [Direction.up]: true,
    [Direction.down]: true,
    [Direction.right]: false,
    [Direction.left]: false,
  },
};
export function canGoToNextDirection(
  currentDirection: Direction,
  nextDirection: Direction
): boolean {
  return currentToNextValidDirection[currentDirection][nextDirection];
}
export function hashXY(x: number, y: number) {
  return `x${x}y${y}`;
}

export function getSnakeTile(x: number, y: number) {
  return `snake-${hashXY(x, y)}`;
}

export function getBoardTile(x: number, y: number) {
  return `board-${hashXY(x, y)}`;
}
