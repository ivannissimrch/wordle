import { useState } from "react";
import "./App.css";
import { generate } from "random-words";
import WordsGrid from "./components/WordsGrid";
import KeyBoard from "./components/KeyBoard";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultWordInRowValue = ["", "", "", "", ""];
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
  }

  function handleUserEnterWord(event) {
    const clickedKey = event.target.firstChild.data;
    if (clickedKey === "enter") {
      handleUserSubmitWord();
    } else if (clickedKey === "bksp") {
      const newWordArray = defaultWordInRowValue.map((letter, index) => {
        if (index === currentWordEntered.length - 1) {
          return "";
        }
        return currentWordEntered[index];
      });

      setCurrentWordEntered(newWordArray.join(""));
      const updateWordsOnGrid = wordsOnGrid.map((word, index) => {
        if (index === numberOfGuesses) {
          return {
            wordInRow: newWordArray,
          };
        }
        return word;
      });
      setWordsOnGrid(updateWordsOnGrid);
    } else {
      const newWord = currentWordEntered + clickedKey;

      if (newWord.length > WORD_MAX_LENGTH) return;
      else {
        const newWordArray = defaultWordInRowValue.map((letter, index) => {
          if (newWord[index]) {
            return newWord[index];
          }
          return letter;
        });
        setCurrentWordEntered(newWord);

        const updateWordsOnGrid = wordsOnGrid.map((word, index) => {
          if (index === numberOfGuesses) {
            return {
              wordInRow: newWordArray,
            };
          }
          return word;
        });

        setWordsOnGrid(updateWordsOnGrid);
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
    //Add atribute to aply validation style to cell
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
        />
      </main>
      {!lose && !win && (
        <KeyBoard
          onClick={handleUserEnterWord}
          wordsOnGrid={wordsOnGrid}
          targetWordArray={targetWordArray}
        />
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
