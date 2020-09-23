import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnaglamPuzzle';
import { selectAnagramPuzzle, selectChar, SelectCharPayload, createQuestion, checkAnswers, swapChars, deselectChar } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, selectedChar, isAllCorrect } = useSelector(selectAnagramPuzzle);
  const [{ firstPokeData }, fetchData] = usePokeDex();

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
  }, [dispatch])

  return (
    <DndProvider backend={HTML5Backend}>
      <AnagramPuzzleComponent
        questions={questions}
        isAllCorrect={isAllCorrect}
        handleOnClick={handleOnClick}
        handleOnDrop={handleOnDrop}
      />
    </DndProvider>);
};

export const AnagramPuzzle = Component;
