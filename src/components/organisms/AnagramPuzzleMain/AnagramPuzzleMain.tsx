import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';
import { Questions } from "../../molecules/Questions";
import { HandleDrop, HandleClick } from "../../molecules/Char";

type Props = {
  questions: SelectedAnagramPuzzle['questions'],
  handleClick: HandleClick,
  handleDrop: HandleDrop
};

const Component: React.SFC<Props> = (props) => {
  const { questions, handleClick, handleDrop } = props;
  return (<Questions
    questions={questions} handleClick={handleClick} handleDrop={handleDrop}
  />);
};

export const AnagramPuzzleComponent = React.memo(Component);