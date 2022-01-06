import { useImperativeHandle } from "react";
import { useLayoutEffect, useState, forwardRef } from "react";
import { SnakeLinkedList, SnakeNode } from "../../snake-linked-list";
import { Direction } from "../../utils";
import { SnakeLink } from "../snake-link/snake-link";

interface SnakeProps {
  initialNodes: SnakeNode[];
  direction: Direction;
}

export const Snake = forwardRef<SnakeLinkedList | null, SnakeProps>(
  ({ initialNodes, direction }: SnakeProps, ref) => {
    const [snake, setSnake] = useState<SnakeLinkedList | null>(null);
    useLayoutEffect(() => {
      setSnake(SnakeLinkedList.from(initialNodes));
    }, [initialNodes]);
    useImperativeHandle<SnakeLinkedList | null, SnakeLinkedList | null>(
      ref,
      () => snake,
      [snake]
    );
    return (
      <>
        {snake
          ? [...snake].map((node, i) => (
              <SnakeLink
                key={node.toString()}
                node={node}
                direction={direction}
                isHead={node === snake.head}
                isEven={i % 2 === 0}
              />
            ))
          : null}
      </>
    );
  }
);
