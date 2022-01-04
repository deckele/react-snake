import { GameShell } from "./components/game-shell/game-shell";
import { useGameId } from "./hooks/use-game-id";

function App() {
  const { gameId, nextGame } = useGameId();
  return (
    <div id="app">
      <GameShell key={gameId} nextGame={nextGame} />
    </div>
  );
}

export default App;
