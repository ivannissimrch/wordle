import { useEffect, useState } from "react";
import "./App.css";
import { generate } from "random-words";
import GuessSlots from "./components/Grid";

function App() {
  const [wordsOnGrid, setWordsOnGrid] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [targetWord, setTargetWord] = useState("");
  const [newWordEntered, setNewWordEntered] = useState("");
  const [numbetOfGuesses, setNumberOfGuesses] = useState(0);

  useEffect(() => {
    //get ramom word from libary
    const randomWord = generate({ minLength: 5, maxLength: 5 });
    console.log(randomWord);
    setTargetWord(randomWord);
  }, []);

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
    if (numbetOfGuesses >= 6) {
      alert("You have reached the maximum number of guesses");
      //reset game
      return;
    }

    //change this to update words on grid instead of adding to array
    setWordsOnGrid((prev) => [...prev, newWordEntered]);
    setNewWordEntered("");
  }

  return (
    <>
      <h1>Wordle Game</h1>
      <main>
        <GuessSlots words={wordsOnGrid} />
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
