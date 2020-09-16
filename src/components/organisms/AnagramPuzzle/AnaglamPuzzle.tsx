import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';

type Props = {
  questions: SelectedAnagramPuzzle['questions'],
  isAllCorrect: boolean,
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void
};

type CharProps = {
  char: string,
  isSelected: boolean,
  name: string,
  value: string,
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const Char = (props: CharProps) => {
  const { isSelected, char, handleOnClick, name, value } = props;
  return (<button
    style={{ border: '1px solid', height: '40px', width: '40px', background: isSelected ? 'red' : 'gray' }}
    name={name}
    value={value}
    onClick={handleOnClick}>{char}</button>
  );
};

type QuestionsProps = {
  questions: { id: string, chars: { char: string, isSelected: boolean }[], isCorrect: boolean }[],
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
const Questions = (props: QuestionsProps) => {
  const { questions, handleOnClick } = props;
  return (<ul>
    {questions.map((question) => (
      <li
        key={`Questions${question.id}`}
        style={{ marginTop: '16px', background: question.isCorrect ? 'blue' : 'white' }}
      >
        {question.chars.map((char, idx) => (<Char
          key={`Questions${question.id}${idx}`}
          value={idx.toString()}
          char={char.char}
          name={question.id}
          isSelected={char.isSelected}
          handleOnClick={handleOnClick}
        />))}
        {question.isCorrect && (<div style={{ color: "white" }}>
          正解！
        </div>)}
      </li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { questions, handleOnClick, isAllCorrect } = props;
  return (
    <>
      {questions.length > 0 && (<Questions
        questions={questions} handleOnClick={handleOnClick}
      />)}
      {isAllCorrect && (<div>
        全問正解！
      </div>)}
    </>
  );
};

export const AnagramPuzzleComponent = React.memo(Component);