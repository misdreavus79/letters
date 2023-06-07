import { ReactNode } from "react";
import "../../scss/_gamecontrols.scss";

interface Props {
  children: ReactNode;
}

export const Controls = (props: Props) => (
  <div className="gameControls">{props.children}</div>
);
