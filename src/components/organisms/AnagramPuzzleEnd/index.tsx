import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleEndComponent } from './AnagramPuzzleEnd';
import { selectAnagramPuzzle, createQuestion, startTimeAttack, reset, setQuestionLength } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';
import { useHistory } from "react-router-dom";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, inputQuestionLength, resultTime } = useSelector(selectAnagramPuzzle);
  const [{ firstPokeData }] = usePokeDex();
  const history = useHistory();

  useEffect(() => {
    if (questions.length === 0) {
      history.push("/")
    }
  }, [history, questions])

  const handleClick = useCallback(() => {
    dispatch(reset())
    dispatch(createQuestion({
      baseData: firstPokeData,
      length: inputQuestionLength
    }))
    dispatch(startTimeAttack(new Date()))
    history.push('/anagram')
  }, [dispatch, firstPokeData, history, inputQuestionLength])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value)
    dispatch(setQuestionLength(parseInt(e.currentTarget.value)))
  }, [dispatch])

  return (<AnagramPuzzleEndComponent
    resultTime={resultTime}
    max={firstPokeData.length}
    currentLength={inputQuestionLength}
    handleChange={handleChange}
    handleClick={handleClick}
  />);
};

export const AnagramPuzzleEnd = Component;
