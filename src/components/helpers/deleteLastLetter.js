export default function deleteLastLetter(
  defaultWordInRowValue,
  currentWordEntered
) {
  const upadtedWord = defaultWordInRowValue.map((letter, index) => {
    if (index === currentWordEntered.length - 1) {
      return "";
    }
    return currentWordEntered[index];
  });

  return upadtedWord;
}
