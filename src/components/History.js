import React, { useState, useEffect } from "react";

export default function History(props) {
  const {
    step,
    setStep,
    isXNext,
    isGameOver,
    progress,
    winner,
    setProgress,
    setIsXNext,
    setIsGameOver,
    setWinner,
    isBack,
    setIsBack,
  } = props;
  const [history, setHistory] = useState([]);

  console.log(step);

  useEffect(() => {
    setHistory((prevState) => {
      if (!Boolean(progress.join("")) || isBack) return prevState;
      const newState = step === 1 ? [] : prevState.concat();
      newState.push(progress.concat());
      return newState;
    });
  }, [progress, isBack, step]);

  const handleGoToStep = (goToStep) => {
    setProgress(history[goToStep]);
    setStep(goToStep + 1);
    setIsBack(true);
  };

  return (
    <div className="history">
      {winner ? (
        <p>Winner: {winner}</p>
      ) : (
        <p>Next Player: {isXNext ? "X" : "O"}</p>
      )}
      <hr />
      <div>
        <p key="game-start">
          1.
          <button
            onClick={() => {
              setProgress(Array(9).fill(null));
              setStep(0);
              setIsXNext(true);
              setIsGameOver(false);
              setWinner(null);
              setIsBack(true);
              // setHistory([]);
            }}
          >
            Go to Start Game
          </button>
        </p>
        {history.map((val, index) => {
          if (isGameOver) return null;

          return (
            <p key={index}>
              {index + 2}.{" "}
              <button onClick={() => handleGoToStep(index)}>
                Go to Move #{index + 1}
              </button>
            </p>
          );
        })}
      </div>
    </div>
  );
}
