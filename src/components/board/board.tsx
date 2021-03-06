import { useLayoutEffect, useMemo } from "react";
import { getBoardTile } from "../../utils";
import { BoardTile } from "../board-tile/board-tile";

interface BoardProps {
  size: number;
}
export function Board({ size }: BoardProps) {
  const board = useMemo(() => {
    return Array.from({ length: size }, (_, y) =>
      Array.from({ length: size }, (_, x) => (
        <BoardTile key={getBoardTile([x, y])} coordinate={[x, y]} />
      ))
    );
  }, [size]);
  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--board-size", String(size));
  }, [size]);
  return (
    <div className="p-4 w-96 h-96 grid grid-cols-[repeat(var(--board-size),_1fr)] gap-1">
      {board}
    </div>
  );
}
