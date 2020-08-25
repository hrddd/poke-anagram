import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnaglamPuzzle';
import { selectAnagramPuzzle, setAnagramPuzzleBaseData } from '../../../redux/modules/anagramPuzzle';
import { usePokeDex } from "../../hooks/usePokeDex";
import { useCallback } from 'react';

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const anagramPuzzle = useSelector(selectAnagramPuzzle);
  const [pokeData, fetchData] = usePokeDex();

  useEffect(() => {
    fetchData();
  }, [fetchData])

  useEffect(() => {
    dispatch(setAnagramPuzzleBaseData({
      data: pokeData.firstPokeData,
      step: 10
    }));
  }, [dispatch, pokeData.firstPokeData])

  const handleOnClick = useCallback((e: React.MouseEvent) => {
    console.log(e.target)
  }, [])

  return (<AnagramPuzzleComponent
    anagramPuzzle={anagramPuzzle}
    handleOnClick={handleOnClick}
  />);
};

export const AnagramPuzzle = Component;
