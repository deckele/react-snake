import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { createPortal } from "react-dom";
import { Coordinate } from "../../types";
import { getBoardTile } from "../../utils";

interface AppleProps {
  availableCoordinates?: Coordinate[];
}
export const Apple = forwardRef<Coordinate | null, AppleProps>(
  ({ availableCoordinates = [] }: AppleProps, ref) => {
    const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
    useEffect(() => {
      const chosenCoordinate =
        availableCoordinates[
          Math.floor(Math.random() * availableCoordinates.length)
        ];
      setCoordinate(chosenCoordinate);
    }, [availableCoordinates]);
    useImperativeHandle<Coordinate | null, Coordinate | null>(
      ref,
      () => coordinate,
      [coordinate]
    );
    const container =
      coordinate && document.getElementById(getBoardTile(coordinate));
    return container
      ? createPortal(
          <div className="bg-red-500 absolute inset-px rounded-full" />,
          container
        )
      : null;
  }
);
