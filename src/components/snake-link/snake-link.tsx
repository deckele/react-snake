import { createPortal } from "react-dom";
import { SnakeNode } from "../../snake-linked-list";
import { Direction, getBoardTile, getSnakeTile } from "../../utils";
import SnakeHead from "../../assets/snake-head.png";

interface SnakeLinkProps {
  node: SnakeNode;
  direction: Direction;
  isHead: boolean;
  isEven: boolean;
}
const directionToRotation: Record<Direction, string> = {
  [Direction.down]: "rotate-0",
  [Direction.left]: "rotate-90",
  [Direction.up]: "rotate-180",
  [Direction.right]: "-rotate-90",
};
export function SnakeLink({ node, direction, isHead, isEven }: SnakeLinkProps) {
  const container = document.getElementById(getBoardTile(node.coordiate));
  const SnakeNode = isHead ? (
    <div
      id={getSnakeTile(node.coordiate)}
      className="absolute -inset-2 flex justify-center items-center"
    >
      <img
        src={SnakeHead}
        alt="snake-head"
        className={`${directionToRotation[direction]}`}
      />
    </div>
  ) : (
    <div
      id={getSnakeTile(node.coordiate)}
      className={`${
        isEven ? "bg-green-500" : "bg-green-700"
      } absolute inset-0 rounded-lg border-2 scale-105 border-black`}
    />
  );

  return container ? createPortal(SnakeNode, container) : null;
}
