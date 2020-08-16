import * as React from "react";
import { HogeState } from "../redux/modules/hoge";
import { HogeHandlers } from "../containers/hogeContainer";

interface OwnProps {}

type Props = OwnProps & HogeState & HogeHandlers;

export const HogeComponent: React.SFC<Props> = (props) => {
  const { name, email } = props;
  return (
    <div>
      <div className="field">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => props.updateName(e.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => props.updateEmail(e.target.value)}
        />
      </div>
    </div>
  );
};
