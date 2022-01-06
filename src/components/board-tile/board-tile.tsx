import { Coordinate } from "../../types";
import { getBoardTile } from "../../utils";

interface BoardTileProps {
  coordinate: Coordinate;
}
export function BoardTile({ coordinate }: BoardTileProps) {
  return (
    <div id={getBoardTile(coordinate)} className="bg-amber-700 relative" />
  );
}
