import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';

type Props = {
  anagramPuzzle: SelectedAnagramPuzzle,
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void
};

const Questions = (props: { data: SelectedAnagramPuzzle['questionData'], handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { data, handleOnClick } = props;
  return (<ul>
    {data.map((question) => (
      <li key={question.id}>
        {question.name.map((char, idx) => {
          return (<button
            key={`${question.id}_${char}_${idx}`}
            style={{ border: '1px solid', height: '40px', width: '40px' }}
            onClick={handleOnClick}>{char}</button>
          );
        })}
      </li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { anagramPuzzle: { questionData, currentStep, maxStep }, handleOnClick } = props;
  return (
    <>
      <div>{currentStep}/{maxStep}</div>
      {questionData.length > 0 && (<Questions
        data={questionData} handleOnClick={handleOnClick}
      />)}
    </>
  );
};

export const AnagramPuzzleComponent = React.memo(Component);