import { reducerWithInitialState } from "typescript-fsa-reducers";
import { createSelector } from "reselect";
import { RootState } from "./reducer";
import actionCreatorFactory from "typescript-fsa";
import { selectPokeData } from './pokeData';

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
type SelectPayload = {
  questionId: string,
  charIndex: number,
}
export const createQuestion = actionCreator<Base[]>("CREATE_QUESTION");
export const selectChar = actionCreator<SelectPayload>("SELECT_CHAR");
export const deselectChar = actionCreator("DESELECT_CHAR");

// state
type Base = {
  id: string,
  name: string,
}

type Question = {
  id: string,
  chars: string[],
}

type SelectedChar = {
  questionId: string,
  charIndex: number
} | null

const initialState = {
  answers: [] as Base[],
  questions: [] as Question[],
  selectedChar: null as SelectedChar,
  isComplete: false,
  currentIndex: 0,
};

// reducer
const generateQuestionData = (base: Base[]) => {
  return base.map(({ id, name }) => {
    return {
      id,
      chars: shuffle<string>(name.split('')),
    }
  })
}
export const reducer = reducerWithInitialState(initialState)
  .case(createQuestion, (state, baseData) => {
    return {
      ...state,
      answers: [...baseData],
      questions: generateQuestionData(baseData)
    }
  })
  .case(selectChar, (state, selectedChar) => {
    return {
      ...state,
      selectedChar
    }
  })
  .case(deselectChar, (state) => {
    return {
      ...state,
      selectedChar: null
    }
  })

// selector
// export const selectAnagramPuzzle = createSelector(
//   (state: RootState) => state.ui.anagramPuzzle,
//   ({ questions, isComplete, currentIndex }) => ({
//     questions,
//     isComplete,
//     currentIndex,
//     currentStep: currentIndex + 1,
//     maxStep: Object.keys(questions).length,
//   })
// );

// export type SelectedAnagramPuzzle = ReturnType<typeof selectAnagramPuzzle>;
export type State = typeof initialState;