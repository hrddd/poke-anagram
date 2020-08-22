import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPuzzleComponent } from './AnaglamPuzzle';
import { selectAnagramPuzzle, setAnagramPuzzleBaseData } from '../../../redux/modules/anagramPuzzle';
import { fetchPokeData, selectPokeData } from '../../../redux/modules/pokeData';

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const anagramPuzzle = useSelector(selectAnagramPuzzle);
  const { data: pokeData } = useSelector(selectPokeData);

  // useEffect(() => {
  //   dispatch(fetchPokeData.started);
  // }, [dispatch])

  useEffect(() => {
    dispatch(setAnagramPuzzleBaseData([{
      "id": 1,
      "name": {
        "english": "Bulbasaur",
        "japanese": "フシギダネ",
        "chinese": "妙蛙种子",
        "french": "Bulbizarre"
      },
      "type": [
        "Grass",
        "Poison"
      ],
      "base": {
        "HP": 45,
        "Attack": 49,
        "Defense": 49,
        "Sp. Attack": 65,
        "Sp. Defense": 65,
        "Speed": 45
      }
    }]));
  }, [dispatch, pokeData])

  return (<AnagramPuzzleComponent
    anagramPuzzle={anagramPuzzle}
  />);
};

export const AnagramPuzzle = Component;
