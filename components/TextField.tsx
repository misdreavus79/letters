import { ChangeEvent } from "react";
import "../../scss/_textfield.scss";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => {}; // I might need to address this.
  value: string;
}

export const TextField = ({ onChange, value }: Props) => (
  <input
    type="text"
    className="textfield"
    placeholder="enter your guess here"
    onChange={onChange}
    value={value}
  />
);
