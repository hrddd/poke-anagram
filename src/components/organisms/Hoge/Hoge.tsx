import * as React from "react";
import { SelectedHoge } from "../../../redux/modules/hoge";

type Props = {
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
} & SelectedHoge;

export const HogeComponent: React.SFC<Props> = (props) => {
  const { name, email } = props;
  return (
    <div>
      <div className="field">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => props.handleNameChange(e)}
        />
      </div>
      <div className="field">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => props.handleEmailChange(e)}
        />
      </div>
    </div>
  );
};
