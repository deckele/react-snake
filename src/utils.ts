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
export function hashXY([x, y]: Coordinate) {
  return `x${x}y${y}`;
}

export function getSnakeTile(coordinate: Coordinate) {
  return `snake-${hashXY(coordinate)}`;
}

export function getBoardTile(coordinate: Coordinate) {
  return `board-${hashXY(coordinate)}`;
}

export function areCoordinatesEqual(
  [x1, y1]: Coordinate,
  [x2, y2]: Coordinate
): boolean {
  return x1 === x2 && y1 === y2;
}
