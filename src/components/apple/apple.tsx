import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Coordinate } from "../../types";
import { getBoardTile } from "../../utils";

interface AppleProps {
  availableTiles: Coordinate[];
}
export function Apple({ availableTiles }: AppleProps) {
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  useEffect(() => {
    const chosenCoordinate =
      availableTiles[Math.floor(Math.random() * availableTiles.length)];
    setCoordinate(chosenCoordinate);
  }, [availableTiles]);
  const container =
    coordinate && document.getElementById(getBoardTile(coordinate));
  return container ? createPortal(<div>apple</div>, container) : null;
}
