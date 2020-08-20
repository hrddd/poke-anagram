import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { AnagramPazzleComponent } from './AnaglamPazzle';
import { selectAnagramPazzle, setAnagramPazzleBaseData } from '../../../redux/modules/anagramPazzle';
import { fetchPokeData, selectPokeData } from '../../../redux/modules/pokeData';

const Component: React.FC = () => {
  const anagramPazzle = useSelector(selectAnagramPazzle);
  const pokeData = useSelector(selectPokeData);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPokeData.started);
  // }, [dispatch])

  useEffect(() => {
    dispatch(setAnagramPazzleBaseData([{
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

  return (<AnagramPazzleComponent
    anagramPazzle={anagramPazzle}
  />);
};

export const AnagramPazzle = Component;
