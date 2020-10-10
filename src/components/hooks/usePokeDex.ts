import { useDispatch, useSelector } from "react-redux";
import { fetchPokeData, selectPokeData } from '../../redux/modules/pokeData';
import { useCallback } from 'react';
import { loadPokeDex, getErrorMessage } from '../../apis/index';
import { open, close } from "../../redux/modules/loadingModal"

export const usePokeDex = () => {
  const dispatch = useDispatch();
  const { allPokeData, firstPokeData } = useSelector(selectPokeData);
  const fetchData = useCallback(async () => {
    const params = 'Please Give Me Pokemons...';
    dispatch(fetchPokeData.started(params));
    dispatch(open());
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
    } finally {
      dispatch(close());
    }
  }, [dispatch]);

  return [{
    allPokeData,
    firstPokeData,
  }, fetchData] as const;
};