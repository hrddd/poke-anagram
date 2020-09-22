import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'

type HandleOnDropArg = {
  questionId: string,
  beforeIndex: number,
  afterIndex: number,
}

type Props = {
  questions: SelectedAnagramPuzzle['questions'],
  isAllCorrect: boolean,
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleOnDrop: (arg: HandleOnDropArg) => void
};

type CharProps = {
  char: string,
  isSelected: boolean,
  name: string,
  value: string,
  id: string,
  index: number,
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleOnDrop: (arg: HandleOnDropArg) => void
}
interface DragItem {
  index: number
  id: string
  type: string
}
const ItemTypes = {
  CARD: 'card',
}
const Char = (props: CharProps) => {
  const { isSelected, char, handleOnClick, name, value, index, handleOnDrop, id } = props;
  const ref = React.useRef<HTMLButtonElement>(null)
  const [, drop] = useDrop({
    // ココをdragで設定したitemのtypeに合わせる
    accept: ItemTypes.CARD,
    // dragしたitemがhoverした（重なった）際の挙動
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
    },
    // dropした際の挙動
    drop(item: DragItem, monitor) {
      // item.indexはDragItemで設定したindex
      // indexはdropされたcomponentに渡ってきているindex
      // ※itemのindexも同じ値を元に設定されている前提
      if (!ref.current || item.index === index) {
        return
      }
      handleOnDrop({
        questionId: name,
        beforeIndex: item.index,
        afterIndex: index,
      })
    }
  })
  const [{ opacity }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1
      }
    }
  })
  drag(drop(ref))
  return (<button
    ref={ref}
    style={{
      border: '1px solid',
      height: '40px',
      width: '40px',
      background: isSelected ? 'red' : 'gray',
      opacity: opacity
    }}
    name={name}
    value={value}
    onClick={handleOnClick}>{char}</button>
  );
};

type QuestionsProps = {
  questions: { id: string, chars: { char: string, isSelected: boolean }[], isCorrect: boolean }[],
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  handleOnDrop: (arg: HandleOnDropArg) => void
}
const Questions = (props: QuestionsProps) => {
  const { questions, handleOnClick, handleOnDrop } = props;
  return (<ul>
    {questions.map((question) => (
      <li
        key={`Questions${question.id}`}
        style={{ marginTop: '16px', background: question.isCorrect ? 'blue' : 'white' }}
      >
        {question.chars.map((char, index) => (<Char
          key={`Questions${question.id}${index}`}
          id={`Questions${question.id}${index}`}
          value={index.toString()}
          index={index}
          char={char.char}
          name={question.id}
          isSelected={char.isSelected}
          handleOnClick={handleOnClick}
          handleOnDrop={handleOnDrop}
        />))}
        {question.isCorrect && (<div style={{ color: "white" }}>
          正解！
        </div>)}
      </li>
    ))}
  </ul>)
};

const Component: React.SFC<Props> = (props) => {
  const { questions, handleOnClick, isAllCorrect, handleOnDrop } = props;
  return (
    <>
      {questions.length > 0 && (<Questions
        questions={questions} handleOnClick={handleOnClick} handleOnDrop={handleOnDrop}
      />)}
      {isAllCorrect && (<div>
        全問正解！
      </div>)}
    </>
  );
};

export const AnagramPuzzleComponent = React.memo(Component);