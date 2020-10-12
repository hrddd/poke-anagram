import * as React from "react";

type Props = {
  max: number,
  currentLength: number,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
};

const Component: React.SFC<Props> = (props) => {
  const { max, currentLength, handleChange, handleClick } = props;
  return (<>
    <input
      type="range"
      min="1"
      max={max}
      value={currentLength}
      onChange={handleChange}
    />
    <br />
    {currentLength}問に挑戦！
    <br />
    <button onClick={handleClick}>
      ゲームを始める
    </button>
  </>);
};

export const AnagramPuzzleStartComponent = React.memo(Component);