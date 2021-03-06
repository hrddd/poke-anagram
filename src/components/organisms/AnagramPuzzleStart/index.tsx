import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleStartComponent } from './AnagramPuzzleStart';
import { selectAnagramPuzzle, createQuestion, startTimeAttack, reset, setQuestionLength } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { LoadingModal } from "../LoadingModal";
import { PLAY_PATH } from '../../../App';

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const { inputQuestionLength } = useSelector(selectAnagramPuzzle);
  const [{ firstPokeData }, fetchData] = usePokeDex();
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [fetchData])

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
    dispatch(setQuestionLength(parseInt(e.currentTarget.value)))
  }, [dispatch])

  return (
    (firstPokeData.length === 0
      && (<LoadingModal />))
    || (<AnagramPuzzleStartComponent
      max={firstPokeData.length}
      currentLength={inputQuestionLength}
      handleChange={handleChange}
      handleClick={handleClick}
    />)
  );
};

export const AnagramPuzzleStart = Component;
