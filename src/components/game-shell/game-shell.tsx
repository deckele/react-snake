import { useEffect } from "react";
import { Board } from "../board/board";
import { Snake } from "../snake/snake";

export function GameShell() {
  useEffect(() => {
    document.onkeydown = (e) => {
      console.log(e.key);
    };
  }, []);
  return (
    <>
      <Board size={10} />
      <Snake />
    </>
  );
}
