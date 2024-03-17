export default function updateKeyboardKeysStyles(wordsOnGrid, targetWordArray) {
  console.log(wordsOnGrid);
  const updatedWordsOnGridstyles = wordsOnGrid.map((word) => {
    let keyColor = "default";
    const newWordStyles = word.wordInRow.map((letter, index) => {
      if (letter === targetWordArray[index]) {
        keyColor = "matched";
        return { letter, keyColor };
      } else if (targetWordArray.includes(letter)) {
        keyColor = "missplaced";
        return { letter, keyColor };
      } else if (letter !== "") {
        keyColor = "wrong";
        return { letter, keyColor };
      }
      return "";
    });

    return newWordStyles;
  });
  console.log(updatedWordsOnGridstyles.flat());

  const newSet = new Set(updatedWordsOnGridstyles.flat());
  console.log(newSet);
  console.log(updatedWordsOnGridstyles);
}
