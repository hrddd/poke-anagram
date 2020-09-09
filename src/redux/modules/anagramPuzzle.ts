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

export const createQuestion = actionCreator<AnswerData[]>("CREATE_QUESTION");
export const selectChar = actionCreator<string>("SELECT_CHAR");
export const deselectChar = actionCreator<string>("DESELECT_CHAR");
// export const createQuestion = actionCreator<number>("PICK_BASE_DATA");
// export const completeAnagramPuzzle = actionCreator("COMPLETE");

// state
type AnswerData = {
  id: string,
  name: string,
}

type Char = {
  id: string,
  char: string,
  isSelected: boolean,
  order: number
}

type QuestionData = {
  id: string,
  // 正規化された文字の分割データ
  name: {
    [key: string]: Char
  },
}

const initialState = {
  answerData: [] as AnswerData[],
  questionData: [] as QuestionData[],
  isComplete: false,
  currentIndex: 0,
};


const getQuestionDataWithChangingSelectedParam = ({
  questionData, targetId, shouldSelected
}: {
  questionData: QuestionData[];
  targetId: string;
  shouldSelected: boolean;
}): QuestionData[] => {
  return questionData.map((question) => {
    // 設問中の選択されたidのcharのみ変更
    const hasSelectedChar = Object.keys(question.name).some((charId) => charId === targetId)
    const selectedChar = question.name[targetId];
    return hasSelectedChar ? {
      id: question.id,
      name: {
        ...question.name,
        [targetId]: {
          ...selectedChar,
          isSelected: shouldSelected
        }
      }
    } : question;
  })
};
// TODO: isSelectedはネストが深いのでとっても見にくいし書き辛い。selectedChars[]とかにする
// TODO: dummy
const searchSelectedChars = (questionData: QuestionData): string[] => {

  const firstVal = Object.values(questionData.name)[0];
  const secondVal = Object.values(questionData.name)[1];
  if (firstVal.isSelected && secondVal.isSelected) {
    return [firstVal.id, secondVal.id]
  } else if (firstVal.isSelected) {
    return [firstVal.id]
  } else if (secondVal.isSelected) {
    return [secondVal.id]
  } else {
    return []
  }
};


// reducer
export const reducer = reducerWithInitialState(initialState)
  .case(createQuestion, (state, payload) => {
    const questionData = payload.map(({ id, name }) => {
      const shuffledNames = shuffle<string>(name.split(''));
      return {
        id,
        name: shuffledNames.reduce((memo: { [key: string]: Char }, char, idx) => {
          const charId = `${id}_${char}_${idx}`;
          memo[charId] = {
            id: charId,
            char: char,
            isSelected: false,
            order: idx
          }
          return memo
        }, {})
      }
    });
    return {
      ...state,
      answerData: payload,
      questionData
    }
  })
  .case(selectChar, (state, payload) => {
    const questionData = getQuestionDataWithChangingSelectedParam({
      questionData: state.questionData,
      targetId: payload,
      shouldSelected: true,
    })
    // TODO: dummy
    const selectedChars = searchSelectedChars(questionData[0]);
    if (selectedChars.length > 1) {
      questionData[0] = {
        id: questionData[0].id,
        name: {
          ...questionData[0].name,
          [selectedChars[0]]: {
            ...questionData[0].name[selectedChars[0]],
            order: questionData[0].name[selectedChars[1]].order
          },
          [selectedChars[1]]: {
            ...questionData[0].name[selectedChars[1]],
            order: questionData[0].name[selectedChars[0]].order
          }
        }
      }
      return {
        ...state,
        questionData
      }
    } else {
      return {
        ...state,
        questionData
      }
    }

  })
  .case(deselectChar, (state, payload) => {
    const questionData = getQuestionDataWithChangingSelectedParam({
      questionData: state.questionData,
      targetId: payload,
      shouldSelected: false,
    })
    return {
      ...state,
      questionData
    }
  })
// .case(pickAnswerData, (state, step) => {
//   const pickedData = state.AnswerData.slice(0, Math.min(step, state.AnswerData.length));
//   return {
//     ...state,
//     AnswerData: payload
//   }
// })
// .case(setAnagramPuzzleAnswerData, (state, { data, step }) => {
//   const AnswerData = shuffle<AnswerData>(data.map(({ id, name: {
//     japanese: name
//   } }) => {
//     return {
//       id,
//       name
//     }
//   })).slice(0, Math.min(step, data.length));

//   const questionData = AnswerData.map(({ id, name }) => {
//     return {
//       id,
//       name: shuffle<string>(name.split('')).map((char, idx) => ({
//         id: `${id}_${char}_${idx}`,
//         char: char,
//         isSelected: false,
//         order: idx
//       }))
//     }
//   });

//   return {
//     ...state,
//     AnswerData,
//     questionData
//   };
// })
// .case(selectChar, (state, { questionId, charId }) => {
//   // 該当の設問の文字だけ更新
//   const questionData = [...state.questionData].map((question) => {
//     return question.id === questionId ? {
//       id: question.id,
//       name: question.name.map((char) => {
//         return char.id === charId ? {
//           id: char.id,
//           char: char.char,
//           isSelected: !char.isSelected,
//           order: char.order
//         } : char
//       })
//     } : question;
//   })
//   return {
//     ...state,
//     questionData
//   };
// })
// .case(completeAnagramPuzzle, (state) => {
//   return {
//     ...state,
//     isComplete: true
//   };
// });

// selector
export const selectAnagramPuzzle = createSelector(
  (state: RootState) => state.ui.anagramPuzzle,
  (anagramPuzzle) => ({
    ...anagramPuzzle,
    currentStep: anagramPuzzle.currentIndex + 1,
    maxStep: anagramPuzzle.answerData.length,
  })
);

export type SelectedAnagramPuzzle = ReturnType<typeof selectAnagramPuzzle>;
export type State = typeof initialState;