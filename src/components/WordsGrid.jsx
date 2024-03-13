import classes from "./WordsGrid.module.css";
/* eslint-disable react/prop-types */
export default function WordsGrid({
  wordsOnGrid,
  targetWordArray,
  updateKeyboardKeysStyles,
}) {
  return (
    <main className={classes.container}>
      {wordsOnGrid.map((word, index) => {
        let cellStyle = classes.cell;
        return (
          <div key={index} className={classes.row}>
            {word.wordInRow.map((letter, index) => {
              if (word.applyNewStyle === true) {
                if (letter === targetWordArray[index]) {
                  cellStyle = `${classes.cell} ${classes.matched}`;
                  updateKeyboardKeysStyles(letter, "matched");
                } else if (targetWordArray.includes(letter)) {
                  cellStyle = `${classes.cell} ${classes.missplaced}`;
                  updateKeyboardKeysStyles(letter, "missplaced");
                } else if (letter !== "") {
                  cellStyle = `${classes.cell} ${classes.wrong}`;
                  updateKeyboardKeysStyles(letter, "wrong");
                }
              }
              return (
                <div key={index} className={cellStyle}>
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </main>
  );
}
