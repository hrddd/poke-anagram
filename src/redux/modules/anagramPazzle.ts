import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// actions
const actionCreator = actionCreatorFactory();

export const setAnagramPazzleBaseData = actionCreator<PokeDex>("SET_DATA");
export const completeAnagramPazzle = actionCreator("COMPLETE");

// state
type DispPokeData = {
  id: PokeData['id'],
  name: PokeData['name']['japanese'],
}
type DispPokeDex = DispPokeData[];

const initialState = {
  data: [] as DispPokeDex,
  isLoading: false,
  isComplete: false,
  currentIndex: 0,
};

// reducer
export const anagramPazzle = reducerWithInitialState(initialState)
  .case(setAnagramPazzleBaseData, (state, pokeDex) => {
    const dispPokeDex = [{
      "id": 1,
      "name": "フシギダネ"
    }]
    return {
      ...state,
      data: dispPokeDex
    };
  })
  .case(completeAnagramPazzle, (state) => {
    return {
      ...state,
      isComplete: true
    };
  });

// selector
export const selectAnagramPazzle = createSelector(
  (state: RootState) => state.ui.anagramPazzle,
  (anagramPazzle) => ({
    ...anagramPazzle,
    currentStep: anagramPazzle.currentIndex + 1,
    maxStep: anagramPazzle.data.length,
  })
);

export type SelectedAnagramPazzle = ReturnType<typeof selectAnagramPazzle>;
