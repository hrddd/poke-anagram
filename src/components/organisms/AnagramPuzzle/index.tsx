import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnaglamPuzzle';
import { selectAnagramPuzzle, selectChar, SelectCharPayload, createQuestion, checkAnswers, swapChars, deselectChar, finishTimeAttack, startTimeAttack, reset, setQuestionLength } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { AnagramPuzzleStatus } from "./AnagramPuzzleStatus";
import { Item } from "../../hooks/useSortableItem";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, inputQuestionLength, selectedChar, currentQIndex, existedQLength, isAllCorrect, resultTime, needsInitialize } = useSelector(selectAnagramPuzzle);
  const [{ firstPokeData }, fetchData] = usePokeDex();
  const isTouchDevice = () => {
    return window.ontouchstart === null;
  }

  useEffect(() => {
    fetchData();
  }, [fetchData])

  useEffect(() => {
    if (isAllCorrect) {
      dispatch(finishTimeAttack(new Date()));
    }
  }, [dispatch, isAllCorrect])

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

  const handleClickStart = useCallback(() => {
    dispatch(reset())
    dispatch(createQuestion({
      baseData: firstPokeData,
      length: inputQuestionLength
    }))
    dispatch(startTimeAttack(new Date()))
  }, [dispatch, firstPokeData, inputQuestionLength])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionLength(parseInt(e.currentTarget.value)))
  }, [dispatch])

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      {isAllCorrect
        && (<div>
          全問正解！
          <br />
          <br />
          {resultTime && `かかった時間は ${resultTime / 1000}秒 です`}
          <br />
          <br />
          <input
            type="range"
            min="1"
            max={firstPokeData.length}
            value={inputQuestionLength}
            onChange={handleChange}
          />
          <br />
          {inputQuestionLength}問
          <br />
          <button onClick={handleClickStart}>
            retry!
          </button>
        </div>)
        || needsInitialize && (
          <>
            <input
              type="range"
              min="1"
              max={firstPokeData.length}
              value={inputQuestionLength}
              onChange={handleChange}
            />
            <br />
            {inputQuestionLength}問
            <br />
            <button onClick={handleClickStart}>
              ゲームを始める
            </button>
          </>
        )
        || !needsInitialize && (
          <>
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
            <AnagramPuzzleStatus
              existedQLength={existedQLength}
              nextQ={questions[currentQIndex + 1] ? questions[currentQIndex + 1].name : 'コレが最後の問題です'}
            />
          </>)}
    </div>);
};

export const AnagramPuzzle = Component;
