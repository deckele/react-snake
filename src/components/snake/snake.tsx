import { useLayoutEffect, useState } from "react";
import { SnakeLinkedList, SnakeNode } from "../../snake-linked-list";
import { SnakeLink } from "../snake-link/snake-link";

interface SnakeProps {
  initialNodes?: SnakeNode[];
}
const DEFAULT_INITIAL_NODES = [
  new SnakeNode(0, 5),
  new SnakeNode(1, 5),
  new SnakeNode(2, 5),
];

export function Snake({ initialNodes = DEFAULT_INITIAL_NODES }: SnakeProps) {
  const [snake, setSnake] = useState<SnakeLinkedList | null>(null);
  useLayoutEffect(() => {
    setSnake(SnakeLinkedList.from(initialNodes, () => {}));
  }, [initialNodes]);
  return (
    <>
      {snake
        ? [...snake].map((node) => (
            <SnakeLink key={node.toString()} node={node} />
          ))
        : null}
    </>
  );
}
