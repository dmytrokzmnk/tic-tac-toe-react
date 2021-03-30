import React, { useState } from "react";
import SettingsGame from "./SettingsGame";
import Board from "./Board";

const Game = () => {
  const [players, setPlayers] = useState({
    firstPlayer: "",
    secondPlayer: "",
    firstPlayerWon: 0,
    secondPlayerWon: 0,
  });
  const [winner, setWinner] = useState("");

  return (
    <div>
      <Board
        players={players}
        winner={winner}
        setWinner={setWinner}
        setPlayers={setPlayers}
      />

      <SettingsGame
        setPlayers={setPlayers}
        players={players}
        winner={winner}
        setWinner={setWinner}
      />
    </div>
  );
};

export default Game;
