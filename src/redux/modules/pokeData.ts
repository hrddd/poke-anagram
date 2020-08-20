import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// actions
const actionCreator = actionCreatorFactory();

export const fetchPokeData = actionCreator.async<{}, PokeDex, {}>("FETCH");

// state
const initialState = {
  data: [] as PokeDex,
  isLoading: false,
};

// reducer
export const pokeData = reducerWithInitialState(initialState)
  .case(fetchPokeData.started, (state) => ({
    ...state,
    isLoading: true,
  }))
  .case(fetchPokeData.done, (state, { result: data }) => ({
    ...state,
    data,
    isLoading: false,
  }))
  .case(fetchPokeData.failed, (state) => ({
    ...state,
    isLoading: false,
  }));

// selector
export const selectPokeData = createSelector(
  (state: RootState) => state.resources.pokeData,
  (pokeData) => pokeData
);

export type SelectedPokeData = ReturnType<typeof selectPokeData>;
