import { useState } from "react";
import "./App.css";
import { generate } from "random-words";
import WordsGrid from "./components/WordsGrid";

function App() {
  const WordsOnGridDefault = [
    { id: 0, wordInRow: ["", "", "", "", ""] },
    { id: 1, wordInRow: ["", "", "", "", ""] },
    { id: 2, wordInRow: ["", "", "", "", ""] },
    { id: 3, wordInRow: ["", "", "", "", ""] },
    { id: 4, wordInRow: ["", "", "", "", ""] },
    { id: 5, wordInRow: ["", "", "", "", ""] },
  ];
  const [wordsOnGrid, setWordsOnGrid] = useState(WordsOnGridDefault);
  const [targetWord, setTargetWord] = useState(
    generate({ minLength: 5, maxLength: 5 })
  );
  const [newWordEntered, setNewWordEntered] = useState("");
  const [numberOfGuesses, setNumberOfGuesses] = useState(0);
  const MAX_GUESSES = 6;
  const [wrongLengthOfWord, setWrongLengthOfWord] = useState(false);

  function handleUserEnterWord(event) {
    setWrongLengthOfWord(false);
    const newWord = event.target.value;
    setNewWordEntered(newWord);
  }

  function handleUserSubmitWord(event) {
    event.preventDefault();
    setNumberOfGuesses(numberOfGuesses + 1);

    if (numberOfGuesses >= MAX_GUESSES) {
      alert("You have reached the maximum number of guesses");
      //Reset game
      setNumberOfGuesses(0);
      setWordsOnGrid(WordsOnGridDefault);
      setTargetWord(generate({ minLength: 5, maxLength: 5 }));
      setNewWordEntered("");
      setWrongLengthOfWord(false);
      return;
    }

    //Validate word length
    if (newWordEntered.length !== 5) {
      setWrongLengthOfWord(true);
      setNewWordEntered("");
      setNumberOfGuesses(numberOfGuesses);
      return;
    }

    const updateWordsOnGrid = wordsOnGrid.map((word) => {
      console.log(newWordEntered);
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
  }

  return (
    <>
      <h1>WORDLE</h1>
      <main>
        <WordsGrid wordsOnGrid={wordsOnGrid} targetWord={targetWord} />
      </main>
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
    </>
  );
}

export default App;
