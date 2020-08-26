import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";

// util
const shuffle = <T>([...array]: T[]): T[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// actions
const actionCreator = actionCreatorFactory('anagramPuzzle');

type SetPayload = {
  data: PokeDex,
  step: number
};
export const setAnagramPuzzleBaseData = actionCreator<SetPayload>("SET_DATA");
export const completeAnagramPuzzle = actionCreator("COMPLETE");
export const selectChar = actionCreator<Char['id']>("SELECT_CHAR");

// state
type BaseData = {
  id: number,
  name: string,
}

type Char = {
  id: string,
  char: string,
  isSelected: boolean,
  order: number
}

type QuestionData = {
  id: number,
  name: Char[],
}

const initialState = {
  baseData: [] as BaseData[],
  questionData: [] as QuestionData[],
  isLoading: false,
  isComplete: false,
  currentIndex: 0,
};

// reducer
export const anagramPuzzle = reducerWithInitialState(initialState)
  .case(setAnagramPuzzleBaseData, (state, { data, step }) => {
    const baseData = shuffle<BaseData>(data.map(({ id, name: {
      japanese: name
    } }) => {
      return {
        id,
        name
      }
    })).slice(0, Math.min(step, data.length));

    const questionData = baseData.map(({ id, name }) => {
      return {
        id,
        name: shuffle<string>(name.split('')).map((char, idx) => ({
          id: `${id}_${char}_${idx}`,
          char: char,
          isSelected: false,
          order: idx
        }))
      }
    });

    return {
      ...state,
      baseData,
      questionData
    };
  })
  .case(selectChar, (state) => {
    return {
      ...state,
      isComplete: true
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
    maxStep: anagramPuzzle.baseData.length,
  })
);

export type SelectedAnagramPuzzle = ReturnType<typeof selectAnagramPuzzle>;
