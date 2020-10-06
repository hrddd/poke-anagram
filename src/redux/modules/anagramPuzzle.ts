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
interface NormalizeAbleById {
  id: string
}
const normalizeById = <T extends NormalizeAbleById>([...array]: T[]): { [key: string]: T } => {
  if (array.length === 0) return {}
  if (!array[0].id) {
    throw new Error('Can not normalize by Id')
  }
  return array.reduce((memo, value) => {
    return {
      ...memo,
      [value.id]: value
    }
  }, {})
}

// actions
const actionCreator = actionCreatorFactory('anagramPuzzle');
export type CreateQuestionPayload = {
  baseData: Base[],
  length?: number,
}
export type SelectCharPayload = {
  questionId: string,
  charIndex: number,
}
export const createQuestion = actionCreator<CreateQuestionPayload>("CREATE_QUESTION");
export const selectChar = actionCreator<SelectCharPayload>("SELECT_CHAR");
export const deselectChar = actionCreator("DESELECT_CHAR");
export const swapChars = actionCreator<SelectCharPayload[]>("SWAP_CHAR");
export const checkAnswers = actionCreator("CHECK_ANSWERS");
export const startTimeAttack = actionCreator<Date>("START_TIME_ATTACK");
export const finishTimeAttack = actionCreator<Date>("FINISH_TIME_ATTACK");
export const reset = actionCreator("RESET");
export const setQuestionLength = actionCreator<number>("SET_QUESTION_LENGTH");

// state
type Base = {
  id: string,
  name: string,
}

type Answer = {
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

type NullableDate = Date | null

const initialState = {
  answers: {} as {
    [key in string]: Answer
  },
  questions: [] as Question[],
  inputQuestionLength: 1,
  selectedChar: null as SelectedChar,
  correctQuestions: [] as Question['id'][],
  startDate: null as NullableDate,
  endDate: null as NullableDate
};

// reducer
export const reducer = reducerWithInitialState(initialState)
  .case(createQuestion, (state, { baseData, length }) => {
    const slicedData = shuffle<Base>(baseData).slice(0, length)
    const _createQuestion = ({ id, name: _name }: Base) => {
      const name = shuffle<string>(_name.split('')).join('')
      return {
        id,
        name,
        currentName: name
      }
    }
    return {
      ...state,
      answers: normalizeById(slicedData),
      questions: slicedData.map(_createQuestion)
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
  .case(swapChars, (state, targetChars) => {
    // 同じ問題の中で、別の文字が選択されていた場合
    if (
      targetChars.length !== 2
      || targetChars[0].questionId !== targetChars[1].questionId
      || targetChars[0].charIndex === targetChars[1].charIndex
    ) {
      return { ...state }
    }
    const { questions } = state;
    const targetQIndex = state.questions.reduce((acc, question) => [...acc, question.id], [] as string[]).indexOf(targetChars[0].questionId);
    const targetQ = questions[targetQIndex];
    return {
      ...state,
      questions: [
        ...questions.slice(0, targetQIndex),
        {
          ...targetQ,
          // 文字を入れ替える
          currentName: swap(
            targetQ.currentName.split(''),
            targetChars[0].charIndex,
            targetChars[1].charIndex
          ).join('')
        },
        ...questions.slice(targetQIndex + 1),
      ]
    }
  })
  .case(checkAnswers, (state) => {
    const { answers, questions } = state;
    const correctQuestions = questions
      .filter(q => q.currentName === answers[q.id].name)
      .reduce((acc, q) => [...acc, q.id], [] as string[])
    return {
      ...state,
      correctQuestions
    }
  })
  .case(startTimeAttack, (state, startDate: Date = new Date()) => {
    return {
      ...state,
      startDate
    }
  })
  .case(finishTimeAttack, (state, endDate: Date = new Date()) => {
    return {
      ...state,
      endDate
    }
  })
  .case(reset, () => {
    return {
      ...initialState
    }
  })
  .case(setQuestionLength, (state, length: number) => {
    return {
      ...state,
      inputQuestionLength: length
    }
  })

// selector
const generateQuestionViewData = ({
  questions,
  selectedChar,
  correctQuestions
}: {
  questions: Question[],
  selectedChar: SelectedChar,
  correctQuestions: Question['id'][]
}) => {
  return questions.map((question) => ({
    id: question.id,
    name: question.name,
    chars: question.currentName.split('').map((char, idx) => ({
      char,
      isSelected: selectedChar?.questionId === question.id && selectedChar.charIndex === idx
    })),
    isCorrect: correctQuestions.includes(question.id)
  }))
}
// かかった時間をdateオブジェクトから算出してmsで返す
export const getResultTime = (startDate: NullableDate, endDate: NullableDate) => {
  if (startDate === null || endDate === null) return null
  if (endDate < startDate) {
    throw new Error('Can you go back in time?')
  }
  return endDate.getTime() - startDate.getTime()
}
export const selectAnagramPuzzle = createSelector(
  (state: RootState) => state.ui.anagramPuzzle,
  ({ questions, selectedChar, correctQuestions, startDate, endDate, inputQuestionLength }) => ({
    questions: generateQuestionViewData({ questions, selectedChar, correctQuestions }),
    selectedChar,
    currentQIndex: correctQuestions.length,
    existedQLength: questions.length - correctQuestions.length,
    isAllCorrect: correctQuestions.length === questions.length && questions.length !== 0,
    resultTime: getResultTime(startDate, endDate),
    needsInitialize: questions.length === 0,
    inputQuestionLength,
  })
);

export type SelectedAnagramPuzzle = ReturnType<typeof selectAnagramPuzzle>;
export type State = typeof initialState;