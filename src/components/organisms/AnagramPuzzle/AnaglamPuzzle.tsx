import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';
import { useSwapableItem, Item } from '../../hooks/useSwapableItem';

type Props = {
  questions: SelectedAnagramPuzzle['questions'],
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleDrop: ([before, after]: [Item, Item]) => void
};

type CharProps = {
  char: string,
  isSelected: boolean,
  name: string,
  value: number,
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleDrop: ([before, after]: [Item, Item]) => void
}
const Char = (props: CharProps) => {
  const { isSelected, char, handleClick, name, value, handleDrop } = props;
  const [{
    isDragging,
  }, ref] = useSwapableItem({
    type: 'Char',
    id: name,
    index: value,
    handleDrop
  });
  return (<button
    ref={ref}
    style={{
      border: '1px solid',
      borderRadius: '3px',
      height: '60px',
      width: '60px',
      background: isSelected ? 'lightGreen' : 'white',
      fontSize: '20px',
      opacity: isDragging ? 0.5 : 1
    }}
    name={name}
    value={value}
    onClick={handleClick}
  >{char}</button>
  );
};

type QuestionsProps = {
  questions: { id: string, chars: { char: string, isSelected: boolean }[], isCorrect: boolean }[],
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleDrop: ([before, after]: [Item, Item]) => void
}
const Questions = (props: QuestionsProps) => {
  const { questions, handleClick, handleDrop } = props;
  return (<ul style={{
    padding: 0,
  }}>
    {questions.map((question) => (
      <li
        key={`Questions${question.id}`}
        style={{
          listStyle: 'none',
          marginTop: '16px',
          background: question.isCorrect ? 'blue' : 'white'
        }}
      >
        {question.chars.map((char, index) => (<Char
          key={`Questions${question.id}${index}`}
          value={index}
          char={char.char}
          name={question.id}
          isSelected={char.isSelected}
          handleClick={handleClick}
          handleDrop={handleDrop}
        />))}
        {question.isCorrect && (<div style={{ color: "white" }}>
          正解！
        </div>)}
      </li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { questions, handleClick, handleDrop } = props;
  return (<Questions
    questions={questions} handleClick={handleClick} handleDrop={handleDrop}
  />);
};

export const AnagramPuzzleComponent = React.memo(Component);