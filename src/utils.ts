export enum Direction {
  north = 0,
  east = 1,
  south = 2,
  west = 3,
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
