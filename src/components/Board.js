import { useCallback, useState, useEffect } from "react";
import Square from "./Square";

const winnerMap = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

function Board({ winner, setWinner, handleReset }) {
  const [state, setState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    if (winner === null) {
      setState(Array(9).fill(null));
      setXIsNext(true);
    }
  }, [winner]);

  const checkGameOver = useCallback(
    (board) => {
      const value = xIsNext ? "O" : "X";
      const isWinner = winnerMap.some((arr) => {
        const isTrue = arr.every((index) => value === state[index]);
        return isTrue;
      });
      if (isWinner) {
        setWinner(`Winner ${value}`);
        return;
      }
      const isOver = board.every((value) => Boolean(value));
      if (isOver) {
        setWinner("Draw");
      }
    },
    [setWinner, xIsNext, state]
  );

  useEffect(() => {
    checkGameOver(state);
  }, [state, checkGameOver]);

  const handleClick = (i) => {
    const value = state[i];
    if (value || winner) return;

    setState((prevState) => {
      const newState = [...prevState];
      newState[i] = xIsNext ? "X" : "O";
      return newState;
    });
    setXIsNext((xIsNext) => !xIsNext);
  };

  return (
    <div className="board">
      {state.map((value, i) => (
        <Square key={i} value={value} onClick={handleClick} index={i} />
      ))}
    </div>
  );
}

export default Board;
