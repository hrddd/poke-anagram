import { useDispatch, useSelector } from "react-redux";
import { fetchPokeData, selectPokeData } from '../../redux/modules/pokeData';
import { useCallback } from 'react';
import { loadPokeDex, getErrorMessage } from '../../apis/index';

export const usePokeDex = () => {
  const dispatch = useDispatch();
  const { data: pokeData } = useSelector(selectPokeData);
  const fetchData = useCallback(async () => {
    const params = 'Please Give Me Pokemons...';
    dispatch(fetchPokeData.started(params));
    try {
      const result = await loadPokeDex();
      dispatch(fetchPokeData.done({
        params,
        result
      }));
    } catch (e) {
      dispatch(fetchPokeData.failed({
        params,
        error: getErrorMessage(e)
      }));
    }
  }, [dispatch]);

  return [pokeData, fetchData] as const;
};