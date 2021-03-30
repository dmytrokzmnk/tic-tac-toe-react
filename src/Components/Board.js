import React, { useState, useEffect, useCallback } from "react";
import Cell from "./Cell";
import PropTypes from "prop-types";
import { CROSS, ZERO } from "../utils";

const Board = ({ players, winner, setWinner, setPlayers }) => {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinnerMemo = useCallback(
    (cells) => {
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
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          setWinner(cells[a] === players.firstPlayer ? "Игрок 1" : "Игрок 2");
          if (cells[a] === players.firstPlayer) {
            setPlayers({
              ...players,
              firstPlayerWon: players.firstPlayerWon + 1,
              firstPlayer: "",
              secondPlayer: "",
            });
            return;
          }
          if (cells[a] === players.secondPlayer) {
            setPlayers({
              ...players,
              secondPlayerWon: players.secondPlayerWon + 1,
              firstPlayer: "",
              secondPlayer: "",
            });
            return;
          }
          setCells(Array(9).fill(null));
          setXIsNext(true);
          return;
        }
        if (cells.filter((el) => el !== null).length === 9) {
          setWinner("draw");
          setPlayers({ ...players, firstPlayer: "", secondPlayer: "" });
          setCells(Array(9).fill(null));
          setXIsNext(true);
          return;
        }
      }
      return null;
    },
    [players, setWinner, setPlayers]
  );

  useEffect(() => {
    calculateWinnerMemo(cells);
  }, [cells, calculateWinnerMemo, players, setPlayers, winner]);

  const renderCell = (i) => {
    return <Cell value={cells[i]} onClick={() => handleClick(i)} />;
  };

  const handleClick = (i) => {
    const cellsCopy = [...cells];
    if (winner) {
      return;
    }
    if (cellsCopy[i]) {
      return;
    }
    cellsCopy[i] = xIsNext ? CROSS : ZERO;
    setXIsNext(!xIsNext);
    setCells(cellsCopy);
  };

  const indicator =
    players.firstPlayer === CROSS
      ? xIsNext
        ? "Игрок 1"
        : "Игрок 2"
      : xIsNext
      ? "Игрок 2"
      : "Игрок 1";

  return (
    <>
      <div className="info">
        <div className="info-row">
          <div>{`Игрок 1 (${players.firstPlayer})`}</div>
          <div>{`Игрок 2 (${players.secondPlayer})`}</div>
        </div>
        <div className="info-row">
          <div>
            {`Количество ходов: ${
              cells.filter((el) => el === players.firstPlayer).length
            }`}
          </div>
          <div>
            {`Количество ходов: ${
              cells.filter((el) => el === players.secondPlayer).length
            }`}
          </div>
        </div>
        <div className="info-row">
          <div>{`Побед: ${players.firstPlayerWon}`}</div>
          <div>{`Побед: ${players.secondPlayerWon}`}</div>
        </div>
        <div className="info-row">{`Следующий ход: ${indicator}`}</div>
      </div>
      <div className="board-row">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className="board-row">
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className="board-row">
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
    </>
  );
};

Board.propTypes = {
  setPlayers: PropTypes.func,
  winner: PropTypes.string,
  players: PropTypes.shape({
    firstPlayer: PropTypes.string,
    secondPlayer: PropTypes.string,
    firstPlayerWon: PropTypes.number,
    secondPlayerWon: PropTypes.number,
  }),
  setWinner: PropTypes.func,
};

export default Board;
