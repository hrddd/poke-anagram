import * as React from "react";
import { SelectedAnagramPuzzle } from '../../../redux/modules/anagramPuzzle';
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd'

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
  const ref = React.useRef<HTMLDivElement>(null)
  // const [, drop] = useDrop({
  //   // ココをdragで設定したitemのtypeに合わせる
  //   accept: ItemTypes.CARD,
  //   // dragしたitemがhoverした（重なった）際の挙動
  //   hover(item: DragItem, monitor: DropTargetMonitor) {
  //     console.log(item)
  //     // if (!ref.current) {
  //     //   return
  //     // }
  //     //     const dragIndex = item.index
  //     //     const hoverIndex = index

  //     //     // Don't replace items with themselves
  //     //     if (dragIndex === hoverIndex) {
  //     //       return
  //     //     }

  //     //     // Determine rectangle on screen
  //     //     const hoverBoundingRect = ref.current?.getBoundingClientRect()

  //     //     // Get vertical middle
  //     //     const hoverMiddleY =
  //     //       (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

  //     //     // Determine mouse position
  //     //     const clientOffset = monitor.getClientOffset()

  //     //     // Get pixels to the top
  //     //     const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

  //     //     // Only perform the move when the mouse has crossed half of the items height
  //     //     // When dragging downwards, only move when the cursor is below 50%
  //     //     // When dragging upwards, only move when the cursor is above 50%

  //     //     // Dragging downwards
  //     //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //     //       return
  //     //     }

  //     //     // Dragging upwards
  //     //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //     //       return
  //     //     }

  //     //     // Time to actually perform the action
  //     //     handleOnDrop({
  //     //       questionId: name,
  //     //       beforeIndex: dragIndex,
  //     //       afterIndex: hoverIndex,
  //     //     })

  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     // item.index = hoverIndex
  //   },
  // })
  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => {
      // console.log(monitor)
      return {
        opacity: monitor.isDragging() ? 0.5 : 1
      }
    }
  })
  // dragRef(drop(ref))
  return (<button
    ref={dragRef}
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
  const [, dropRef] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      console.log(item)
    },
  })
  return (
    <>
      {questions.length > 0 && (<Questions
        questions={questions} handleOnClick={handleOnClick} handleOnDrop={handleOnDrop}
      />)}
      {isAllCorrect && (<div>
        全問正解！
      </div>)}
      <div
        ref={dropRef}
        style={{
          padding: '40px',
          background: 'red',
          color: 'white'
        }}>
        Can you drop here ?
      </div>
    </>
  );
};

export const AnagramPuzzleComponent = React.memo(Component);