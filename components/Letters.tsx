import "../../scss/_letters.scss";

interface Props {
  letters: string[];
}

export const Letters = ({ letters }: Props) => (
  <ul className="Letters">
    {letters.map((letter, i) => {
      return <li key={`${letter}-${i}`}>{letter}</li>;
    })}
  </ul>
);
