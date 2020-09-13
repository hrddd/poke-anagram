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
// const getValues = <T>([...array]: T[], key: keyof T) => {
//   return array.reduce((acc, item) => [...acc, item[key]], [] as any[]);
// }
const swap = <T>([...array]: T[], index1: number, index2: number): T[] => {
  const x = Math.min(index1, index2)
  const y = Math.max(index1, index2)

  return [
    ...array.slice(0, x),
    array[y],
    ...array.slice(x + 1, y),
    array[x],
    ...array.slice(y + 1),
  ];
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
export const swapChars = actionCreator<SelectPayload>("SWITCH_CHAR");

// state
type Base = {
  id: string,
  name: string,
}

type Question = {
  id: string,
  name: string,
  currentName: string,
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
    const shuffledName = shuffle<string>(name.split('')).join('');
    return {
      id,
      name: shuffledName,
      currentName: shuffledName
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
  .case(swapChars, (state, nextSelectedChar) => {
    if (state.selectedChar === null || state.selectedChar.questionId !== nextSelectedChar.questionId) {
      return { ...state }
    }
    const { questions, selectedChar } = state;
    const targetQIndex = state.questions.reduce((acc, question) => [...acc, question.id], [] as string[]).indexOf(selectedChar.questionId);
    const targetQ = questions[targetQIndex];
    return {
      ...state,
      questions: [
        ...questions.slice(0, targetQIndex),
        {
          id: targetQ.id,
          name: targetQ.name,
          currentName: swap(
            targetQ.currentName.split(''),
            selectedChar.charIndex,
            nextSelectedChar.charIndex
          ).join('')
        },
        ...questions.slice(targetQIndex + 1),
      ],
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