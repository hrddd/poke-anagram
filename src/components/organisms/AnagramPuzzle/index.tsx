import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnaglamPuzzle';
import { selectAnagramPuzzle, setAnagramPuzzleBaseData, selectChar, SelectCharPayload } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const anagramPuzzle = useSelector(selectAnagramPuzzle);
  const [{ firstPokeData }, fetchData] = usePokeDex();

  useEffect(() => {
    fetchData();
  }, [fetchData])

  useEffect(() => {
    dispatch(setAnagramPuzzleBaseData({
      data: firstPokeData,
      step: 10
    }));
  }, [dispatch, firstPokeData])

  const handleOnClick = useCallback((payload: SelectCharPayload) => {
    dispatch(selectChar(payload))
  }, [dispatch])

  return (<AnagramPuzzleComponent
    anagramPuzzle={anagramPuzzle}
    handleOnClick={handleOnClick}
  />);
};

export const AnagramPuzzle = Component;
