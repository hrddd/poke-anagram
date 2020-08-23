import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';

type Props = {
  anagramPuzzle: SelectedAnagramPuzzle
};

const Questions = (props: { data: SelectedAnagramPuzzle['questionData'] }) => {
  const { data } = props;
  return (<ul>
    {data.map((question) => (
      <li key={question.id}>
        {question.name.map((char, idx) => {
          return (<span key={`${question.id}_${char}_${idx}`} style={{ border: '1px solid' }}>{char}</span>)
        })}
      </li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { questionData, currentStep, maxStep } = props.anagramPuzzle;
  return (
    <>
      <div>{currentStep}/{maxStep}</div>
      {questionData.length > 0 && (<Questions data={questionData} />)}
    </>
  );
};

export const AnagramPuzzleComponent = React.memo(Component);