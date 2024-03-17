import { useState } from "react";
import "./App.css";
import { generate } from "random-words";
import WordsGrid from "./components/WordsGrid";
import KeyBoard from "./components/KeyBoard";
import toast, { Toaster } from "react-hot-toast";
import generateKeyboardKeys from "./components/helpers/generateKeyboardKeys";
import updateWordsOnGrid from "./components/helpers/updateWordsOnGrid";
import deleteLastLetter from "./components/helpers/deleteLastLetter";
import getNewWordArray from "./components/helpers/getNewWordArray";

function App() {
  const [keyboardKeys, setKeyboardKeys] = useState(generateKeyboardKeys());
  function updateKeyboardKeysStyles(keyToUpdate, newStyle) {
    setKeyboardKeys((prevKeyStyles) =>
      prevKeyStyles.map((key) => {
        if (key.char === keyToUpdate) {
          return { ...key, style: newStyle };
        }
        return key;
      })
    );
  }

  const defaultWordInRowValue = Array(5).fill("");
  const defaultGridState = [...Array(6)].map(() => ({
    wordInRow: defaultWordInRowValue,
  }));
  const [wordsOnGrid, setWordsOnGrid] = useState(defaultGridState);
  const WORD_MAX_LENGTH = 5;
  const WORD_MIN_LENGTH = 5;
  const [targetWord, setTargetWord] = useState(
    generate({ minLength: 5, maxLength: 5 }).toUpperCase()
  );
  console.log(targetWord);
  const targetWordArray = targetWord.split("");
  const [currentWordEntered, setCurrentWordEntered] = useState("");
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const MAX_ATTEMPTS = 6;
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  function restartGame() {
    setNumberOfGuesses(0);
    setWordsOnGrid(defaultGridState);
    setTargetWord(
      generate({
        minLength: WORD_MIN_LENGTH,
        maxLength: WORD_MAX_LENGTH,
      }).toUpperCase()
    );
    setCurrentWordEntered("");
    setWin(false);
    setLose(false);
    setKeyboardKeys((prevKeyStyles) =>
      prevKeyStyles.map((key) => {
        return { ...key, style: "default" };
      })
    );
  }

  function handleUserEnterWord(event) {
    const clickedKey = event.target.firstChild.data;
    if (clickedKey === "enter") {
      handleUserSubmitWord();
    } else if (clickedKey === "bksp") {
      //delete last entered letter and set curent word entered to newArray then update words on grid
      const newWordArray = deleteLastLetter(
        defaultWordInRowValue,
        currentWordEntered
      );
      setCurrentWordEntered(newWordArray.join(""));

      const updatedWordsOnGrid = updateWordsOnGrid(
        wordsOnGrid,
        numberOfGuesses,
        newWordArray
      );
      setWordsOnGrid(updatedWordsOnGrid);
    } else {
      const newWord = currentWordEntered + clickedKey;

      if (newWord.length > WORD_MAX_LENGTH) return;
      else {
        const newWordArray = getNewWordArray(defaultWordInRowValue, newWord);
        setCurrentWordEntered(newWord);

        const updatedWordsOnGrid = updateWordsOnGrid(
          wordsOnGrid,
          numberOfGuesses,
          newWordArray
        );

        setWordsOnGrid(updatedWordsOnGrid);
      }
    }
  }

  function handleUserSubmitWord() {
    setNumberOfGuesses(numberOfGuesses + 1);
    setCurrentWordEntered("");
    //Validate word length
    if (currentWordEntered.length !== WORD_MAX_LENGTH) {
      toast("Please enter a 5 letter long word");
      const resetCurrentRow = wordsOnGrid.map((word, index) => {
        if (index === numberOfGuesses) {
          return { wordInRow: defaultWordInRowValue };
        }
        return word;
      });
      setWordsOnGrid(resetCurrentRow);
      setNumberOfGuesses(numberOfGuesses);
      return;
    }
    //Add attribute to aply validation style to cell on WordsGrid component
    const updateCurrentRowStyle = wordsOnGrid.map((word, index) => {
      if (index === numberOfGuesses) {
        return {
          ...word,
          applyNewStyle: true,
        };
      }
      return word;
    });
    setWordsOnGrid(updateCurrentRowStyle);

    //Update keyboard keys Style
    wordsOnGrid.forEach((word) => {
      let keyValidationColor = "default";
      word.wordInRow.forEach((letter, index) => {
        if (letter === targetWordArray[index]) {
          keyValidationColor = "matched";
          updateKeyboardKeysStyles(letter, keyValidationColor);
        } else if (targetWordArray.includes(letter)) {
          keyValidationColor = "missplaced";
          updateKeyboardKeysStyles(letter, keyValidationColor);
        } else if (letter !== "") {
          keyValidationColor = "wrong";
          updateKeyboardKeysStyles(letter, keyValidationColor);
        }
      });
    });

    //Win/Lose Message
    if (
      numberOfGuesses >= MAX_ATTEMPTS - 1 &&
      currentWordEntered !== targetWord
    ) {
      setLose(true);
    }

    if (currentWordEntered === targetWord) {
      setWin(true);
    }
  }

  return (
    <>
      <Toaster />
      <h1>WORDLE</h1>
      <p>Guess the word in 6 attempts</p>
      <main>
        <WordsGrid
          wordsOnGrid={wordsOnGrid}
          targetWordArray={targetWordArray}
          updateKeyboardKeysStyles={updateKeyboardKeysStyles}
        />
      </main>
      {!lose && !win && (
        <KeyBoard onClick={handleUserEnterWord} keyboardKeys={keyboardKeys} />
      )}
      {lose && (
        <div className="message-container">
          <h1>Sorry you lost. The word was {targetWord}</h1>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
      {win && (
        <div className="message-container">
          <h1>
            Congratulations! You have guessed the word! in {numberOfGuesses}{" "}
            attempts.
          </h1>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </>
  );
}

export default App;
