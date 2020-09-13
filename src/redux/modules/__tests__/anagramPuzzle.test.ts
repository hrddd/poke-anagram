import { reducer, createQuestion, selectChar, deselectChar } from '../anagramPuzzle';
import { configureStore } from './configureMockStore';

const dummyData = [{
  id: '1',
  name: 'フシギダネ'
}, {
  id: '20',
  name: 'クチート'
}, {
  id: '300',
  name: 'ポリゴン'
}];

const initialState = {
  answers: [],
  questions: [],
  selectedChar: null,
  isComplete: false,
  currentIndex: 0,
};

describe('anagramPuzzle reducer', () => {
  it('初期State', () => {
    const result = reducer(undefined, { type: 'hoge' });
    expect(result).toEqual(initialState)
  })
  it('createQuestion: 問題を作成', () => {
    // ベースとなるデータを渡すと
    const action = createQuestion(dummyData);
    const result = reducer(undefined, action);
    // 答えと問題がセットされる
    expect(result.answers).toEqual([{
      id: '1',
      name: 'フシギダネ'
    }, {
      id: '20',
      name: 'クチート'
    }, {
      id: '300',
      name: 'ポリゴン'
    }]);
    expect(result.questions).toHaveLength(3);
  })
  it('selectChar: 文字を選択', () => {
    // 入れ替える文字を指定すると
    const action = selectChar({
      questionId: '1',
      charIndex: 0
    })
    const result = reducer(undefined, action)
    // 選択中の文字に追加される
    expect(result.selectedChar).toEqual({
      questionId: '1',
      charIndex: 0
    })
  })
  it('deselectChar: 文字選択を解除', () => {
    // deselectCharが発行されると
    const action = deselectChar()
    const result = reducer({
      ...initialState,
      selectedChar: {
        questionId: '1',
        charIndex: 0
      }
    }, action)
    // 選択中の文字が解除される
    expect(result.selectedChar).toEqual(null)
  })
  // it('selectChar: 文字を入れ替える', () => {
  //   // 問題を作成し
  //   const action = createQuestion(dummyData);
  //   const result = reducer(undefined, action);
  //   // 2文字選択すると
  //   const questionId = '1'
  //   const question = result.questionData[questionId].chars;
  //   const charIds = [Object.keys(question)[0], Object.keys(question)[1]]
  //   const payload = [{
  //     questionId,
  //     charId: charIds[0]
  //   }, {
  //     questionId,
  //     charId: charIds[1]
  //   }];
  //   const defaultChars = result.questionData[questionId].chars;

  //   const selectCharResult = reducer(result, selectChar(payload[0]));
  //   const nextSelectCharResult = reducer(selectCharResult, selectChar(payload[1]));
  //   const changedChars = nextSelectCharResult.questionData[questionId].chars;
  //   // 文字の順番が入れ替わる
  //   expect(changedChars[charIds[0]].order).toBe(defaultChars[charIds[1]].order);
  //   expect(changedChars[charIds[1]].order).toBe(defaultChars[charIds[0]].order);
  // })
})
// describe('anagramPuzzle selector', () => {
//   it('StateからAnagramPazzle画面用のPropsを取得', () => {
//     // createStoreし
//     const store = configureStore();
//     // selectAnagramPuzzleにstateが渡れば
//     const result = selectAnagramPuzzle(store.getState());
//     // データを返す
//     expect(result).toEqual({
//       questionData: [],
//       isComplete: false,
//       currentIndex: 0,
//       currentStep: 1,
//       maxStep: 0,
//     });
//   })
// })