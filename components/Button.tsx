import "../../scss/_button.scss";

interface Props {
  type: string;
  onClick: () => {};
}

export const Button = ({ type, onClick }: Props): JSX.Element => (
  <button
    className={type}
    onClick={onClick}
    type={type === "Guess" ? "submit" : "button"}
  >
    {type}
  </button>
);

export default Button;
