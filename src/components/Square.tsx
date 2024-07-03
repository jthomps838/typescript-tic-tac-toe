import classNames from "classnames";
import React from "react";
import { PlayerIcon, Player } from "@/types";

type Props = {
  onClick: () => void;
  winner: Player;
  value: Player;
};

const Square = (props: Props) => {
  const { onClick, winner, value } = props;
  const btnClass = classNames({
    square: true,
    "player-x": value === PlayerIcon.X,
    "player-o": value === PlayerIcon.O,
  });
  return (
    <>
      {!value ? (
        <button
          className={btnClass}
          onClick={onClick}
          disabled={Boolean(winner)}
        />
      ) : (
        <button
          className={btnClass}
          onClick={onClick}
          disabled
          value={value ? value : undefined}
        >
          {value}
        </button>
      )}
    </>
  );
};

export default Square;
