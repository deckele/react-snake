import { useState, useCallback } from "react";

export function useGameId() {
  const [gameId, setGameId] = useState(0);
  const nextGame = useCallback(
    (): void => setGameId((prevId) => prevId + 1),
    []
  );
  return { gameId, nextGame };
}
