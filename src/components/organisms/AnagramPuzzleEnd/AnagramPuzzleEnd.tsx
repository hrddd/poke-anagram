import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';

type Props = {
  resultTime: SelectedAnagramPuzzle['resultTime'], // ミリ秒
  max: number,
  currentLength: number,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
};

const Component: React.SFC<Props> = (props) => {
  const { resultTime, max, currentLength, handleChange, handleClick } = props;
  return (<>
    全問正解！
    <br />
    <br />
    {resultTime && `かかった時間は ${resultTime / 1000}秒 です`}
    <br />
    <br />
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
      retry!
    </button>
  </>);
};

export const AnagramPuzzleEndComponent = React.memo(Component);