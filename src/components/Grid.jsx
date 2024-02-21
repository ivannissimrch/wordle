/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function Grid({ words }) {
  console.log(words);
  return (
    <main>
      {words.map((word, index) => {
        console.log(word);
        return <div key={index}>{word}</div>;
      })}
    </main>
  );
}
