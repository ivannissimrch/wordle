export default function getNewWordArray(defaultWordInRowValue, newWord) {
  const updatedWord = defaultWordInRowValue.map((letter, index) => {
    if (newWord[index]) {
      return newWord[index];
    }
    return letter;
  });
  return updatedWord;
}
