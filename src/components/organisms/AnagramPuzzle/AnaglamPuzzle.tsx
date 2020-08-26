import * as React from "react";
import { SelectedAnagramPuzzle, SelectCharPayload } from '../../../redux/modules/anagramPuzzle';

type Props = {
  anagramPuzzle: SelectedAnagramPuzzle,
  handleOnClick: (payload: SelectCharPayload) => void
};

const Char = (props: { char: string, isSelected: boolean, handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { isSelected, char, handleOnClick } = props;
  return (<button
    style={{ border: '1px solid', height: '40px', width: '40px', background: isSelected ? 'red' : 'gray' }}
    onClick={handleOnClick}>{char}</button>
  );
};

const Questions = (props: { data: SelectedAnagramPuzzle['questionData'], handleOnClick: (payload: SelectCharPayload) => void }) => {
  const { data, handleOnClick } = props;
  return (<ul>
    {data.map((question) => (
      <li key={question.id}>
        {question.name.map(({ id, char, isSelected }) => {
          const handleOnClickChar = () => {
            handleOnClick({
              charId: id,
              questionId: question.id
            });
          }
          return (<Char key={id} char={char} isSelected={isSelected} handleOnClick={handleOnClickChar} />);
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