interface Props {
  message: string;
}

export const Title = ({ message }: Props) => (
  <header>
    <h1 id="title">
      <sup>The</sup>Letters!<sub>Game</sub>
    </h1>
    <h2 id="message">{message}</h2>
  </header>
);
