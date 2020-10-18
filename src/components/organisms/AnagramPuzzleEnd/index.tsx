import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { AnagramPuzzleEndComponent } from './AnagramPuzzleEnd';
import { selectAnagramPuzzle, createQuestion, startTimeAttack, reset, setQuestionLength } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { PLAY_PATH } from "../../../App";

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const { inputQuestionLength, resultTime } = useSelector(selectAnagramPuzzle);
  const [{ firstPokeData }] = usePokeDex();
  const history = useHistory();

  const handleClick = useCallback(() => {
    dispatch(reset())
    dispatch(createQuestion({
      baseData: firstPokeData,
      length: inputQuestionLength
    }))
    dispatch(startTimeAttack(new Date()))
    history.push(PLAY_PATH)
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
