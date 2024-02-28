import { useState } from "react";
import "./App.css";
import { generate } from "random-words";
import WordsGrid from "./components/WordsGrid";

function App() {
  const defaultWordsOnGrid = [
    { id: 0, wordInRow: ["", "", "", "", ""] },
    { id: 1, wordInRow: ["", "", "", "", ""] },
    { id: 2, wordInRow: ["", "", "", "", ""] },
    { id: 3, wordInRow: ["", "", "", "", ""] },
    { id: 4, wordInRow: ["", "", "", "", ""] },
    { id: 5, wordInRow: ["", "", "", "", ""] },
  ];
  const [wordsOnGrid, setWordsOnGrid] = useState(defaultWordsOnGrid);
  const [targetWord, setTargetWord] = useState(
    generate({ minLength: 5, maxLength: 5 }).toUpperCase()
  );
  const [newWordEntered, setNewWordEntered] = useState("");
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const MAX_GUESSES = 6;
  const [wrongLengthOfWord, setWrongLengthOfWord] = useState(false);
  console.log(targetWord);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  function restartGame() {
    setNumberOfGuesses(0);
    setWordsOnGrid(defaultWordsOnGrid);
    setTargetWord(generate({ minLength: 5, maxLength: 5 }).toUpperCase());
    setNewWordEntered("");
    setWrongLengthOfWord(false);
    setWin(false);
    setLose(false);
  }

  function handleUserEnterWord(event) {
    setWrongLengthOfWord(false);
    const newWord = event.target.value;
    setNewWordEntered(newWord.toUpperCase());
  }

  function handleUserSubmitWord(event) {
    event.preventDefault();
    setNumberOfGuesses(numberOfGuesses + 1);
    //Validate word length
    if (newWordEntered.length !== 5) {
      setWrongLengthOfWord(true);
      setNewWordEntered("");
      setNumberOfGuesses(numberOfGuesses);
      return;
    }

    const updateWordsOnGrid = wordsOnGrid.map((word) => {
      if (word.id === numberOfGuesses) {
        return {
          id: numberOfGuesses,
          wordInRow: newWordEntered.split(""),
        };
      }
      return word;
    });

    setWordsOnGrid(updateWordsOnGrid);
    setNewWordEntered("");

    if (numberOfGuesses >= MAX_GUESSES - 1 && newWordEntered !== targetWord) {
      setLose(true);
    }

    if (newWordEntered === targetWord) {
      setWin(true);
    }
  }

  return (
    <>
      <h1>WORDLE</h1>
      <p>Guess the word in 6 attempts</p>
      <main>
        <WordsGrid wordsOnGrid={wordsOnGrid} targetWord={targetWord} />
      </main>
      {!lose && !win && (
        <form onSubmit={handleUserSubmitWord}>
          <input
            type="text"
            placeholder={
              wrongLengthOfWord
                ? "Invalid length. Please enter a 5 character long word."
                : "Enter a 5 character long word."
            }
            onChange={handleUserEnterWord}
            value={newWordEntered}
          />
        </form>
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
