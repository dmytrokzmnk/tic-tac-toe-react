import React from "react";
import PropTypes from "prop-types";
import { CROSS, ZERO } from "../utils";

const SettingsGame = ({ setPlayers, winner, players, setWinner }) => {
  let classModal = players.firstPlayer ? "none" : "SettingsGame-wrap";
  return (
    <div className={classModal}>
      <div className="SettingsGame-modal">
        {!!winner && winner === "draw" && <p>Ничья</p>}
        {!!winner && winner === "Игрок 1" && `Победитель Игрок 1`}
        {!!winner && winner === "Игрок 2" && `Победитель Игрок 2`}
        <p>Игрок 1 сделайте свой выбор:</p>
        <div>
          <button
            className="SettingsGame-btn"
            onClick={() => {
              setPlayers({
                ...players,
                firstPlayer: CROSS,
                secondPlayer: ZERO,
              });
              setWinner("");
            }}
          >
            {CROSS}
          </button>
          <button
            className="SettingsGame-btn"
            onClick={() => {
              setPlayers({
                ...players,
                firstPlayer: ZERO,
                secondPlayer: CROSS,
              });
              setWinner("");
            }}
          >
            {ZERO}
          </button>
        </div>
      </div>
    </div>
  );
};

SettingsGame.propTypes = {
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

export default SettingsGame;
