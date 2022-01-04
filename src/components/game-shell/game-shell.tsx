import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { SnakeLinkedList, SnakeNode } from "../../snake-linked-list";
import { Board } from "../board/board";
import { Snake } from "../snake/snake";
import { config } from "../../game-config";
import {
  areCoordinatesEqual,
  canGoToNextDirection,
  Direction,
  hashXY,
  keyToDirection,
} from "../../utils";
import { useForceUpdate } from "../../hooks/use-force-update";
import { Apple } from "../apple/apple";
import { Coordinate } from "../../types";

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
  const apple = useRef<Coordinate | null>(null);
  const nextSnakeNode = useRef(
    SNAKE_INITIAL_NODES[SNAKE_INITIAL_NODES.length - 1]
  );
  const snakeGrowth = useRef(0);
  const availableCoordinatesForApple = useRef<Coordinate[]>();

  const getAvailableCoordinatesForApple = useCallback((): Coordinate[] => {
    const availableCoordinates = [];
    const hash = snake.current?.hash ?? {};
    for (let x = 0; x < config.boardSize; x++) {
      for (let y = 0; y < config.boardSize; y++) {
        const coordinate = [x, y] as Coordinate;
        if (!hash[hashXY(coordinate)]) {
          availableCoordinates.push(coordinate);
        }
      }
    }
    return availableCoordinates;
  }, []);
  const setAvailableCoordinatesForApple = useCallback((): void => {
    availableCoordinatesForApple.current = getAvailableCoordinatesForApple();
  }, [getAvailableCoordinatesForApple]);

  useLayoutEffect(() => {
    setAvailableCoordinatesForApple();
  }, [setAvailableCoordinatesForApple]);

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
        const newCoordinate = [x, y] as Coordinate;
        const newNode = new SnakeNode(newCoordinate);
        snake.current?.addToHead(newNode);
        if (snakeGrowth.current === 0) {
          snake.current?.popTail();
        } else {
          snakeGrowth.current--;
        }
        nextSnakeNode.current = newNode;
        if (
          apple.current &&
          areCoordinatesEqual(newCoordinate, apple.current)
        ) {
          snakeGrowth.current += config.nodeGrowthFromApples;
          setAvailableCoordinatesForApple();
        }
        forceUpdate();
      }, config.snakeMoveRateMs);
    }
    return () => {
      gameLoop.current && clearInterval(gameLoop.current);
      gameLoop.current = null;
    };
  }, [forceUpdate, handleCollision, setAvailableCoordinatesForApple]);

  return (
    <>
      <Board size={config.boardSize} />
      <Snake
        onCollision={handleCollision}
        initialNodes={SNAKE_INITIAL_NODES}
        ref={snake}
      />
      <Apple
        availableCoordinates={availableCoordinatesForApple.current}
        ref={apple}
      />
    </>
  );
}
