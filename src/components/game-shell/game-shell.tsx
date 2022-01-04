import { useEffect, useRef } from "react";
import { SnakeLinkedList, SnakeNode } from "../../snake-linked-list";
import { Board } from "../board/board";
import { Snake } from "../snake/snake";
import { config } from "../../game-config";
import { canGoToNextDirection, Direction, keyToDirection } from "../../utils";
import { useForceUpdate } from "../../hooks/use-force-update";

const STARTING_Y = Math.floor((config.boardSize - 1) / 2);
const SNAKE_INITIAL_NODES = [
  new SnakeNode(0, STARTING_Y),
  new SnakeNode(1, STARTING_Y),
  new SnakeNode(2, STARTING_Y),
];
export function GameShell() {
  const focrUpdate = useForceUpdate();
  const gameLoop = useRef<NodeJS.Timer | null>();
  const direction = useRef(Direction.right);
  const moveQueue = useRef([] as Direction[]);
  const nextSnakeNode = useRef(
    SNAKE_INITIAL_NODES[SNAKE_INITIAL_NODES.length - 1]
  );
  const snake = useRef<SnakeLinkedList | null>(null);

  useEffect(() => {
    document.onkeydown = (e) => {
      const nextDirection = keyToDirection[e.key];
      if (canGoToNextDirection(direction.current, nextDirection)) {
        moveQueue.current.push(nextDirection);
        console.log("queued direction: ", nextDirection);
        direction.current = nextDirection;
      }
    };
    if (!gameLoop.current) {
      gameLoop.current = setInterval(() => {
        const nextDirection = moveQueue.current.shift() ?? direction.current;
        let { x, y } = nextSnakeNode.current;
        switch (nextDirection) {
          case Direction.up:
            y--;
            break;
          case Direction.down:
            y++;
            break;
          case Direction.right:
            x++;
            break;
          case Direction.left:
            x--;
            break;
        }
        console.log(`snake moving to: x: ${x}, y: ${y}`);
        const newNode = new SnakeNode(x, y);
        snake.current?.addToHead(new SnakeNode(x, y));
        nextSnakeNode.current = newNode;
        focrUpdate();
      }, config.snakeMoveRateMs);
    }
    return () => {
      gameLoop.current && clearInterval(gameLoop.current);
      gameLoop.current = null;
    };
  }, []);

  return (
    <>
      <Board size={config.boardSize} />
      <Snake initialNodes={SNAKE_INITIAL_NODES} ref={snake} />
    </>
  );
}
