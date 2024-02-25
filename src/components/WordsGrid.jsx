import classes from "./WordsGrid.module.css";
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function WordsGrid({ wordsOnGrid, targetWord }) {
  const targetWordArray = targetWord.split("");

  return (
    <main className={classes.container}>
      {wordsOnGrid.map((word) => {
        return (
          <div key={word.id} className={classes.row}>
            {word.wordInRow.map((letter, index) => {
              let cellStyle = classes.cell;
              if (letter === targetWordArray[index]) {
                cellStyle = `${classes.cell} ${classes.matched}`;
              } else if (targetWordArray.includes(word.wordInRow[index])) {
                cellStyle = `${classes.cell} ${classes.missplaced}`;
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
