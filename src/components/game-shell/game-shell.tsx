import { useCallback, useEffect, useRef } from "react";
import { SnakeLinkedList, SnakeNode } from "../../snake-linked-list";
import { Board } from "../board/board";
import { Snake } from "../snake/snake";
import { config } from "../../game-config";
import { canGoToNextDirection, Direction, keyToDirection } from "../../utils";
import { useForceUpdate } from "../../hooks/use-force-update";
import { Apple } from "../apple/apple";

const STARTING_Y = Math.floor((config.boardSize - 1) / 2);
const SNAKE_INITIAL_NODES = [
  new SnakeNode([0, STARTING_Y]),
  new SnakeNode([1, STARTING_Y]),
  new SnakeNode([2, STARTING_Y]),
];
export function GameShell() {
  const forceUpdate = useForceUpdate();
  const gameLoop = useRef<NodeJS.Timer | null>();
  const direction = useRef(Direction.right);
  const moveQueue = useRef([] as Direction[]);
  const snake = useRef<SnakeLinkedList | null>(null);
  const nextSnakeNode = useRef(
    SNAKE_INITIAL_NODES[SNAKE_INITIAL_NODES.length - 1]
  );
  const snakeGrowth = useRef(0);

  const handleCollision = useCallback(() => {
    console.log("collision!");
  }, []);

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
        let [x, y] = nextSnakeNode.current.coordiate;
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
        if (
          x < 0 ||
          x > config.boardSize - 1 ||
          y < 0 ||
          y > config.boardSize - 1
        ) {
          handleCollision();
          return;
        }
        const newNode = new SnakeNode([x, y]);
        snake.current?.addToHead(new SnakeNode([x, y]));
        if (snakeGrowth.current === 0) {
          snake.current?.popTail();
        } else {
          snakeGrowth.current--;
        }
        nextSnakeNode.current = newNode;
        forceUpdate();
      }, config.snakeMoveRateMs);
    }
    return () => {
      gameLoop.current && clearInterval(gameLoop.current);
      gameLoop.current = null;
    };
  }, [forceUpdate, handleCollision]);

  return (
    <>
      <Board size={config.boardSize} />
      <Snake
        onCollision={handleCollision}
        initialNodes={SNAKE_INITIAL_NODES}
        ref={snake}
      />
      <Apple availableTiles={[]} />
    </>
  );
}
