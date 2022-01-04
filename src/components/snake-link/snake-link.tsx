import { createPortal } from "react-dom";
import { SnakeNode } from "../../snake-linked-list";

interface SnakeLinkProps {
  node: SnakeNode;
}
export function SnakeLink({ node }: SnakeLinkProps) {
  return createPortal(
    <div
      id={`snake-${node}`}
      className="bg-purple-500 absolute top-1 bottom-1 left-1 right-1"
    />,
    document.getElementById(`board-${node}`)!
  );
}
