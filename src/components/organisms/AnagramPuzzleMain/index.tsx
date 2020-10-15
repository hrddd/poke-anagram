import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnagramPuzzleMain';
import { selectAnagramPuzzle, selectChar, SelectCharPayload, checkAnswers, swapChars, deselectChar, finishTimeAttack } from '../../../redux/modules/anagramPuzzle';
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { Item } from '../../hooks/useSwapableItem';
import { Status } from '../../molecules/Status/index';
import { useHistory } from "react-router-dom";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, selectedChar, currentQIndex, existedQLength, isAllCorrect } = useSelector(selectAnagramPuzzle);
  const isTouchDevice = () => {
    return window.ontouchstart === null;
  }
  const history = useHistory();

  // TODO: useEffectじゃない方がいい
  // updateの後、render評価後になるので
  // middlewareがいいかな、、、
  useEffect(() => {
    if (isAllCorrect) {
      dispatch(finishTimeAttack(new Date()));
      history.push("/end")
    }
  }, [dispatch, history, isAllCorrect])

  useEffect(() => {
    if (questions.length === 0) {
      history.push("/")
    }
  }, [history, questions])

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const questionId = e.currentTarget.name
    const charIndex = Number(e.currentTarget.value)
    const currentSelectedChar: SelectCharPayload = {
      questionId,
      charIndex,
    }
    if (selectedChar?.questionId === questionId
      && selectedChar?.charIndex !== charIndex) {
      // すでに選択済みの文字があり、入れ替え可能な場合
      dispatch(swapChars([selectedChar, currentSelectedChar]))
      dispatch(checkAnswers())
      dispatch(deselectChar())
    } else if (selectedChar?.questionId === questionId
      && selectedChar?.charIndex === charIndex) {
      // 選択済みの文字をクリックした場合
      dispatch(deselectChar())
    } else {
      dispatch(selectChar(currentSelectedChar))
    }
  }, [dispatch, selectedChar])

  const handleDrop = useCallback(([
    before,
    after,
  ]: [Item, Item]) => {
    dispatch(swapChars([{
      questionId: before.id,
      charIndex: before.index
    }, {
      questionId: after.id,
      charIndex: after.index
    }]))
    dispatch(checkAnswers())
    dispatch(deselectChar())
  }, [dispatch])

  return (
    questions.length !== 0 &&
    (<>
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <AnagramPuzzleComponent
          // TODO: questionsのlengthは1個以上、と規定したい
          // TODO: 最後の問題に回答し終わった際に、currentQIndexをcorrectQuestions.lengthから出しているため、
          // 存在しないエラー。元々、全問正解時には表出しないので、分岐で逃げるが
          // そもそもcurrentQIndexでココで絞り込んでるのがよくない
          // あとContainerにもtestは必要に思う
          questions={[questions[currentQIndex]]}
          handleClick={handleClick}
          handleDrop={handleDrop}
        />
      </DndProvider>
      <Status
        existedQLength={existedQLength}
        nextQ={questions[currentQIndex + 1] ? questions[currentQIndex + 1].name : 'コレが最後の問題です'}
      />
    </>) || null
  );
};

export const AnagramPuzzleMain = Component;
