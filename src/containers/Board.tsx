"use client";
import cx from "classnames";
import Square from "@/components/Square";
import { Player, PlayerIcon } from "@/types";
import React, { useState, useEffect } from "react";

const intialSquares: Player[] = Array(9).fill(null);

const Board = () => {
  const [squares, setSquares] = useState<Player[]>(intialSquares);
  const [currPlayer, setCurrPlayer] = useState<Player>(
    Math.round(Math.random() * 1) === 1 ? PlayerIcon.X : PlayerIcon.O
  );
  const [winner, setWinner] = useState<Player>(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    const isWinner: Player = calculateWinner(squares);

    if (isWinner) {
      setWinner(isWinner);
    }

    if (!isWinner && !squares.filter((square) => !square).length) {
      setIsDraw(true);
    }
  }, [squares]);

  const setSquareValue = (index: number): void => {
    const updatedSquares: Player[] = squares.map((val, i): Player => {
      if (i === index) {
        return currPlayer;
      }
      return val;
    });
    setSquares(updatedSquares);
    setCurrPlayer(currPlayer === PlayerIcon.X ? PlayerIcon.O : PlayerIcon.X);
  };

  const reset = (): void => {
    setSquares(intialSquares);
    if (winner) {
      setCurrPlayer(winner);
    }
    if (isDraw) {
      setIsDraw(false);
    }
    setWinner(null);
  };

  const calculateWinner = (squares: Player[]): Player => {
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

    for (let line in lines) {
      const [a, b, c] = lines[line];

      if (
        squares[a] &&
        squares[b] === squares[a] &&
        squares[c] === squares[a]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const boardGrid = cx({
    grid: true,
    winner: winner,
  });

  const container = cx({
    container: true,
  });

  const resetBtn = cx({
    reset: true,
  });

  const buttonGroup = cx({
    "btn-group": true,
  });

  return (
    <div className={container}>
      {!winner && !isDraw ? (
        <p>
          Hey,{" "}
          <span
            className={`player-${currPlayer ? currPlayer.toLowerCase() : null}`}
          >
            {currPlayer}
          </span>{" "}
          it is your turn
        </p>
      ) : null}
      {winner && <p>Player {winner} has won!</p>}
      {isDraw && <p>Draw</p>}
      <div className={boardGrid}>
        {squares
          ? squares.map((_, i) => (
              <Square
                key={i}
                onClick={() => setSquareValue(i)}
                value={squares[i]}
                winner={winner}
              />
            ))
          : null}
      </div>
      <div className={buttonGroup}>
        <button className={resetBtn} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Board;
