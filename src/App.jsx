import { useState } from "react";
import "./App.css";
import { generate } from "random-words";
import WordsGrid from "./components/WordsGrid";

function App() {
  const [wordsOnGrid, setWordsOnGrid] = useState([
    { id: 1, wordInRow: ["h", "e", "l", "l", "o"] },
    { id: 2, wordInRow: ["j", "e", "l", "l", "o"] },
    { id: 3, wordInRow: ["", "", "", "", ""] },
    { id: 4, wordInRow: ["", "", "", "", ""] },
    { id: 5, wordInRow: ["", "", "", "", ""] },
    { id: 6, wordInRow: ["", "", "", "", ""] },
  ]);
  const [targetWord, setTargetWord] = useState(
    generate({ minLength: 5, maxLength: 5 })
  );
  const [newWordEntered, setNewWordEntered] = useState("");
  const [numbetOfGuesses, setNumberOfGuesses] = useState(0);
  const MAX_GUESSES = 6;
  console.log(targetWord);

  function handleUserEnterWord(event) {
    const newWord = event.target.value;
    setNewWordEntered(newWord);
  }

  function handleUserSubmitWord(event) {
    event.preventDefault();
    setNumberOfGuesses(numbetOfGuesses + 1);
    //validate word length
    if (newWordEntered.length !== 5) {
      //display a message to the user change this to display message near input or in input
      alert("Word must be 5 characters long");
      setNewWordEntered("");
      return;
    }

    if (numbetOfGuesses >= MAX_GUESSES) {
      alert("You have reached the maximum number of guesses");
      //reset game
      return;
    }

    //change this to update words on grid instead of adding to array
    // setWordsOnGrid((prev) => [...prev, newWordEntered]);
    setNewWordEntered("");
  }

  return (
    <>
      <h1>Wordle</h1>
      <main>
        <WordsGrid wordsOnGrid={wordsOnGrid} newWordEntered={newWordEntered} />
      </main>
      <form onSubmit={handleUserSubmitWord}>
        <input
          type="text"
          placeholder="Enter a 5 characters long word"
          onChange={handleUserEnterWord}
          value={newWordEntered}
        />
      </form>
    </>
  );
}

export default App;
