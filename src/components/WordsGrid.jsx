import classes from "./WordsGrid.module.css";
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function WordsGrid({ wordsOnGrid, newWordEntered }) {
  console.log(wordsOnGrid, newWordEntered);
  return (
    <main className={classes.container}>
      {wordsOnGrid.map((word) => (
        <div key={word.id} className={classes.row}>
          {word.wordInRow.map((letter, index) => (
            <div key={index} className={classes.cell}>
              {letter}
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
