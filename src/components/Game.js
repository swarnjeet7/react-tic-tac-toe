import { useState } from "react";
import Board from "./Board";

function Game() {
  const [winner, setWinner] = useState(null);

  function handleReset() {
    setWinner(null);
  }

  return (
    <div className="game flexbox">
      <div className="flex-item">
        <Board winner={winner} setWinner={setWinner} />
      </div>
      <div className="flex-item">
        <div style={{ marginBottom: 20 }}>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div>{winner ? winner : null}</div>
      </div>
    </div>
  );
}

export default Game;
