import * as React from "react";
import { Range } from "../../molecules/Range"

type Props = {
  max: number,
  currentLength: number,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
};

const Component: React.SFC<Props> = (props) => {
  const { max, currentLength, handleChange, handleClick } = props;
  return (<>
    <Range
      min={1}
      max={max}
      value={currentLength}
      onChange={handleChange}
    />
    <br />
    <button onClick={handleClick}>
      ゲームを始める
    </button>
  </>);
};

export const AnagramPuzzleStartComponent = React.memo(Component);