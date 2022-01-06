import { createPortal } from "react-dom";
import { SnakeNode } from "../../snake-linked-list";
import { Direction, getBoardTile, getSnakeTile } from "../../utils";
import { ReactComponent as SnakeHead } from "../../assets/snake-head.svg";

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
      className="absolute inset-px flex justify-center items-center"
    >
      <SnakeHead className={`${directionToRotation[direction]} scale-125`} />
    </div>
  ) : (
    <div
      id={getSnakeTile(node.coordiate)}
      className={`${
        isEven ? "bg-green-500" : "bg-green-700"
      } absolute inset-px rounded-lg scale-110`}
    />
  );

  return container ? createPortal(SnakeNode, container) : null;
}
