import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  FC,
} from "react";
import { createPortal } from "react-dom";
import { Coordinate } from "../../types";
import { getBoardTile } from "../../utils";
import { ReactComponent as Apple1 } from "../../assets/apple1.svg";
import { ReactComponent as Apple2 } from "../../assets/apple2.svg";
import { ReactComponent as Apple3 } from "../../assets/apple3.svg";
import { ReactComponent as Apple4 } from "../../assets/apple4.svg";
import { ReactComponent as Apple5 } from "../../assets/apple5.svg";
import { ReactComponent as Apple6 } from "../../assets/apple6.svg";
import { ReactComponent as Apple7 } from "../../assets/apple7.svg";
import { ReactComponent as Apple8 } from "../../assets/apple8.svg";
import { ReactComponent as Apple9 } from "../../assets/apple9.svg";
import { ReactComponent as Apple10 } from "../../assets/apple10.svg";

type IconElement = FC<React.SVGProps<SVGSVGElement>>;
const apples: IconElement[] = [
  Apple1,
  Apple2,
  Apple3,
  Apple4,
  Apple5,
  Apple6,
  Apple7,
  Apple8,
  Apple9,
  Apple10,
];

interface AppleProps {
  availableCoordinates?: Coordinate[];
}
export const Apple = forwardRef<Coordinate | null, AppleProps>(
  ({ availableCoordinates = [] }: AppleProps, ref) => {
    const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
    const [AppleIcon, setAppleIcon] = useState<IconElement | null>(null);

    useEffect(() => {
      const chosenCoordinate =
        availableCoordinates[
          Math.floor(Math.random() * availableCoordinates.length)
        ];
      setCoordinate(chosenCoordinate);
      setAppleIcon(apples[Math.floor(Math.random() * apples.length)]);
    }, [availableCoordinates]);
    useImperativeHandle<Coordinate | null, Coordinate | null>(
      ref,
      () => coordinate,
      [coordinate]
    );
    const container =
      coordinate && document.getElementById(getBoardTile(coordinate));
    return container && AppleIcon
      ? createPortal(
          <div className="absolute inset-px flex justify-center items-center">
            <AppleIcon className="w-5/6 h-5/6" />
          </div>,
          container
        )
      : null;
  }
);
