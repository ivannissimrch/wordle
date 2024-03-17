export default function updateWordsOnGrid(
  wordsOnGrid,
  numberOfGuesses,
  newWordArray
) {
  const upadtedWordsOnGrid = wordsOnGrid.map((word, index) => {
    if (index === numberOfGuesses) {
      return {
        wordInRow: newWordArray,
      };
    }
    return word;
  });

  return upadtedWordsOnGrid;
}
