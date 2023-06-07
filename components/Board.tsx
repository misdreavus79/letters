import { ReactNode } from "react";
import "../../scss/_gameboard.scss";

interface Props {
  children: ReactNode;
}

export const Board = (props: Props) => (
  <section className="gameBoard">{props.children}</section>
);

export default Board;
