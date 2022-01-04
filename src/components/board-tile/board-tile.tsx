import { hashXY } from "../../utils";

interface BoardTileProps {
  x: number;
  y: number;
}
export function BoardTile({ x, y }: BoardTileProps) {
  return <div id={`board-${hashXY(x, y)}`} className="bg-blue-600 relative" />;
}
