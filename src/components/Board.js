import React, { useState } from "react";
import Square from "./Square";
import History from "./History";

function Board() {
  const [progress, setProgress] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [step, setStep] = useState(0);
  const [isBack, setIsBack] = useState(false);

  function handleClick(index) {
    setProgress((prevState) => {
      const newProgress = [...prevState];
      newProgress[index] = isXNext ? "X" : "O";
      calculateWinner(newProgress);
      return newProgress;
    });
    setIsBack(false);
    setIsXNext((prevState) => !prevState);
    setStep((prevState) => (prevState += 1));
  }

  function calculateWinner(progress) {
    let isWin = false;
    const progressLength = progress.reduce(
      (len, val) => (len += val ? 1 : 0),
      0
    );
    if (progressLength < 5) return;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const player = isXNext ? "X" : "O";
    for (let i = 0, len = lines.length; i < len; i++) {
      const arr = lines[i];
      isWin = arr.every((index) => progress[index] === player);
      if (isWin) {
        setIsGameOver(true);
        setWinner(player);
        break;
      }
    }
  }

  return (
    <div className="d-flex">
      <div className="board">
        {progress.map((value, i) => (
          <Square
            key={i}
            value={value}
            index={i}
            onClick={handleClick}
            isGameOver={isGameOver}
          />
        ))}
      </div>
      <History
        step={step}
        setStep={setStep}
        isXNext={isXNext}
        isGameOver={isGameOver}
        progress={progress}
        winner={winner}
        setProgress={setProgress}
        setIsXNext={setIsXNext}
        setIsGameOver={setIsGameOver}
        setWinner={setWinner}
        isBack={isBack}
        setIsBack={setIsBack}
      />
    </div>
  );
}

export default Board;
