import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface AppleProps {
  availableTiles: string[];
}
export function Apple({ availableTiles }: AppleProps) {
  const [chosenTile, setChosenTile] = useState<string | null>(null);
  useEffect(() => {
    const chosenTile =
      availableTiles[Math.floor(Math.random() * availableTiles.length)];
    setChosenTile(chosenTile);
  }, [availableTiles]);
  const container =
    chosenTile && document.getElementById(`board-${chosenTile}`);
  return container ? createPortal(<div>apple</div>, container) : null;
}
