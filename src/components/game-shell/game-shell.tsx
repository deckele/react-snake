import { useCallback, useEffect, useRef, useState } from "react";
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
const HIGHSCORE = "highscore";

interface GameShellProps {
  nextGame: () => void;
}
export function GameShell({ nextGame }: GameShellProps) {
  const forceUpdate = useForceUpdate();
  const [highscore] = useState(() =>
    Number(localStorage.getItem(HIGHSCORE) ?? 0)
  );
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
  const touchStart = useRef<Coordinate>();

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

  const handleCollision = useCallback(() => {
    gameLoop.current && clearInterval(gameLoop.current);
    const score = snake.current?.length ?? 0;
    const highscore = Number(localStorage.getItem(HIGHSCORE) ?? 0);
    if (score > highscore) localStorage.setItem(HIGHSCORE, String(score));
    document.onkeydown = () => {
      nextGame();
    };
    document.ontouchstart = () => {
      nextGame();
    };
  }, [nextGame]);

  useEffect(() => {
    function handleMoveInput(nextDirection: Direction) {
      if (canGoToNextDirection(direction.current, nextDirection)) {
        moveQueue.current.push(nextDirection);
        direction.current = nextDirection;
      }
    }
    function preventDefault(e: Event) {
      e.preventDefault();
    }
    document.onkeydown = (e) => {
      const nextDirection = keyToDirection[e.key];
      handleMoveInput(nextDirection);
    };
    document.ontouchstart = (e) => {
      const { clientX, clientY } = e.touches[0];
      touchStart.current = [clientX, clientY];
    };
    document.ontouchend = (e) => {
      if (!touchStart.current) return;
      const { clientX, clientY } = e.changedTouches[0];
      const [x, y] = touchStart.current;
      const [dx, dy] = [clientX - x, clientY - y];
      if (dx > config.touchSensitivity && dx > dy)
        handleMoveInput(Direction.right);
      else if (dx < -config.touchSensitivity && dx < dy)
        handleMoveInput(Direction.left);
      else if (dy > config.touchSensitivity && dy > dx)
        handleMoveInput(Direction.down);
      else if (dy < -config.touchSensitivity && dy < dx)
        handleMoveInput(Direction.up);
    };
    document.addEventListener("touchmove", preventDefault, { passive: false });
    return () => document.removeEventListener("touchmove", preventDefault);
  }, []);

  useEffect(() => {
    if (!gameLoop.current) {
      gameLoop.current = setInterval(() => {
        if (!availableCoordinatesForApple.current)
          setAvailableCoordinatesForApple();
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
        if (snake.current?.hash[hashXY(newCoordinate)]) {
          handleCollision();
          return;
        }
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
    <div className="relative inline-block p-4">
      <div className="px-4 pb-4 w-full flex justify-between">
        <h4>Score: {snake.current?.length ?? 0}</h4>
        <h4>Highscore: {highscore}</h4>
      </div>
      <Board size={config.boardSize} />
      <Snake initialNodes={SNAKE_INITIAL_NODES} ref={snake} />
      <Apple
        availableCoordinates={availableCoordinatesForApple.current}
        ref={apple}
      />
    </div>
  );
}
