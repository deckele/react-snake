import { useImperativeHandle } from "react";
import { useLayoutEffect, useState, forwardRef } from "react";
import { SnakeLinkedList, SnakeNode } from "../../snake-linked-list";
import { SnakeLink } from "../snake-link/snake-link";

interface SnakeProps {
  initialNodes: SnakeNode[];
  onCollision: () => void;
}

export const Snake = forwardRef<SnakeLinkedList | null, SnakeProps>(
  ({ initialNodes, onCollision }: SnakeProps, ref) => {
    const [snake, setSnake] = useState<SnakeLinkedList | null>(null);
    useLayoutEffect(() => {
      setSnake((prevSnake) =>
        SnakeLinkedList.from(prevSnake || initialNodes, onCollision)
      );
    }, [initialNodes, onCollision]);
    useImperativeHandle<SnakeLinkedList | null, SnakeLinkedList | null>(
      ref,
      () => snake,
      [snake]
    );
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
);
