import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// util
const generateLightData = (pokeDex: PokeDex) => {
  return pokeDex.map((pokeData) => ({
    id: pokeData.id.toString(),
    name: pokeData.name.japanese
  }))
}

// actions
const actionCreator = actionCreatorFactory('pokeData');

export const fetchPokeData = actionCreator.async<string, PokeDex, string>("FETCH");

// state
type LightPokeData = {
  id: string;
  name: string;
}
const initialState = {
  allPokeData: [] as LightPokeData[],
  isLoading: false,
};

// reducer
export const pokeData = reducerWithInitialState(initialState)
  .case(fetchPokeData.started, (state) => ({
    ...state,
    isLoading: true,
  }))
  .case(fetchPokeData.done, (state, { result: allPokeData }) => ({
    ...state,
    allPokeData: generateLightData(allPokeData),
    isLoading: false,
  }))
  .case(fetchPokeData.failed, (state) => ({
    ...state,
    isLoading: false,
  }));

// selector
export const selectPokeData = createSelector(
  (state: RootState) => state.resources.pokeData,
  (pokeData) => ({
    ...pokeData,
    firstPokeData: pokeData.allPokeData.slice(0, 151)
  })
);

export type SelectedPokeData = ReturnType<typeof selectPokeData>;
