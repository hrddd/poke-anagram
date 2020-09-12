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
interface ICanBeNormalized {
  id: string;
}
const normalizeById = <T extends ICanBeNormalized>([...array]: T[]): { [key: string]: T } => {
  if (array.length === 0 || !array[0].id) {
    throw new Error('Cant normalizeById')
  }
  return array.reduce((memo, value) => {
    return {
      ...memo,
      [value.id]: value
    }
  }, {})
}
const uniq = <T>([...array]: T[]): T[] => {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
}

// state
type Base = {
  id: string,
  name: string,
}

type Question = {
  id: string,
  chars: string[],
}

const initialState = {
  answers: [] as Base[],
  questions: [] as Question[],
  isComplete: false,
  currentIndex: 0,
};

// actions
const actionCreator = actionCreatorFactory('anagramPuzzle');
type SelectPayload = {
  charId: string,
}
export const createQuestion = actionCreator<Base[]>("CREATE_QUESTION");
export const selectChar = actionCreator<SelectPayload>("SELECT_CHAR");
export const deselectChar = actionCreator<SelectPayload>("DESELECT_CHAR");

// reducer
const generateQuestionData = (base: Base[]) => {
  return base.map(({ id, name }) => {
    return {
      id,
      chars: shuffle<string>(name.split('')),
    }
  })
}
// const updateSelectedChars = (state: State, selectedChars: Char['id'][]) => {
//   return {
//     ...state,
//     selectedChars
//   }
// }
// const switchChars = (targeChars: Char['id'][], chars: QuestionData['chars']) => {
//   const firstChar = chars[targeChars[0]]
//   const secondChar = chars[targeChars[1]]
//   return {
//     ...chars,
//     [firstChar.id]: {
//       ...firstChar,
//       order: secondChar.order
//     },
//     [secondChar.id]: {
//       ...firstChar,
//       order: firstChar.order
//     }
//   }
// }
export const reducer = reducerWithInitialState(initialState)
  .case(createQuestion, (state, baseData) => {
    return {
      ...state,
      answers: [...baseData],
      questions: generateQuestionData(baseData)
    }
  })
//   .case(selectChar, (state, { questionId, charId }) => {
//     const selectedChars = uniq([...state.selectedChars, charId])
//     if (selectedChars.length === 1) {
//       // 選択状態が一個ならそのまま反映
//       return updateSelectedChars(state, selectedChars)
//     } else if (selectedChars.length === 2) {
//       // 選択状態が二個なら順番を入れ替えて選択状態を解除
//       return {
//         ...state,
//         questionData: {
//           ...state.questionData,
//           selectedChars: [],
//           [questionId]: {
//             ...state.questionData[questionId],
//             chars: switchChars(selectedChars, state.questionData[questionId].chars)
//           }
//         }
//       }
//     } else {
//       // それ以外は選択状態を解除するのみ
//       return {
//         ...state,
//         questionData: {
//           ...state.questionData,
//           [questionId]: {
//             ...state.questionData[questionId],
//             selectedChars: []
//           }
//         }
//       }
//     }
//   })
//   .case(deselectChar, (state, { questionId, charId }) => {
//     const selectedChars = state.questionData[questionId].selectedChars;
//     return {
//       ...state,
//       questionData: {
//         ...state.questionData,
//         [questionId]: {
//           ...state.questionData[questionId],
//           selectedChars: [...selectedChars].splice(selectedChars.indexOf(charId), 1)
//         }
//       }
//     }
//   })

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