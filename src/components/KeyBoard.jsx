/* eslint-disable react/prop-types */

import classes from "./KeyBoard.module.css";

export default function KeyBoard({ onClick, keyboardKeys }) {
  return (
    <main className={classes.layout}>
      {keyboardKeys.map((keyboardKey, index) => {
        const validationStyle = classes[keyboardKey.style];
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
