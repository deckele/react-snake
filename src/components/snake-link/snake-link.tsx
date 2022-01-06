import { createPortal } from "react-dom";
import { SnakeNode } from "../../snake-linked-list";
import { getBoardTile, getSnakeTile } from "../../utils";

interface SnakeLinkProps {
  node: SnakeNode;
}
export function SnakeLink({ node }: SnakeLinkProps) {
  const container = document.getElementById(getBoardTile(node.coordiate));
  return container
    ? createPortal(
        <div
          id={getSnakeTile(node.coordiate)}
          className="bg-purple-500 absolute inset-px"
        />,
        container
      )
    : null;
}
