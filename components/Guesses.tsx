import "../../scss/_guesses.scss";

interface Props {
  guesses: string[];
}

export const Guesses = ({ guesses }: Props) => (
  <aside className="guesses">
    <h2>Guesses</h2>
    <ol>
      {guesses.map((guess) => {
        return <li key={guess}>{guess}</li>;
      })}
    </ol>
  </aside>
);
