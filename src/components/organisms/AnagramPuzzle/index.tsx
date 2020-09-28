import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnaglamPuzzle';
import { selectAnagramPuzzle, selectChar, SelectCharPayload, createQuestion, checkAnswers, swapChars, deselectChar } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { AnagramPuzzleStatus } from "./AnagramPuzzleStatus";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, selectedChar, currentQIndex, existedQLength, isAllCorrect } = useSelector(selectAnagramPuzzle);
  const [{ firstPokeData }, fetchData] = usePokeDex();
  const isTouchDevice = () => {
    return window.ontouchstart === null;
  }

  useEffect(() => {
    fetchData();
  }, [fetchData])

  useEffect(() => {
    // TODO: 無駄に複数回走るので調整する
    dispatch(createQuestion(firstPokeData.slice(0, 2)));
  }, [dispatch, firstPokeData])

  const handleOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleOnDrop = useCallback(([
    before,
    after,
  ]: SelectCharPayload[]) => {
    dispatch(swapChars([before, after]))
    dispatch(checkAnswers())
    dispatch(deselectChar())
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
      {questions.length > 0 && (
        <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
          <AnagramPuzzleComponent
            // TODO: questionsのlengthは1個以上、と規定したい
            questions={[questions[currentQIndex]]}
            handleOnClick={handleOnClick}
            handleOnDrop={handleOnDrop}
          />
        </DndProvider>
      )}
      {isAllCorrect
        && (<div>
          全問正解！
      </div>)
        || (<AnagramPuzzleStatus
          existedQLength={existedQLength}
          nextQ={questions[currentQIndex + 1] ? questions[currentQIndex + 1].name : 'コレが最後の問題です'}
        />)}
    </div>);
};

export const AnagramPuzzle = Component;
