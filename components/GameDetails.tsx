import "../../scss/_gamedetails.scss";

interface Props {
  score: string;
  time: string;
  moves: string;
}

export const GameDetails = ({ score, time, moves }: Props) => (
  <aside className="details">
    <h2>Score</h2>
    <span id="score">{score}</span>
    <h2>Time</h2>
    <span>{time}</span>
    <h2>Moves</h2>
    <span>{moves}</span>
  </aside>
);
