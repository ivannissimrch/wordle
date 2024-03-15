/* eslint-disable react/prop-types */

import classes from "./KeyBoard.module.css";

export default function KeyBoard({ onClick }) {
  const letters =
    "Q W E R T Y U I O P A S D F G H J K L enter  Z X C V B N M bksp ";

  return (
    <main className={classes.layout}>
      {letters.split(" ").map((letter, index) => (
        <div
          onClick={onClick}
          key={index}
          className={letter === "" ? classes.empty : classes.letter}
        >
          {letter}
        </div>
      ))}
    </main>
  );
}
