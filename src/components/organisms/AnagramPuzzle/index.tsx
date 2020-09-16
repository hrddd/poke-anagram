import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnaglamPuzzle';
import { selectAnagramPuzzle, selectChar, SelectCharPayload, createQuestion, checkAnswers, swapChars } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';

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
    const payload: SelectCharPayload = {
      questionId,
      charIndex,
    }
    if (selectedChar?.questionId === questionId
      && selectedChar?.charIndex !== charIndex) {
      dispatch(swapChars(payload))
      dispatch(checkAnswers())
    } else {
      dispatch(selectChar(payload))
    }
  }, [dispatch, selectedChar])

  return (<AnagramPuzzleComponent
    questions={questions}
    isAllCorrect={isAllCorrect}
    handleOnClick={handleOnClick}
  />);
};

export const AnagramPuzzle = Component;
