import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// actions
const actionCreator = actionCreatorFactory('anagramPuzzle');

export const setAnagramPuzzleBaseData = actionCreator<PokeDex>("SET_DATA");
export const completeAnagramPuzzle = actionCreator("COMPLETE");

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
export const anagramPuzzle = reducerWithInitialState(initialState)
  .case(setAnagramPuzzleBaseData, (state, pokeDex) => {
    const dispPokeDex = pokeDex.map(({ id, name: {
      japanese: name
    } }) => {
      return {
        id,
        name
      }
    });

    return {
      ...state,
      data: dispPokeDex
    };
  })
  .case(completeAnagramPuzzle, (state) => {
    return {
      ...state,
      isComplete: true
    };
  });

// selector
export const selectAnagramPuzzle = createSelector(
  (state: RootState) => state.ui.anagramPuzzle,
  (anagramPuzzle) => ({
    ...anagramPuzzle,
    currentStep: anagramPuzzle.currentIndex + 1,
    maxStep: anagramPuzzle.data.length,
  })
);

export type SelectedAnagramPuzzle = ReturnType<typeof selectAnagramPuzzle>;
