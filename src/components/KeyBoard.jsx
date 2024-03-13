/* eslint-disable react/prop-types */

import classes from "./KeyBoard.module.css";

export default function KeyBoard({ onClick }) {
  const keyboardKeys = [
    { char: "Q", style: "default" },
    { char: "W", style: "default" },
    { char: "E", style: "default" },
    { char: "R", style: "default" },
    { char: "T", style: "default" },
    { char: "Y", style: "default" },
    { char: "U", style: "default" },
    { char: "I", style: "default" },
    { char: "O", style: "default" },
    { char: "P", style: "default" },
    { char: "A", style: "default" },
    { char: "S", style: "default" },
    { char: "D", style: "default" },
    { char: "F", style: "default" },
    { char: "G", style: "default" },
    { char: "H", style: "default" },
    { char: "J", style: "default" },
    { char: "K", style: "default" },
    { char: "L", style: "default" },
    { char: "enter", style: "default" },
    { char: "white", style: "default" },
    { char: "Z", style: "default" },
    { char: "X", style: "default" },
    { char: "C", style: "default" },
    { char: "V", style: "default" },
    { char: "B", style: "default" },
    { char: "N", style: "default" },
    { char: "M", style: "default" },
    { char: "bksp", style: "default" },
    { char: "white", style: "default" },
  ];
  return (
    <main className={classes.layout}>
      {keyboardKeys.map((keyboardKey, index) => {
        const validationStyle = `${classes.default} ${
          classes[keyboardKey.style]
        }`;
        return (
          <div
            onClick={onClick}
            key={index}
            className={
              keyboardKey.char === "" ? classes.empty : validationStyle
            }
          >
            {keyboardKey.char}
          </div>
        );
      })}
    </main>
  );
}
