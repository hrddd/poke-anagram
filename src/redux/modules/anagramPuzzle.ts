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
const denormalizeByOrder = <T extends ICanBeDenormalized>({ ...obj }: {
  [key: string]: T
}): T[] => {
  return Object.values(obj).sort((item) => item.order)
}
const uniq = <T>([...array]: T[]): T[] => {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
}

// actions
const actionCreator = actionCreatorFactory('anagramPuzzle');
type SelectPayload = {
  questionId: string,
  charId: string,
}
export const createQuestion = actionCreator<Name[]>("CREATE_QUESTION");
export const selectChar = actionCreator<SelectPayload>("SELECT_CHAR");
export const deselectChar = actionCreator<SelectPayload>("DESELECT_CHAR");

// state
interface ICanBeNormalized {
  id: string;
}

interface ICanBeDenormalized {
  order: number;
}

type Name = {
  id: string,
  name: string,
}

type QuestionBaseData = {
  id: string,
  name: string,
  order: number
}

type AnswerData = {
  id: string,
  name: string,
  order: number
}

type Char = {
  id: string,
  char: string,
  order: number
}

type QuestionData = {
  id: string,
  selectedChars: string[];
  order: number;
  // 正規化された文字の分割データ
  chars: {
    [key: string]: Char
  },
}

const initialState = {
  answerData: {} as {
    [key: string]: AnswerData
  },
  questionData: {} as {
    [key: string]: QuestionData
  },
  isComplete: false,
  currentIndex: 0,
};

// reducer
const generateQuestionData = (nameWithOrder: QuestionBaseData[]) => {
  return normalizeById(nameWithOrder.map(({ id, name }, qIdx) => {
    const shuffledNames = shuffle<string>(name.split(''));
    return {
      id,
      selectedChars: [],
      order: qIdx,
      chars: normalizeById(shuffledNames.map((char, idx) => {
        const charId = `${id}_${char}_${idx}`;
        return {
          id: charId,
          char: char,
          order: idx
        }
      }))
    }
  }))
}
export const reducer = reducerWithInitialState(initialState)
  .case(createQuestion, (state, name) => {
    const nameWithOrder = name.map((item, idx) => ({
      ...item,
      order: idx
    }))
    return {
      ...state,
      answerData: normalizeById(nameWithOrder),
      questionData: generateQuestionData(nameWithOrder)
    }
  })
  .case(selectChar, (state, { questionId, charId }) => {
    const selectedChars = uniq([...state.questionData[questionId].selectedChars, charId])
    if (selectedChars.length === 1) {
      // 選択状態が一個ならそのまま反映
      return {
        ...state,
        questionData: {
          ...state.questionData,
          [questionId]: {
            ...state.questionData[questionId],
            selectedChars
          }
        }
      }
    } else if (selectedChars.length === 2) {
      // 選択状態が二個なら順番を入れ替えて選択状態を解除
      const firstChar = state.questionData[questionId].chars[selectedChars[0]]
      const secondChar = state.questionData[questionId].chars[selectedChars[1]]
      return {
        ...state,
        questionData: {
          ...state.questionData,
          [questionId]: {
            ...state.questionData[questionId],
            selectedChars: [],
            chars: {
              ...state.questionData[questionId].chars,
              [firstChar.id]: {
                ...firstChar,
                order: secondChar.order
              },
              [secondChar.id]: {
                ...firstChar,
                order: firstChar.order
              }
            }
          }
        }
      }
    } else {
      // それ以外は選択状態を解除するのみ
      return {
        ...state,
        questionData: {
          ...state.questionData,
          [questionId]: {
            ...state.questionData[questionId],
            selectedChars: []
          }
        }
      }
    }
  })
  .case(deselectChar, (state, { questionId, charId }) => {
    const selectedChars = state.questionData[questionId].selectedChars;
    return {
      ...state,
      questionData: {
        ...state.questionData,
        [questionId]: {
          ...state.questionData[questionId],
          selectedChars: [...selectedChars].splice(1, selectedChars.indexOf(charId))
        }
      }
    }
  })

// selector
export const selectAnagramPuzzle = createSelector(
  (state: RootState) => state.ui.anagramPuzzle,
  (anagramPuzzle) => ({
    questionData: denormalizeByOrder(anagramPuzzle.questionData),
    isComplete: anagramPuzzle.isComplete,
    currentIndex: anagramPuzzle.currentIndex,
    currentStep: anagramPuzzle.currentIndex + 1,
    maxStep: Object.keys(anagramPuzzle.answerData).length,
  })
);

export type SelectedAnagramPuzzle = ReturnType<typeof selectAnagramPuzzle>;
export type State = typeof initialState;